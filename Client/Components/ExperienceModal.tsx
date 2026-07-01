import React, { useEffect, useState } from "react";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState({ projects: 0, uptime: 0, coffee: 0 });

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStats({ projects: 247, uptime: 99.9, coffee: 1400 });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setStats({ projects: 0, uptime: 0, coffee: 0 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", 
    "AWS", "Docker", "Tailwind", "Framer Motion", "GraphQL"
  ];

  return (
    <div className="discovery-overlay" onClick={onClose}>
      <div className="experience-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="experience-header">
          <h2>Experience <span>Waveworld Innovation</span></h2>
          <p>Peek behind the curtain of our digital engineering studio.</p>
        </div>

        <div className="bento-grid">
          {/* Main Vision Card */}
          <div className="bento-item main-vision shadow-glass">
            <div className="bento-content">
              <h3>Our North Star</h3>
              <p>We don't just build websites; we craft digital ecosystems that breathe and grow with your business goals.</p>
              <div className="vision-visual">
                <div className="pulse-circle"></div>
                <div className="pulse-circle"></div>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bento-item impact-stats shadow-glass">
            <div className="stat-item">
              <span className="stat-number">{stats.projects}+</span>
              <span className="stat-label">Deployments</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.uptime}%</span>
              <span className="stat-label">Reliability</span>
            </div>
          </div>

          {/* Tech Stack Marquee Card */}
          <div className="bento-item tech-marquee-card shadow-glass">
            <h4>Our Engine Room</h4>
            <div className="vertical-marquee-container">
              <div className="vertical-marquee">
                {[...techStack, ...techStack].map((tech, i) => (
                  <div key={i} className="tech-tag">{tech}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Design Philosophy */}
          <div className="bento-item design-card shadow-glass">
            <div className="design-icon">🎨</div>
            <h4>Design First</h4>
            <p>Aesthetic excellence is our baseline, not an extra.</p>
          </div>

          {/* Small Feature */}
          <div className="bento-item coffee-card shadow-glass">
            <div className="coffee-count">☕ {stats.coffee}</div>
            <p>Cups of coffee fuel <span>our creativity.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
