import { useCallback, useEffect, useId, useMemo, useState } from 'react';

/** @typedef {{ id: string; company: string; role: string; logoSrc: string; logoAlt: string; logoHref: string | null; blurb: string; paragraphs: string[] }} WorkItem */

/** @type {WorkItem[]} */
const WORK_ITEMS = [
  {
    id: 'guruq',
    company: 'GuruQ',
    role: 'Full Stack Freelancer',
    logoSrc: '/images/guruq.png',
    logoAlt: 'GuruQ',
    logoHref: 'https://www.guruq.in/',
    blurb: "GuruQ is one of India's top tutor-for-student market place.",
    paragraphs: [
      'Worked across the stack to build and expand features on mobile and web. The App has over 100K downloads on the Android app store and has over 300K Students and 35K Tutors. The product was built using React Native, React, NestJS, GraphQL, Apollo, PostgreSQL and AWS.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'SDE Intern',
    logoSrc: '/images/amazon.png',
    logoAlt: 'Amazon',
    logoHref: 'https://www.amazon.jobs/en/teams/last-mile-org',
    blurb: 'Worked in the Last-Mile Delivery Tech Organisation.',
    paragraphs: [
      "Worked on mobile/web app and backend services used by Amazon associates in Amazon fulfillment centers. Orchestrated end-to-end development of features from communication with stakeholders to deployment. Also rebuilt the team's CI/CD pipeline to improve developer productivity. Used React, React Native, Java, Ruby and AWS.",
    ],
  },
  {
    id: 'rippl',
    company: 'Rippl',
    role: 'SDE Intern',
    logoSrc: '/images/rippl.png',
    logoAlt: 'Rippl',
    logoHref: 'https://www.rippl.club/',
    blurb: 'Rippl is a B2B startup which provides a gamified engagement platform for brands.',
    paragraphs: [
      'Developed the entire web platform in Next.js. The web app serves as their main product and sees 100K MAU. Also created gateway services for easier client-side integration. Used React, Next.js and Swagger.',
    ],
  },
  {
    id: 'classup',
    company: 'Classup',
    role: 'SDE Intern',
    logoSrc: '/images/classup.png',
    logoAlt: 'Classup',
    logoHref: null,
    blurb: 'Classup is an edtech startup which provides ERP solutions to schools.',
    paragraphs: [
      'Interned as a React Native mobile app developer and refactored the code base from Kotlin to React Native. Also overhauled the mobile UI. Used React Native, Kotlin.',
    ],
  },
];

function setWorkexHash(id) {
  const { pathname, search } = window.location;
  window.history.replaceState(null, '', `${pathname}${search}#${id}`);
}

export default function WorkExperienceSection() {
  const baseId = useId().replace(/:/g, '');
  const [activeId, setActiveId] = useState(WORK_ITEMS[0].id);

  const panelId = `workex-panel-${baseId}`;
  const tabDomIds = useMemo(
    () => Object.fromEntries(WORK_ITEMS.map(w => [w.id, `workex-tab-${w.id}-${baseId}`])),
    [baseId]
  );

  const activeWork = useMemo(
    () => WORK_ITEMS.find(w => w.id === activeId) ?? WORK_ITEMS[0],
    [activeId]
  );

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (WORK_ITEMS.some(w => w.id === id)) setActiveId(id);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const onTabListKeyDown = useCallback(
    e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const idx = WORK_ITEMS.findIndex(w => w.id === activeId);
      if (idx < 0) return;
      const next =
        e.key === 'ArrowDown'
          ? Math.min(WORK_ITEMS.length - 1, idx + 1)
          : Math.max(0, idx - 1);
      const id = WORK_ITEMS[next].id;
      setActiveId(id);
      setWorkexHash(id);
      document.getElementById(tabDomIds[id])?.focus();
    },
    [activeId, tabDomIds]
  );

  return (
    <>
      <h2 className="workex-heading">Work Experience</h2>

      <div className="workex-picker-shell">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Employers"
          className="workex-toc"
          onKeyDown={onTabListKeyDown}
        >
          {WORK_ITEMS.map(w => {
            const sel = activeId === w.id;
            return (
              <button
                key={w.id}
                id={tabDomIds[w.id]}
                role="tab"
                type="button"
                className={`workex-toc__btn ${sel ? 'is-active' : ''}`}
                aria-selected={sel}
                aria-controls={panelId}
                tabIndex={sel ? 0 : -1}
                onClick={() => {
                  setActiveId(w.id);
                  setWorkexHash(w.id);
                }}
              >
                {w.company}
              </button>
            );
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabDomIds[activeId]}
          aria-describedby={`${panelId}-desc`}
          className="workex-tabpanel"
        >
          <p id={`${panelId}-desc`} className="sr-only">
            {activeWork.blurb} {activeWork.paragraphs.join(' ')}{' '}
            {activeWork.logoHref ? `Company website ${activeWork.logoHref}.` : ''}
          </p>
          <article className="workex-detail">
            <div className="workex-detail__logo-wrap">
              {activeWork.logoHref ? (
                <a href={activeWork.logoHref} target="_blank" rel="noreferrer">
                  <img src={activeWork.logoSrc} alt={activeWork.logoAlt} />
                </a>
              ) : (
                <img src={activeWork.logoSrc} alt={activeWork.logoAlt} />
              )}
            </div>

            <div className="workex-detail__copy">
              <p className="workex-detail__company">{activeWork.company}</p>
              <h3>{activeWork.role}</h3>
              <p className="workex-detail__blurb">{activeWork.blurb}</p>
              {activeWork.paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
