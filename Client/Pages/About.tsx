
const About = () => {
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1 className="section-title">The Story of <span>Waveworld</span></h1>
          <p className="section-desc">
            From a university vision to a digital reality.
          </p>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="about-story-section glass">
        <div className="container">
          <div className="about-content">
            <div className="essay-content">
              <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>The Founder's Journey</h2>
              <p>
                In 2023, while navigating the rigorous academic landscape of <strong>Techno India University</strong>, our founder, <strong>Deep Paul</strong>, saw an opportunity that transcended the classroom. He didn't just want to study technology; he wanted to harness it to empower businesses in an ever-evolving digital world. This spark of ambition was the beginning of what we now know as Waveworld.
              </p>
              <br />
              <p>
                However, the path to success was far from linear. The first six months were a defining period of relentless struggle and perseverance. As a student balancing lectures and code, Deep faced the harsh reality of starting a venture from scratch. There were countless nights spent in the university labs, drafting proposals that went unanswered and sending cold emails that were often ignored.
              </p>
              <br />
              <p>
                For half a year, the search for the first client felt like an uphill battle. But within that struggle, a transformation occurred. Every rejection became a lesson in refining the craft, and every "no" fueled the fire to create something so exceptional it couldn't be ignored. Deep realized that to win trust, he had to deliver not just a service, but digital perfection.
              </p>
              <br />
              <p>
                Persistence eventually met opportunity. The breakthrough project arrived, and the results spoke for themselves. Today, Waveworld stands as a testament to those six months of grit. What started as a student's vision at Techno India University has evolved into a premium digital agency committed to excellence. Our story is one of resilience, proving that with enough passion and dedication, any digital vision can be brought to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            <div className="value-card shadow-glass">
              <div className="value-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower every business with high-end, scalable digital solutions that drive measurable growth and long-term success.</p>
            </div>
            <div className="value-card shadow-glass">
              <div className="value-icon">💡</div>
              <h3>Our Vision</h3>
              <p>To be the world’s most trusted partner for digital innovation, where creativity meets cutting-edge technology.</p>
            </div>
            <div className="value-card shadow-glass">
              <div className="value-icon">💎</div>
              <h3>Our Commitment</h3>
              <p>We promise uncompromising quality, purposeful design, and technical precision in every project we undertake.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
