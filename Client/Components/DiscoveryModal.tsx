import React, { useState, useRef, useEffect } from "react";

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [industry, setIndustry] = useState("Other");
  const [budget, setBudget] = useState("medium");
  const [timeline, setTimeline] = useState("3-6 months");
  const [priority, setPriority] = useState("Growth");
  const [readinessScore, setReadinessScore] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setReadinessScore(computeReadiness(budget, timeline, priority));
  }, [budget, timeline, priority]);
  const services = [
    { id: "web", title: "Web Development", icon: "🌐" },
    { id: "app", title: "Mobile App", icon: "📱" },
    { id: "design", title: "Branding & UI/UX", icon: "🎨" },
    { id: "strategy", title: "Digital Strategy", icon: "📈" },
  ];

  const computeReadiness = (
    budget: string,
    timeline: string,
    priority: string,
  ) => {
    let score = 0;
    if (budget === "high") score += 30;
    if (budget === "medium") score += 20;
    if (budget === "low") score += 10;

    if (timeline === "0-3 months") score += 30;
    if (timeline === "3-6 months") score += 20;
    if (timeline === "6+ months") score += 10;

    if (priority === "Growth") score += 25;
    if (priority === "Efficiency") score += 20;
    if (priority === "Brand") score += 15;
    if (priority === "Innovation") score += 30;

    return Math.min(100, score);
  };

  if (!isOpen) return null;

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setStep(2);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService("");
    setIndustry("Other");
    setBudget("medium");
    setTimeline("3-6 months");
    setPriority("Growth");
    setReadinessScore(0);
    setStatus("idle");
    onClose();
  };

  const sendLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");

    const formData = new FormData(form.current);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "d6d9de9e-820b-45e5-af3f-5603b1900dca";
    formData.append("access_key", accessKey);
    formData.append("subject", "New Lead Inquiry - Waveworld");
    
    // Add custom state fields so Web3Forms captures them
    formData.append("industry", industry);
    formData.append("budget", budget);
    formData.append("timeline", timeline);
    formData.append("priority", priority);
    
    const score = computeReadiness(budget, timeline, priority);
    formData.append("readiness_score", score.toString() + "%");

    // Save to Local Storage for in-website dashboard
    try {
      const existingMessages = JSON.parse(
        localStorage.getItem("waveworld_messages") || "[]",
      );
      setReadinessScore(score);

      const newLead = {
        id: Date.now(),
        name: "New Lead Inquiry",
        email: form.current.user_email.value,
        message: `Interest in: ${services.find((s) => s.id === selectedService)?.title}`,
        timestamp: new Date().toLocaleString(),
        type: "Project Lead",
        status: "New",
        service: services.find((s) => s.id === selectedService)?.title,
        industry,
        budget,
        timeline,
        priority,
        readinessScore: score,
      };
      localStorage.setItem(
        "waveworld_messages",
        JSON.stringify([newLead, ...existingMessages]),
      );
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
        setStatus("success");
        setStep(3);
      } else {
        console.error(data);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="discovery-overlay" onClick={resetAndClose}>
      <div
        className="discovery-modal glass"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-progress-container">
          <div className="modal-progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <button className="close-btn" onClick={resetAndClose}>
          ×
        </button>

        {step === 1 && (
          <div className="discovery-step">
            <h2>
              What are we <span>Building Today?</span>
            </h2>
            <p>Select a service to start your journey with Waveworld.</p>
            <div className="discovery-grid">
              {services.map((s) => (
                <div
                  key={s.id}
                  className={`discovery-option shadow-glass ${selectedService === s.id ? "active" : ""}`}
                  onClick={() => handleServiceSelect(s.id)}
                >
                  <div className="option-icon">{s.icon}</div>
                  <h4>{s.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="discovery-step success-step">
            <div className="success-icon">✨</div>
            <h2>
              Excellent <span>Choice!</span>
            </h2>
            <p>
              You've selected{" "}
              <strong>
                {services.find((s) => s.id === selectedService)?.title}
              </strong>
              . Our experts are ready to bring this vision to life.
            </p>
            <form ref={form} className="discovery-form" onSubmit={sendLead}>
              {/* Hidden field for template mapping */}
              <input
                type="hidden"
                name="service_interest"
                value={services.find((s) => s.id === selectedService)?.title}
              />

              <div className="form-group-spacing">
                <label className="form-label">Industry</label>
                <div className="modern-chip-group">
                  {["Healthcare", "Finance", "E-commerce", "SaaS", "Education", "Other"].map(ind => (
                    <button type="button" key={ind} className={`chip-btn ${industry === ind ? 'active' : ''}`} onClick={() => setIndustry(ind)}>{ind}</button>
                  ))}
                </div>
              </div>

              <div className="form-group-spacing">
                <label className="form-label">Budget</label>
                <div className="modern-chip-group">
                  {[{l: "Low (< $15k)", v:"low"}, {l:"Medium ($15k-$50k)", v:"medium"}, {l:"High (> $50k)", v:"high"}].map(b => (
                    <button type="button" key={b.v} className={`chip-btn ${budget === b.v ? 'active' : ''}`} onClick={() => setBudget(b.v)}>{b.l}</button>
                  ))}
                </div>
              </div>

              <div className="form-group-spacing">
                <label className="form-label">Timeline</label>
                <div className="modern-chip-group">
                  {["0-3 months", "3-6 months", "6+ months"].map(t => (
                    <button type="button" key={t} className={`chip-btn ${timeline === t ? 'active' : ''}`} onClick={() => setTimeline(t)}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="form-group-spacing">
                <label className="form-label">Primary Goal</label>
                <div className="modern-chip-group">
                  {["Growth", "Efficiency", "Brand", "Innovation"].map(p => (
                    <button type="button" key={p} className={`chip-btn ${priority === p ? 'active' : ''}`} onClick={() => setPriority(p)}>{p}</button>
                  ))}
                </div>
              </div>

              <input
                name="user_email"
                type="email"
                placeholder="Your work email"
                className="glass-input"
                required
              />

              <div className="readiness-box">
                Project readiness score: <strong>{readinessScore}%</strong>
                <small>
                  {readinessScore >= 70
                    ? "Great readiness!"
                    : "We can help you firm this up."}
                </small>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`btn-primary ${status === "sending" ? "loading" : ""}`}
              >
                {status === "sending" ? "Initiating..." : "Finalize Lead"}
              </button>

              {status === "error" && (
                <p className="form-error-text" style={{ marginTop: "1rem" }}>
                  Something went wrong. Please check your keys.
                </p>
              )}
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="discovery-step finish-step">
            <div className="finish-icon">🚀</div>
            <h2>
              Submission <span>Received!</span>
            </h2>
            <p>
              We've received your request. Expect a tailored proposal in your
              inbox within the next 24 hours.
            </p>
            <button className="btn-secondary" onClick={resetAndClose}>
              Close Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryModal;
