import HeroBackground from '../components/HeroBackground';
import TechStack from '../components/TechStack';

const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons';

export default function Home() {
  return (
    <main className="home-slides">
      <div className="section slide hero-slide" id="introduction">
        <HeroBackground />
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
          <h2>Work Experience</h2>

          <div>
            <div className="workex-title">
              <a href="https://www.guruq.in/" target="_blank" rel="noreferrer">
                <img src="/images/guruq.png" alt="GuruQ Logo" style={{ height: '5em', width: 'auto' }} />
              </a>
              <h3 id="guruq">Full Stack Freelancer</h3>
            </div>
            <h5>
              <em>GuruQ is one of India's top tutor-for-student market place.</em>
            </h5>
            <hr />
            <div>
              <p>
                Worked across the stack to build and expand features on mobile and web. The App has over 100K downloads on
                the Android app store and has over 300K Students and 35K Tutors. The product was built using React Native,
                React, NestJS, GraphQL, Apollo, PostgreSQL and AWS.
              </p>
            </div>
          </div>

          <div>
            <div className="workex-title">
              <a href="https://www.amazon.jobs/en/teams/last-mile-org" target="_blank" rel="noreferrer">
                <img src="/images/amazon.png" alt="Amazon Logo" style={{ height: '2em', width: 'auto' }} />
              </a>
              <h3 id="amazon">SDE Intern</h3>
            </div>
            <h5>
              <em>Worked in the Last-Mile Delivery Tech Organisation.</em>
            </h5>
            <hr />
            <div>
              <p>
                Worked on mobile/web app and backend services used by Amazon associates in Amazon fulfillment centers.
                Orchestrated end-to-end development of features from communication with stakeholders to deployment. Also
                rebuilt the team's CI/CD pipeline to improve developer productivity. Used React, React Native, Java, Ruby
                and AWS.
              </p>
            </div>
          </div>

          <div>
            <div className="workex-title">
              <a href="https://www.rippl.club/" target="_blank" rel="noreferrer">
                <img src="/images/rippl.png" alt="Rippl Logo" style={{ height: '2.2em', width: 'auto' }} />
              </a>
              <h3 id="rippl">SDE Intern</h3>
            </div>
            <h5>
              <em>Rippl is a B2B startup which provides a gamified engagement platform for brands.</em>
            </h5>
            <hr />
            <div>
              <p>
                Developed the entire web platform in Next.js. The web app serves as their main product and sees 100K MAU.
                Also created gateway services for easier client-side integration. Used React, Next.js and Swagger.
              </p>
            </div>
          </div>

          <div>
            <div className="workex-title">
              <img src="/images/classup.png" alt="Classup Logo" style={{ height: '2.5em', width: 'auto' }} />
              <h3 id="classup">SDE Intern</h3>
            </div>
            <h5>
              <em>Classup is an edtech startup which provides ERP solutions to schools.</em>
            </h5>
            <hr />
            <div>
              <p>
                Interned as a React Native mobile app developer and refactored the code base from Kotlin to React Native.
                Also overhauled the mobile UI. Used React Native, Kotlin.
              </p>
            </div>
          </div>
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
        </section>
        </div>
      </div>

      <div className="section slide" id="open-source">
        <div className="slide__content">
          <h2>Open Source Contributions</h2>
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
      </div>

      <TechStack />

      <div className="section slide" id="socials">
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
      </div>
    </main>
  );
}
