const Services = () => {
  const services = [
    {
      title: "Web Design",
      desc: "Modern and responsive designs tailored to your brand's unique identity. We prioritize user experience and aesthetic excellence.",
      icon: "🎨",
    },
    {
      title: "App Development",
      desc: "Scalable mobile and desktop applications built with the latest technologies to ensure performance and reliability.",
      icon: "📱",
    },
    {
      title: "Digital Marketing",
      desc: "Comprehensive strategies to boost your online presence, including SEO, social media management, and targeted ads.",
      icon: "📈",
    },
    {
      title: "Cloud Solutions",
      desc: "Secure and efficient cloud infrastructure to streamline your business operations and ensure data accessibility.",
      icon: "☁️",
    },
    {
      title: "SEO Optimization",
      desc: "Rank higher on search engines and drive organic traffic to your website with our data-driven SEO techniques.",
      icon: "🔍",
    },
    {
      title: "Cyber Security",
      desc: "Protect your digital assets with our advanced security audits, monitoring, and threat prevention services.",
      icon: "🛡️",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discovery",
      desc: "We dive deep into your brand, goals, and target audience.",
    },
    {
      number: "02",
      title: "Strategy",
      desc: "Detailed planning and architecture of your digital solution.",
    },
    {
      number: "03",
      title: "Design",
      desc: "Creating stunning visuals and intuitive user interfaces.",
    },
    {
      number: "04",
      title: "Development",
      desc: "Bringing the design to life with clean, efficient code.",
    },
    {
      number: "05",
      title: "Launch",
      desc: "Deploying your project and ensuring everything runs smoothly.",
    },
  ];

  return (
    <div className="services-page">
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <h1 className="section-title">
            Our <span>Premium Services</span>
          </h1>
          <p className="section-desc">
            We provide a comprehensive suite of digital services designed to
            propel your business into the future.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div
                  className="service-icon"
                  style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}
                >
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section glass">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              How We <span>Work</span>
            </h2>
            <p className="section-desc">
              Our proven methodology ensures that every project is delivered on
              time and exceeds expectations.
            </p>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>
              Ready to Start Your <span>Success Story?</span>
            </h2>
            <p>
              Let's collaborate to build something extraordinary. Our team is
              ready to turn your vision into a digital masterpiece.
            </p>
            <button
              className="btn-primary"
              style={{ padding: "1.2rem 3rem", fontSize: "1.1rem" }}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
