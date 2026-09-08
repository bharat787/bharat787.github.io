import { useState } from 'react'
import { TransitionScene } from './components/TransitionScene'
import content from './content.json'
import { WorkExplorer } from './components/WorkExplorer'
import { AnimatedName } from './components/AnimatedName'

export default function App() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  return <>
    <a className="skip-link" href="#introduction">Skip to content</a>
    <TransitionScene />
    <div className="content-viewport" id="portfolio-scroll" tabIndex={0} aria-label="Portfolio content"
      onScroll={event => {
        const scroller = event.currentTarget
        if (scroller.scrollTop > 8) setHasScrolled(true)
        setAtEnd(scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2)
      }}>
    <header><a className="wordmark" href="#introduction" aria-label="Bharat Gupta home">bg<span>.</span></a><nav aria-label="Main navigation"><a href="#work">Work & projects</a><a href="#socials">Let’s connect</a></nav></header>
    <main>
      <section className="intro scene" id="introduction">
        <div className="intro-copy"><h1>Hi, I’m <AnimatedName /> <span className="greeting">ヾ(＾-＾)ノ</span></h1>
          {content.introduction.map((paragraph, i) => <p key={i} className={i === 0 ? 'lead' : undefined} dangerouslySetInnerHTML={{ __html: paragraph }} />)}
        </div>
      </section>
      <WorkExplorer />
      <section className="connect scene" id="socials"><div><h2>Let’s connect<span>.</span></h2><div className="social-links">
        {content.socials.map(link => <a key={link.label} href={link.url} target={link.url.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">{link.label}</a>)}
      </div></div></section>
    </main>
    </div>
    {!atEnd && <footer className="scroll-footer">
      <button className={`scroll-chevron${hasScrolled ? '' : ' scroll-chevron--initial'}`}
        aria-label="Scroll down"
        onClick={() => {
          const scroller = document.getElementById('portfolio-scroll')!
          scroller.scrollBy({ top: scroller.clientHeight * 0.75,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
        }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>}
  </>
}
