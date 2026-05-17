import { useEffect, useRef, useState } from 'react';

const HERO_VIDEOS = {
  early: {
    src: '/videos/hero-early-morning-or-evening.mp4',
    poster: '/videos/hero-early-morning-or-evening-poster.jpg',
  },
  morning: {
    src: '/videos/hero-9-to-noon.mp4',
    poster: '/videos/hero-9-to-noon-poster.jpg',
  },
  afternoon: {
    src: '/videos/hero-noon-to-five.mp4',
    poster: '/videos/hero-noon-to-five-poster.jpg',
  },
};

/** Local hour → clip: before 9 & from 17 → early/evening; 9–12 morning; 12–17 afternoon. */
function heroVideoForHour(hour) {
  if (hour < 9 || hour >= 17) return HERO_VIDEOS.early;
  if (hour < 12) return HERO_VIDEOS.morning;
  return HERO_VIDEOS.afternoon;
}

export default function HeroBackground() {
  const videoRef = useRef(null);
  const [bundle, setBundle] = useState(() => heroVideoForHour(new Date().getHours()));
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduceMotion(mq.matches);
    syncMotion();
    mq.addEventListener('change', syncMotion);
    return () => mq.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    const bump = () => setBundle(heroVideoForHour(new Date().getHours()));
    const id = window.setInterval(bump, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p?.catch) p.catch(() => {});
  }, [bundle.src, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="hero-slide__media" aria-hidden>
        <div
          className="hero-slide__static-fallback"
          style={{ backgroundImage: `url(${bundle.poster})` }}
        />
        <div className="hero-slide__scrim" />
      </div>
    );
  }

  /*
   * Single looping element — avoids dual-layer opacity flashes from compositing/posters/z-order.
   * For a visually seamless loop, overlap-blend tail→head in FFmpeg; browser `loop` always jumps.
   */
  return (
    <div className="hero-slide__media" aria-hidden>
      <video
        ref={videoRef}
        key={bundle.src}
        className="hero-slide__video"
        src={bundle.src}
        poster={bundle.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero-slide__scrim" />
    </div>
  );
}
