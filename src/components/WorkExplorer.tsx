import { useLayoutEffect, useRef, useState } from 'react'
import content from '../content.json'

type Selection = { kind: 'company' | 'project'; index: number } | null

export function WorkExplorer() {
  const [selection, setSelection] = useState<Selection>(null)
  const [motion, setMotion] = useState<'entering' | 'open' | 'closing'>('open')
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const detailRef = useRef<HTMLHeadingElement | null>(null)
  const job = selection?.kind === 'company' ? content.experience[selection.index] : null
  const project = selection?.kind === 'project' ? content.projects[selection.index] : null

  useLayoutEffect(() => {
    if (!selection) return
    detailRef.current?.focus({ preventScroll: true })
    if (window.matchMedia('(max-width: 760px)').matches) {
      detailRef.current?.closest('.explorer-panel')?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      })
    }
  }, [selection])

  function select(kind: 'company' | 'project', index: number, button: HTMLButtonElement) {
    triggerRef.current = button
    setMotion(selection || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'open' : 'entering')
    setSelection({ kind, index })
  }

  function restore() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishRestore()
    else setMotion('closing')
  }

  function finishRestore() {
    setMotion('open')
    setSelection(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  function details() {
    const item = job ?? project
    if (!item) return null
    return <article className="focus-details" >
      <button className="view-rest" onClick={restore} disabled={motion === 'closing'}>View all</button>
      <h2 ref={detailRef} tabIndex={-1}>{job?.company ?? project?.title}<span>.</span></h2>
      {job && <p className="detail-role">{job.role}</p>}
      {item.description && <p className="detail-description">{item.description}</p>}
      {project && !project.url && <p className="detail-role">Beta soon</p>}
      {item.url && <a className="detail-link" href={item.url} target="_blank" rel="noreferrer">
        {job ? 'Visit company' : project?.title === 'Other Projects' ? 'Browse repositories' : 'View project'}
      </a>}
    </article>
  }

  return <section className="work scene work-explorer" id="work" aria-label="Work experience and projects">
    <div className="work-column explorer-panel" id="workex">
      <div className={`panel-layer${project ? '' : ' is-active'}`} inert={!!project} aria-hidden={!!project}>
        <h2>Where I’ve been<span>.</span></h2>
        <ul className="explorer-names">
          {content.experience.map((item, index) => <li key={item.company}>
            <button aria-pressed={selection?.kind === 'company' && selection.index === index}
              aria-controls="company-details" onClick={event => select('company', index, event.currentTarget)}>{item.company}</button>
          </li>)}
        </ul>
      </div>
      <div id="project-details" className={`panel-layer detail-layer detail-layer--project${project ? ` is-active motion-${motion}` : ''}`} inert={!project || motion === 'closing'} aria-hidden={!project}
        onAnimationEnd={event => {
          if (event.target !== event.currentTarget) return
          if (motion === 'closing') finishRestore()
          else setMotion('open')
        }}>
        {project && details()}
      </div>
    </div>
    <div className="projects-column explorer-panel" id="projects">
      <div className={`panel-layer${job ? '' : ' is-active'}`} inert={!!job} aria-hidden={!!job}>
        <h2>Things I built<span>.</span></h2>
        <ul className="explorer-names">
          {content.projects.map((item, index) => <li key={item.title}>
            <button aria-pressed={selection?.kind === 'project' && selection.index === index}
              aria-controls="project-details" onClick={event => select('project', index, event.currentTarget)}>{item.title}</button>
          </li>)}
        </ul>
        <div className="open-source"><p className="eyebrow">OPEN SOURCE CONTRIBUTIONS</p>
          <a href="https://github.com/facebookresearch/co-tracker" target="_blank" rel="noreferrer">co-tracker</a>
          <a href="https://github.com/SysCV/sam-pt" target="_blank" rel="noreferrer">sam-pt</a>
          <a href="https://github.com/HKUST-Aerial-Robotics/Fast-Planner" target="_blank" rel="noreferrer">Fast-Planner</a>
        </div>
      </div>
      <div id="company-details" className={`panel-layer detail-layer detail-layer--company${job ? ` is-active motion-${motion}` : ''}`} inert={!job || motion === 'closing'} aria-hidden={!job}
        onAnimationEnd={event => {
          if (event.target !== event.currentTarget) return
          if (motion === 'closing') finishRestore()
          else setMotion('open')
        }}>
        {job && details()}
      </div>
    </div>
  </section>
}
