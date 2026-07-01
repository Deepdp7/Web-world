import { useState, useMemo } from "react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const [reviewForm, setReviewForm] = useState({
    name: "",
    project: "Madhyamgram Rabindra Academy",
    rating: 5,
    comment: ""
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    setTimeout(() => {
      try {
        const existingFeedbacks = JSON.parse(localStorage.getItem('waveworld_feedbacks') || '[]');
        const newFeedback = {
          id: Date.now(),
          ...reviewForm,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('waveworld_feedbacks', JSON.stringify([newFeedback, ...existingFeedbacks]));
        
        setSubmitStatus('success');
        setReviewForm({ ...reviewForm, name: "", comment: "", rating: 5 });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } catch (err) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    }, 1000);
  };

  const projects = [
    {
      title: "Madhyamgram Rabindra Academy",
      category: "Education",
      desc: "A comprehensive digital school management and learning platform designed to streamline academic operations and enhance student engagement.",
      link: "https://madhyamgramrabindraacademy.in/",
      icon: "🎓",
      metrics: { uplift: "+70%", users: "6,500", time: "90 days" },
    },
    {
      title: "Family Bookstore",
      category: "E-Commerce",
      desc: "A premium online bookstore featuring a vast collection of literature, integrated payment gateways, and a user-friendly shopping experience.",
      link: "https://familybookstore.in/",
      icon: "📚",
      metrics: { uplift: "+38%", users: "12,000", time: "75 days" },
    },
  ];

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [],
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory, projects],
  );

  return (
    <div className="projects-page">
      {/* Projects Hero */}
      <section className="projects-hero">
        <div className="container">
          <h1 className="section-title">
            Our <span>Featured Projects</span>
          </h1>
          <p className="section-desc">
            Explore our curated portfolio of successful digital solutions
            delivered to our valued clients across multiple industries.
          </p>
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-card shadow-glass">
                <div
                  className="project-icon"
                  style={{ fontSize: "3rem", marginBottom: "1.5rem" }}
                >
                  {project.icon}
                </div>
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                <div className="project-metrics">
                  <div className="metric-item">
                    <strong>{project.metrics.uplift}</strong>
                    <span>Conversion Uplift</span>
                  </div>
                  <div className="metric-item">
                    <strong>{project.metrics.users}</strong>
                    <span>Active users</span>
                  </div>
                  <div className="metric-item">
                    <strong>{project.metrics.time}</strong>
                    <span>Delivery</span>
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ display: "inline-block", marginTop: "2rem" }}
                >
                  View Live Project
                </a>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              No projects found for this category.
            </div>
          )}
        </div>
      </section>

      {/* Leave a Feedback Form */}
      <section className="services-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client <span>Feedback</span></h2>
            <p className="section-desc">We value your input! Leave a review for your project below.</p>
          </div>

          <div className="contact-form-panel glass" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            {submitStatus === 'success' ? (
              <div className="form-success-message">
                <div className="success-check">✓</div>
                <h3>Feedback Submitted!</h3>
                <p>Thank you for your feedback. It has been saved successfully.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFeedbackSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    required 
                    placeholder="John Doe"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Project Name</label>
                  <select 
                    className="glass-input" 
                    value={reviewForm.project}
                    onChange={(e) => setReviewForm({...reviewForm, project: e.target.value})}
                  >
                    {projects.map(p => (
                      <option key={p.title} value={p.title} style={{color: '#000'}}>{p.title}</option>
                    ))}
                    <option value="Other Custom Project" style={{color: '#000'}}>Other Custom Project</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating (1-5 Stars)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    className="glass-input" 
                    required 
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Feedback Comment</label>
                  <textarea 
                    className="glass-input" 
                    rows={4} 
                    required
                    placeholder="Tell us about your experience..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={submitStatus === 'submitting'}
                  className={`btn-primary ${submitStatus === 'submitting' ? 'loading' : ''}`}
                  style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass">
            <h2>
              Ready to Start Your <span>Custom Project?</span>
            </h2>
            <p>
              We bring your ideas to life with precision and passion. Let's
              create something extraordinary together.
            </p>
            <button
              className="btn-primary"
              style={{ padding: "1.2rem 3rem", fontSize: "1.1rem" }}
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
