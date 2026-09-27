import { useState } from 'react';
import './WebDesigns.css';


import design1 from '../assets/design1.jpg';
import design2 from '../assets/design2.jpg';

const designs = [
  {
    id: 1,
    title: 'Starbright API ecommerce system',
    image: design1,
    description: 'Redesigned the multi-channel order management dashboard (Shopee, TikTok, Lazada) in Figma, defining a consistent UI system — amber/orange gradient table headers, icon-only action buttons, pill-style search — then implemented it in a Laravel/Inertia + React + Tailwind stack across Branches, User Management, and Orders/Waybills pages.',
    tools: ['Figma'],
  },
  {
    id: 2,
    title: 'starbright.com.ph website redesign',
    image: design2,
    description: 'Refreshed the storefront for Starbright Office Depot\'s WooCommerce site, including a rebuilt footer with social and payment icon rows, resolving asset-hosting issues by moving icons into the WordPress Media Library for reliable serving.',
    tools: ['Figma'],
  },
];

function WebDesigns() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="section" id="web-designs">
      <div>
        <h1 style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '500px' , marginBottom: '100px' }}>
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