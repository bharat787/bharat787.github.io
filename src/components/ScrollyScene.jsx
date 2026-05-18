import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const SCENES = [
  {
    src: '/images/scrolly/home.png',
    focus: [-0.18, 0.02],
    zoom: 1.08,
  },
  {
    src: '/images/scrolly/work.png',
    focus: [0.08, -0.02],
    zoom: 1.12,
  },
  {
    src: '/images/scrolly/projects.png',
    focus: [0.16, -0.04],
    zoom: 1.1,
  },
];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function sceneOpacity(index, progress) {
  if (index === 0) return 1 - smoothstep(0.18, 0.45, progress);
  if (index === 1) return smoothstep(0.18, 0.45, progress) * (1 - smoothstep(0.58, 0.84, progress));
  return smoothstep(0.58, 0.84, progress);
}

function useScrollProgress(scrollRootRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = scrollRootRef?.current;
        const left = root?.scrollLeft ?? window.scrollX;
        const travel = Math.max(window.innerWidth * 2.15, 1);
        setProgress(clamp(left / travel));
      });
    };

    const root = scrollRootRef?.current;

    measure();
    root?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(frame);
      root?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [scrollRootRef]);

  return progress;
}

function WatercolorPlane({ scene, index, progress, texture }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { viewport } = useThree();

  const scale = useMemo(() => {
    const image = texture.image;
    const imageAspect = image ? image.width / image.height : 16 / 9;
    const viewportAspect = viewport.width / viewport.height;

    if (viewportAspect > imageAspect) {
      return [viewport.width, viewport.width / imageAspect, 1];
    }

    return [viewport.height * imageAspect, viewport.height, 1];
  }, [texture.image, viewport.height, viewport.width]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) return;

    const local = index === 0 ? progress * 0.45 : index === 1 ? progress - 0.45 : progress - 0.75;
    const drift = Math.sin(clock.elapsedTime * 0.16 + index) * 0.018;
    const opacity = sceneOpacity(index, progress);
    const targetScale = scene.zoom + clamp(local, -0.2, 0.35) * 0.08;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, scene.focus[0] + drift, 0.045);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, scene.focus[1] - progress * 0.035, 0.045);
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale[0] * targetScale, 0.045);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale[1] * targetScale, 0.045);
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, opacity, 0.08);
  });

  return (
    <mesh ref={meshRef} scale={[scale[0] * scene.zoom, scale[1] * scene.zoom, 1]} position={[scene.focus[0], scene.focus[1], -index * 0.03]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <meshBasicMaterial ref={materialRef} map={texture} transparent opacity={index === 0 ? 1 : 0} toneMapped={false} />
    </mesh>
  );
}

function WatercolorStory({ progress }) {
  const textures = useTexture(SCENES.map(scene => scene.src));

  useMemo(() => {
    textures.forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
  }, [textures]);

  return (
    <>
      {SCENES.map((scene, index) => (
        <WatercolorPlane
          key={scene.src}
          scene={scene}
          index={index}
          progress={progress}
          texture={textures[index]}
        />
      ))}
    </>
  );
}

export default function ScrollyScene({ scrollRootRef }) {
  const progress = useScrollProgress(scrollRootRef);

  return (
    <div className="scrolly-scene" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true }}
      >
        <WatercolorStory progress={progress} />
      </Canvas>
      <div className="scrolly-scene__paper" />
      <div className="scrolly-scene__veil" />
    </div>
  );
}
