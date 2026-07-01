import { useRef, useState, useEffect } from "react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedFeedbacks = JSON.parse(localStorage.getItem('waveworld_feedbacks') || '[]');
      setFeedbacks(storedFeedbacks);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    const formData = new FormData(form.current);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "d6d9de9e-820b-45e5-af3f-5603b1900dca";
    formData.append("access_key", accessKey);

    // Save to Local Storage for in-website dashboard
    try {
      const existingMessages = JSON.parse(localStorage.getItem('waveworld_messages') || '[]');
      const newMessage = {
        id: Date.now(),
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        timestamp: new Date().toLocaleString(),
        type: 'Contact Inquiry'
      };
      localStorage.setItem('waveworld_messages', JSON.stringify([newMessage, ...existingMessages]));
    } catch (e) {
      console.error(e);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error(data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="section-title">Get in <span>Touch</span></h1>
          <p className="section-desc">
            We are here to help you turn your digital vision into a reality. 
            Reach out to us today and let's get started.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="contact-main">
        <div className="container contact-grid">
          {/* Contact Info */}
          <div className="contact-info-panel shadow-glass">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>dp918121@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>7980975812</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>Madhyamgram, Kolkata, West Bengal, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-panel glass">
            {status === 'success' ? (
              <div className="form-success-message">
                <div className="success-check">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Deep Paul or our team will get back to you shortly.</p>
                <button className="btn-secondary" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form ref={form} className="contact-form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" type="text" placeholder="Your full name" className="glass-input" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="Your email address" className="glass-input" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell us about your project" className="glass-input" rows={5} required></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className={`btn-primary ${status === 'sending' ? 'loading' : ''}`}
                  style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="form-error-text">Something went wrong. Please check your keys or try again later.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Client Feedback Display Section */}
      <section className="services-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our <span>Clients Say</span></h2>
            <p className="section-desc">Real feedback from recent projects.</p>
          </div>
          
          <div className="projects-grid">
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, index) => (
                <div key={index} className="project-card shadow-glass" style={{ padding: '2rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{fb.name}</h3>
                    <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>
                      {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                    </div>
                  </div>
                  <span className="project-category" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                    Project: {fb.project}
                  </span>
                  <p style={{ fontStyle: 'italic', color: '#cbd5e1' }}>"{fb.comment}"</p>
                  <small style={{ color: '#64748b', display: 'block', marginTop: '1rem' }}>
                    {new Date(fb.timestamp).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <div className="no-results glass" style={{ padding: '3rem', width: '100%', gridColumn: '1 / -1' }}>
                <p>No client feedback has been submitted yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
