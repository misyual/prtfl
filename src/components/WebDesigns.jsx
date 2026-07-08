import { useState } from 'react';
import './WebDesigns.css';


import design1 from '../assets/design1.jpg';
import design2 from '../assets/design2.jpg';

const designs = [
  {
    id: 1,
    title: 'Project Title 1',
    image: design1,
    description: 'Short description of the problem, your role, and the outcome.',
    tools: ['Figma'],
  },
  {
    id: 2,
    title: 'Project Title 2',
    image: design2,
    description: 'Short description of the problem, your role, and the outcome.',
    tools: ['Figma'],
  },
];

function WebDesigns() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="section" id="web-designs">
      <div>
        <h1 style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '300px' , marginBottom: '100px' }}>
          UI/UX Designs
        </h1>
      </div>

      <div className="web-designs-grid">
        {designs.map((design) => (
          <div
            key={design.id}
            className="web-design-card"
            onClick={() => setActiveId(activeId === design.id ? null : design.id)}
          >
            <img
              src={design.image}
              alt={design.title}
              className="web-design-image"
            />
            <div className="web-design-info">
              <h3>{design.title}</h3>
              <p>{design.description}</p>
              <div className="web-design-tools">
                {design.tools.map((tool) => (
                  <span key={tool} className="web-design-tag">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WebDesigns;