import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function AnimatedName() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hindiRef = useRef<HTMLSpanElement>(null)
  const englishRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current!
    const hindi = hindiRef.current!
    const english = englishRef.current!
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let current: 'hi' | 'en' = 'hi'
    let timeline: gsap.core.Timeline | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    let disposed = false
    let interacted = false

    function show(language: 'hi' | 'en') {
      if (current === language) return
      timeline?.kill()
      const incoming = language === 'hi' ? hindi : english
      const outgoing = language === 'hi' ? english : hindi
      current = language
      gsap.set(incoming, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set(outgoing, { clipPath: 'inset(0 0 0 0)' })
      timeline = gsap.timeline({ defaults: { duration: reducedMotion.matches ? 0 : 0.45, ease: 'power2.inOut' } })
        .to(outgoing, { clipPath: 'inset(0 0 0 100%)' }, 0)
        .to(incoming, { clipPath: 'inset(0 0% 0 0)' }, 0)
        .set(incoming, { clipPath: 'none' })
    }
    function enter() {
      interacted = true
      clearTimeout(timer)
      show('hi')
    }
    function leave() {
      if (!button.matches(':hover') && document.activeElement !== button) show('en')
    }
    function toggle() {
      interacted = true
      clearTimeout(timer)
      show(current === 'hi' ? 'en' : 'hi')
    }
    button.addEventListener('pointerenter', enter)
    button.addEventListener('pointerleave', leave)
    button.addEventListener('focus', enter)
    button.addEventListener('blur', leave)
    button.addEventListener('click', toggle)
    // Give the correct Devanagari font time to load before the one-time reveal.
    void document.fonts.load('600 64px "Noto Serif Devanagari"').catch(() => {}).then(() => {
      if (disposed || interacted) return
      timer = setTimeout(() => show('en'), reducedMotion.matches ? 0 : 1000)
    })
    return () => {
      disposed = true
      clearTimeout(timer)
      timeline?.kill()
      button.removeEventListener('pointerenter', enter)
      button.removeEventListener('pointerleave', leave)
      button.removeEventListener('focus', enter)
      button.removeEventListener('blur', leave)
      button.removeEventListener('click', toggle)
    }
  }, [])

  return <button ref={buttonRef} className="animated-name" type="button" aria-label="Bharat (भरत)" title="Bharat / भरत">
    <span ref={englishRef} className="animated-name__word animated-name__english" lang="en" aria-hidden="true">Bharat</span>
    <span ref={hindiRef} className="animated-name__word animated-name__hindi" lang="hi" aria-hidden="true">भरत</span>
  </button>
}
