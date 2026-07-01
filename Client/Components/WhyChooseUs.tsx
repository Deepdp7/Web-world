import React from 'react';

const WhyChooseUs = () => {
  const reasons = [
    { 
      title: "Fast Delivery", 
      desc: "We ensure rapid development cycles without compromising on the quality of your product.", 
      icon: "⚡" 
    },
    { 
      title: "Modern Technologies", 
      desc: "Using the latest tech stacks to build performant and future-proof digital solutions.", 
      icon: "🚀" 
    },
    { 
      title: "Scalable Architecture", 
      desc: "Systems designed to grow with your business and handle increasing traffic seamlessly.", 
      icon: "📈" 
    },
    { 
      title: "24/7 Support", 
      desc: "Round-the-clock maintenance and dedicated support for your peace of mind.", 
      icon: "🛠️" 
    },
    { 
      title: "Secure Solutions", 
      desc: "Top-tier security practices to keep your enterprise data and your users completely safe.", 
      icon: "🔒" 
    },
    { 
      title: "Expert Team", 
      desc: "A dedicated group of seasoned professionals and developers at your service.", 
      icon: "👥" 
    }
  ];

  return (
    <section className="services-section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-modern">Our Advantages</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Why <span>Choose Us</span>
          </h2>
          <p className="section-desc">
            We deliver exceptional value to our partners through our core strengths, 
            relentless innovation, and absolute commitment to excellence.
          </p>
        </div>
        <div className="services-grid">
          {reasons.map((item, index) => (
            <div key={index} className="service-card glass">
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ color: 'var(--text-main)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
