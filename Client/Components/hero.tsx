import { useState, Suspense } from "react";
import DiscoveryModal from "./DiscoveryModal";
import ExperienceModal from "./ExperienceModal";
import GlobeScene from "./GlobeScene";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  return (
    <>
      <section id="home" className="hero-section">
        <div className="container hero-content">
          <div className="three-world-wrap">
            <Suspense fallback={<div className="three-d-loader">Connecting to Network...</div>}>
              <GlobeScene />
            </Suspense>
            
            {/* Window 1: Branding */}
            <div className="hologram-overlay glass window-branding">
              <div className="hologram-brand">WAVEWORLD</div>
              <div className="hologram-tag">SYSTEM_NAME</div>
            </div>

            {/* Window 2: Core Services */}
            <div className="hologram-overlay glass window-services">
              <div className="hologram-tag">CORE_CAPABILITIES</div>
              <ul className="hologram-list">
                <li><span>●</span> Web Engineering</li>
                <li><span>●</span> UI/UX Design</li>
                <li><span>●</span> Cloud Architecture</li>
                <li><span>●</span> App Development</li>
              </ul>
            </div>

            {/* Window 3: Network Stats */}
            <div className="hologram-overlay glass window-top">
              <div className="hologram-tag">LIVE_NETWORK</div>
              <div className="hologram-data">0.2ms Latency</div>
            </div>
            
            {/* Window 4: Node Data */}
            <div className="hologram-overlay glass window-bottom">
              <div className="hologram-tag">NODES_ARRAY</div>
              <div className="hologram-data">Active Protocol: v8.4.1</div>
            </div>
          </div>

          <div className="hero-text">
            <h1>
              Building the Future of the <span>Internet World</span>
            </h1>
            <p>
              Waveworld is a leading digital agency dedicated to creating
              stunning websites and innovative digital solutions for businesses
              around the globe.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                Get Started
              </button>
              <button className="btn-secondary" onClick={() => setIsExperienceOpen(true)}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ExperienceModal isOpen={isExperienceOpen} onClose={() => setIsExperienceOpen(false)} />
    </>
  );
};

export default Hero;
