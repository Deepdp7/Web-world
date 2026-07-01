import React, { useState, useRef } from "react";

const TiltCard = ({ title, desc, icon, color }: { title: string, desc: string, icon: string, color: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    // Calculate shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  return (
    <div 
      ref={cardRef}
      className="tilt-card shadow-glass"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
        "--shine-x": `${shine.x}%`,
        "--shine-y": `${shine.y}%`,
        "--accent-color": color
      } as React.CSSProperties}
    >
      <div className="card-shine"></div>
      <div className="card-content">
        <div className="card-icon-3d">{icon}</div>
        <h3 className="card-title-3d">{title}</h3>
        <p className="card-desc-3d">{desc}</p>
        <div className="card-layer-bg"></div>
      </div>
    </div>
  );
};

const Main = () => {
  const innovations = [
    {
      title: "UI/UX Excellence",
      desc: "3D-aware interfaces that respond to every user interaction, creating a deep sense of presence and immersion.",
      icon: "💎",
      color: "#6366f1"
    },
    {
      title: "Future Intelligence",
      desc: "Integrating AI-driven insights with modern design to predict user needs before they occur.",
      icon: "🧠",
      color: "#ec4899"
    },
    {
      title: "Seamless Motion",
      desc: "Fluid transitions and physics-based animations that reflect the natural world in digital spaces.",
      icon: "⚡",
      color: "#06b6d4"
    }
  ];

  return (
    <section className="main-section-3d">
      <div className="container">
        <div className="section-header-3d">
          <span className="badge-modern">Innovation Hub</span>
          <h2 className="section-title">
            The Next Dimension of <span>User Experience</span>
          </h2>
          <p className="section-desc">
            We're redefining digital interaction by blending 3D depth with intuitive 
            UX design principles. Explore our core innovation pillars.
          </p>
        </div>

        <div className="tilt-grid">
          {innovations.map((item, index) => (
            <TiltCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
