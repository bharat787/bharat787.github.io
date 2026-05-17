import { useRef } from 'react';
import { useGlitterIcons } from '../useGlitterIcons';

const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons';

const ROWS = [
  [
    { hue: '193', file: 'react.svg', title: 'React' },
    { file: 'nextdotjs.svg', title: 'NextJS' },
    { hue: '213', file: 'amazonaws.svg', title: 'AWS' },
    { hue: '319', file: 'graphql.svg', title: 'GraphQL' },
    { hue: '346', file: 'nestjs.svg', title: 'nestJS' },
  ],
  [
    { hue: '225', file: 'postgresql.svg', title: 'postgreSQL' },
    { hue: '121', file: 'mongodb.svg', title: 'MongoDB' },
    { hue: '16', file: 'postman.svg', title: 'Postman' },
    { hue: '206', file: 'docker.svg', title: 'Docker' },
    { hue: '9', file: 'git.svg', title: 'Git' },
  ],
  [
    { hue: '206', file: 'cplusplus.svg', title: 'C++' },
    { hue: '207', file: 'python.svg', title: 'Python' },
    { hue: '53', file: 'javascript.svg', title: 'JS' },
    { hue: '256', file: 'kotlin.svg', title: 'Kotlin' },
    { hue: '3', file: 'ruby.svg', title: 'Ruby' },
  ],
  [
    { hue: '102', file: 'gnubash.svg', title: 'BASH' },
    { hue: '8', file: 'swift.svg', title: 'Swift' },
    { hue: '92', file: 'swagger.svg', title: 'Swagger' },
    { hue: '252', file: 'apollographql.svg', title: 'ApolloGraphQL' },
    { hue: '46', file: 'linux.svg', title: 'Linux' },
  ],
];

export default function TechStack() {
  const stackRef = useRef(null);
  useGlitterIcons(stackRef);

  return (
    <div className="section slide" id="stack" ref={stackRef}>
      <h2>Tech Stack</h2>
      {ROWS.map((row, rowIdx) => (
        <div className="icons" key={rowIdx}>
          {row.map(({ hue, file, title }) => {
            const src = `${CDN}/${file}`;
            const iconUrl = `url(${src})`;
            return (
              <div
                key={`${rowIdx}-${title}`}
                className="icon icon--css"
                {...(hue !== undefined ? { 'data-hue': hue } : {})}
                style={{ '--icon': iconUrl }}
                title={title}
              >
                <img src={src} alt={title} />
                <canvas />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
