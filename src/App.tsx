import { useState } from 'react'
import { TransitionScene } from './components/TransitionScene'
import content from './content.json'

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
        <div className="intro-copy"><h1>Hi, I’m Bharat <span className="greeting">ヾ(＾-＾)ノ</span></h1>
          {content.introduction.map((paragraph, i) => <p key={i} className={i === 0 ? 'lead' : undefined} dangerouslySetInnerHTML={{ __html: paragraph }} />)}
        </div>
      </section>
      <section className="work scene" id="work" aria-label="Work experience and projects">
        <div className="work-column" id="workex"><p className="eyebrow">01 / WHERE I’VE BEEN</p><h2>Work experience<span>.</span></h2>
          {content.experience.map(job => <article className="job" key={job.company}><div className="entry-heading"><h3>{job.url ? <a href={job.url} target="_blank" rel="noreferrer">{job.company}</a> : job.company}</h3><span className="role">{job.role}</span></div><p>{job.description}</p></article>)}
        </div>
        <div className="projects-column" id="projects"><p className="eyebrow">02 / WHAT I’VE BUILT</p><h2>Projects<span>.</span></h2>
          {content.projects.map((project, i) => <article className="project" key={project.title}><span className="project-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.title}</a> : project.title}</h3>{project.description && <p>{project.description}</p>}{!project.url && <span className="status">Beta soon</span>}</div></article>)}
          <div className="open-source"><p className="eyebrow">OPEN SOURCE CONTRIBUTIONS</p><a href="https://github.com/facebookresearch/co-tracker" target="_blank" rel="noreferrer">co-tracker</a><a href="https://github.com/SysCV/sam-pt" target="_blank" rel="noreferrer">sam-pt</a><a href="https://github.com/HKUST-Aerial-Robotics/Fast-Planner" target="_blank" rel="noreferrer">Fast-Planner</a></div>
        </div>
      </section>
      <section className="connect scene" id="socials"><div><h2>Let’s connect<span>.</span></h2><div className="social-links">
        <a href="mailto:contact@bharat-gupta.com">Email</a><a href="https://linkedin.com/in/bharatgupta787" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/bharat787" target="_blank" rel="noreferrer">GitHub</a><a href="https://twitter.com/bgbharat787" target="_blank" rel="noreferrer">X / Twitter</a><a href="https://drive.google.com/file/d/1GCk-mhj-MO50e5Bshr2pqCt_B9MC5GSj/view?usp=sharing" target="_blank" rel="noreferrer">Résumé</a>
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
