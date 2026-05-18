import { useEffect, useRef } from 'react';

import ScrollyScene from '../components/ScrollyScene';
import WorkExperienceSection from '../components/WorkExperienceSection';

const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons';

export default function Home() {
  const slidesRef = useRef(null);

  useEffect(() => {
    const slides = slidesRef.current;
    if (!slides) return undefined;

    const onWheel = event => {
      if (event.target.closest?.('.cards-wrapper')) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      slides.scrollBy({
        left: event.deltaY,
        behavior: event.deltaMode === 0 ? 'auto' : 'smooth',
      });
    };

    slides.addEventListener('wheel', onWheel, { passive: false });
    return () => slides.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <main className="home-slides" ref={slidesRef}>
        <ScrollyScene scrollRootRef={slidesRef} />

        <div className="section slide hero-slide" id="introduction">
          <div className="slide__content hero-slide__content">
            <h1>
              Hi, I'm Bharat <span className="responsive-text">ヾ(＾-＾)ノ</span>
            </h1>
            <p>
              I'm a tech generalist, more aptly described as{' '}
              <em id="quote">&quot;Jack of all trades, and mastering the art of learning&quot;.</em>
            </p>
            <p>
              I love building stuff, while software is my go-to medium, you'll occasionally find me soldering circuits or
              working with balsa wood. Over the years, I've got my hands dirty coding (or reverse engineering) mobile and
              web apps, dabbled with ML/DL, DevOps, distributed systems and played around with drones, RasPis and Arduinos.
              I strive to stay at the edge of my craft and learn and use every tool no matter how sophisticated or complex
              it is.
            </p>

            <p>
              Currently completing my Masters in Computer Science at Arizona State University, I've also worked with MNCs and
              startups. I also frequent hackathons.
            </p>
          </div>
        </div>

        <div className="section slide" id="workex">
          <div className="slide__content slide__content--wide">
            <WorkExperienceSection />
          </div>
        </div>

        <div className="section slide" id="projects">
          <div className="slide__content slide__content--wide">
            <h2>Projects</h2>
            <section>
              <div className="cards-wrapper">
              <div className="card blue">
                <div className="card-title">Glance Mail</div>
                <div className="card-description">
                  A smarter iOS Gmail client leveraging LLMs for enhanced email management.
                </div>
                <div className="card-github">
                  <div>Beta soon...</div>
                </div>
              </div>
              <div className="card green">
                <div className="card-title">MealShare</div>
                <div className="card-description">
                  A platform to share your home-cooked meals with your community.
                </div>
                <div className="card-github">
                  <a href="https://github.com/bharat787/MealShare" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card blue">
                <div className="card-title">Distributed CDN DB</div>
                <div className="card-description">
                  Created a highly optimised distributed database for a CDN using Raft consensus algorithm.
                </div>
                <div className="card-github">
                  <a href="https://github.com/bharat787/DropTable" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card green">
                <div className="card-title">Zero-Shot Sustained Object Tracking</div>
                <div className="card-description">
                  Advanced object segmentation and tracking algorithms for object tracking over extended periods, even
                  through occlusions.
                </div>
                <div className="card-github">
                  <a
                    href="https://colab.research.google.com/drive/1TgfCmBUY245DzEjExtpk-JFTF7U4OP_-?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={`${ICON_CDN}/googlecolab.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card blue">
                <div className="card-title">Aerial Tree Species Recognition</div>
                <div className="card-description">
                  Worked with the state's forest department to identify tree species using drones.
                </div>
                <div className="card-github">
                  <a href="https://github.com/bharat787/ForestDeptProj" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card green">
                <div className="card-title">C19</div>
                <div className="card-description">
                  An app and wearable device to help people maintain social distancing, and contact-tracing.
                </div>
                <div className="card-github">
                  <a href="https://github.com/bharat787/C19_App" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card blue">
                <div className="card-title">AeroD Website</div>
                <div className="card-description">Made a delightful website for my university's Aerodynamics club.</div>
                <div className="card-github">
                  <a href="https://github.com/AeroDBPGC/website" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
              <div className="card end">
                <div className="card-title" id="other-projects">
                  Other Projects
                </div>
                <div className="card-description" id="other-projects">
                  <a href="https://github.com/bharat787?tab=repositories" target="_blank" rel="noreferrer">
                    <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
                  </a>
                </div>
              </div>
            </div>

            <div className="open-source-inline">
              <h3>Open Source Contributions</h3>
              <ul>
                <li>
                  <a href="https://github.com/facebookresearch/co-tracker" target="_blank" rel="noreferrer">
                    facebookresearch/co-tracker
                  </a>
                </li>
                <li>
                  <a href="https://github.com/SysCV/sam-pt" target="_blank" rel="noreferrer">
                    ETH-Zürich/SysCV/sam-pt
                  </a>
                </li>
                <li>
                  <a href="https://github.com/HKUST-Aerial-Robotics/Fast-Planner" target="_blank" rel="noreferrer">
                    HKUST-Aerial-Robotics/Fast-Planner
                  </a>
                </li>
              </ul>
            </div>
          </section>
          </div>
        </div>

      </main>
      <nav className="connect-bar" aria-label="Connect">
        <a className="connect-bar__cta" href="mailto:contact@bharat-gupta.com">
          Connect
        </a>
        <div className="socials">
        <div className="social-icon">
          <a
            href="https://drive.google.com/file/d/1GCk-mhj-MO50e5Bshr2pqCt_B9MC5GSj/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <img src={`${ICON_CDN}/readdotcv.svg`} alt="Blog" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://linkedin.com/in/bharatgupta787" target="_blank" rel="noreferrer">
            <img src={`${ICON_CDN}/linkedin.svg`} alt="LinkedIn" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://github.com/bharat787" target="_blank" rel="noreferrer">
            <img src={`${ICON_CDN}/github.svg`} alt="GitHub" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://twitter.com/bgbharat787" target="_blank" rel="noreferrer">
            <img src={`${ICON_CDN}/x.svg`} alt="Twitter" />
          </a>
        </div>
        <div className="social-icon">
          <a href="mailto:contact@bharat-gupta.com" target="_blank" rel="noreferrer">
            <img src={`${ICON_CDN}/gmail.svg`} alt="Gmail" />
          </a>
        </div>
        </div>
      </nav>
    </>
  );
}
