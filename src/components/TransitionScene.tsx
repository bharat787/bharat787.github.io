import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BRIDGE_PATHS,
  BRIDGE_VIEW,
  type BridgeStrokeId,
} from '../scenes/bridgeGeometry'
import { clearStipple } from '../dither/stipplePath'
import { createOpenPathMorph, createContourMorph } from '../scenes/openPathMorph'
import {
  SKYLINE_MORPH_TARGET,
  SKYLINE_REVEAL_PATHS,
} from '../scenes/skylineOutline'
import {
  BRIDGE_FADE_STROKES,
  BRIDGE_RENDER_ORDER,
  MORPH_SEGMENT_LENGTH,
  MORPH_TIMING,
  SKYLINE_MORPH_STROKE,
} from '../scenes/morphPlan'
import { WAVING_HAND_OUTLINE, WAVING_HAND_DETAILS } from '../scenes/wavingHandGeometry'
import './TransitionScene.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function prepDraw(path: SVGPathElement) {
  const length = path.getTotalLength()
  gsap.set(path, {
    attr: { 'stroke-dasharray': length, 'stroke-dashoffset': length },
  })
  return length
}

function emptyMorphRefs(): Record<BridgeStrokeId, SVGPathElement | null> {
  return Object.fromEntries(
    BRIDGE_RENDER_ORDER.map(id => [id, null]),
  ) as Record<BridgeStrokeId, SVGPathElement | null>
}

export function TransitionScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const morphRefs = useRef(emptyMorphRefs())
  const stippleRef = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const handsRef = useRef<SVGGElement>(null)
  const revealRef = useRef<SVGGElement>(null)

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const fadeEls = BRIDGE_FADE_STROKES.map((id) => morphRefs.current[id]).filter(
        Boolean,
      ) as SVGPathElement[]
      const skylineEl = morphRefs.current[SKYLINE_MORPH_STROKE]
      const stippleEl = stippleRef.current
      const cablePath = BRIDGE_PATHS[SKYLINE_MORPH_STROKE]
      // GSAP mutates d directly; restore the current geometry on every setup.
      skylineEl?.setAttribute('d', cablePath)

      const scroller = document.getElementById('portfolio-scroll')!
      const sceneTime = () => {
        const work = document.getElementById('work')!
        const connect = document.getElementById('socials')!
        const y = scroller.scrollTop
        const vh = scroller.clientHeight
        const clamp = (n: number) => Math.max(0, Math.min(1, n))
        const firstEnd = work.offsetTop - vh * 0.35
        const secondStart = work.offsetTop + work.offsetHeight - vh * 0.65
        if (y < firstEnd) return 1.2 * clamp((y - vh * 0.3) / (firstEnd - vh * 0.3))
        if (y < secondStart) return 1.2
        return 1.2 + 1.62 * clamp((y - secondStart) / (connect.offsetTop - vh * 0.1 - secondStart))
      }
      if (reducedMotion) {
        const showStage = (progress: number) => {
          const stage = progress < 0.6 ? 0 : progress < 2 ? 1 : 2
          gsap.set(fadeEls, { opacity: stage === 0 ? 1 : 0 })
          gsap.set(stippleEl, { opacity: 0 })
          gsap.set(skylineEl, { opacity: 1 })
          skylineEl?.setAttribute('d', stage === 0 ? cablePath : stage === 1 ? SKYLINE_MORPH_TARGET : WAVING_HAND_OUTLINE)
          gsap.set(revealRef.current, { opacity: stage === 1 ? 1 : 0 })
          gsap.set(handsRef.current, { opacity: stage === 2 ? 1 : 0 })
          gsap.set(svgRef.current, { y: 0 })
        }
        showStage(0)
        ScrollTrigger.create({
          scroller, trigger: document.querySelector('main'), start: 0, end: 'max',
          onUpdate: () => showStage(sceneTime()),
          onRefresh: () => showStage(sceneTime()),
        })
        return
      }

      const detailPaths = gsap.utils.toArray<SVGPathElement>(
        '.transition-reveal__path',
        revealRef.current,
      )
      const handDetails = gsap.utils.toArray<SVGPathElement>('path', handsRef.current)
      gsap.set(handDetails, { attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 } })
      gsap.set(handsRef.current, { opacity: 0 })
      gsap.set(svgRef.current, { y: 0 })
      detailPaths.forEach(prepDraw)
      gsap.set(revealRef.current, { opacity: 0 })

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      const {
        fadeStart,
        fadeDuration,
        morphStart,
        morphDuration,
        detailFadeStart,
        detailFadeDuration,
        detailDrawStart,
        detailDrawDuration,
      } = MORPH_TIMING

      tl.to(fadeEls, { opacity: 0, duration: fadeDuration }, fadeStart)

      if (skylineEl && stippleEl) {
        const morph = createOpenPathMorph(
          cablePath,
          SKYLINE_MORPH_TARGET,
          MORPH_SEGMENT_LENGTH,
          BRIDGE_VIEW.width,
        )
        const morphState = { t: 0 }
        const handsMorph = createContourMorph(SKYLINE_MORPH_TARGET, WAVING_HAND_OUTLINE)
        const handsState = { t: 0, mix: 0 }

        gsap.set(skylineEl, { opacity: 1 })
        gsap.set(stippleEl, { opacity: 0 })
        clearStipple(stippleEl)

        // Keep the contour solid throughout both morphs, including reverse scrolling.
        const syncCableVisual = () => {
          const path = handsState.mix > 0
            ? handsMorph.path(handsState.t)
            : morphState.t <= 0 ? cablePath
            : morphState.t >= 1 ? SKYLINE_MORPH_TARGET
            : morph.path(morphState.t)
          skylineEl.setAttribute('d', path)
        }

        tl.to(morphState, { t: 1, duration: morphDuration }, morphStart)
        // Preserve the original hold and morph timing.
        tl.to(handsState, { mix: 1, duration: 0.08 }, 1.65)
        tl.to(handsState, { t: 1, duration: 0.65 }, 1.69)
        tl.eventCallback('onUpdate', syncCableVisual)
      }

      tl.to(
        revealRef.current,
        { opacity: 1, duration: detailFadeDuration },
        detailFadeStart,
      )

      tl.to(
        detailPaths,
        {
          attr: { 'stroke-dashoffset': 0 },
          duration: detailDrawDuration,
        },
        detailDrawStart,
      )

      tl.to(revealRef.current, { opacity: 0, duration: 0.18 }, 1.43)
      tl.to(handsRef.current, { opacity: 1, duration: 0.18 }, 2.34)
      tl.to(handDetails, { attr: { 'stroke-dashoffset': 0 }, duration: 0.23 }, 2.34)
      // Final hold lets the hands settle before the pin ends.
      tl.to({}, { duration: 0.25 }, 2.57)

      ScrollTrigger.create({
        scroller, trigger: document.querySelector('main'),
        start: 0,
        end: 'max',
        onUpdate: () => tl.time(sceneTime()),
        onRefresh: () => tl.time(sceneTime()),
      })
      tl.time(sceneTime())

    },
    { scope: sectionRef, dependencies: [BRIDGE_PATHS, SKYLINE_MORPH_TARGET, SKYLINE_REVEAL_PATHS, WAVING_HAND_OUTLINE], revertOnUpdate: true },
  )

  return (
    <section ref={sectionRef} className="transition-scene" aria-hidden="true">
      <div className="transition-scene__pin">
        <svg
          ref={svgRef}
          className="transition-scene__svg"
          viewBox={`0 0 ${BRIDGE_VIEW.width} ${BRIDGE_VIEW.height}`}
          preserveAspectRatio="xMidYMax meet"
          role="img"
          aria-label="Golden Gate Bridge transforming into San Francisco landmarks and then a waving hand"
        >
          <g className="transition-scene__morph">
            {BRIDGE_RENDER_ORDER.map((id) => (
              <path
                key={id}
                ref={(el) => {
                  morphRefs.current[id] = el
                }}
                className={`transition-scene__stroke transition-scene__stroke--${id}${
                  id === SKYLINE_MORPH_STROKE
                    ? ' transition-scene__stroke--ditherTarget'
                    : ''
                }`}
                d={BRIDGE_PATHS[id]}
              />
            ))}
            <g
              ref={stippleRef}
              className="transition-scene__stipple"
              aria-hidden="true"
            />
          </g>
          <g ref={revealRef} className="transition-scene__reveal" opacity={0}>
            {SKYLINE_REVEAL_PATHS.map((d, i) => (
              <path
                key={i}
                className="transition-scene__stroke transition-reveal__path"
                d={d}
                fill="none"
              />
            ))}
          </g>
          <g ref={handsRef} opacity={0}>
            {WAVING_HAND_DETAILS.map((d, i) => (
              <path key={i} d={d} pathLength={1} className="transition-scene__stroke transition-reveal__path" />
            ))}
          </g>
        </svg>

      </div>
    </section>
  )
}
