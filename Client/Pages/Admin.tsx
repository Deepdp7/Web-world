import { useState, useEffect } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  type: string;
  service?: string;
  status?: "New" | "Contacted" | "Proposal" | "Closed";
  readinessScore?: number;
}

const Admin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    const loadMessages = () => {
      const saved = localStorage.getItem("waveworld_messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    };

    loadMessages();
    window.addEventListener("storage", loadMessages);
    return () => window.removeEventListener("storage", loadMessages);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234") {
      // Use a simple passcode for now
      setIsAuthenticated(true);
    } else {
      alert("Invalid Access Code");
    }
  };

  const deleteMessage = (id: number) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("waveworld_messages", JSON.stringify(updated));
  };

  const updateMessageStatus = (id: number, status: Message["status"]) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    setMessages(updated);
    localStorage.setItem("waveworld_messages", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([]);
      localStorage.removeItem("waveworld_messages");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card glass">
          <h2>
            Waveworld <span>Admin</span>
          </h2>
          <p>Please enter your private access code to view messages.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Access Code"
              className="glass-input"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container">
      <div className="admin-header">
        <h1 className="section-title">
          Message <span>Inbox</span>
        </h1>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={clearAll}>
            Clear All
          </button>
          <button
            className="btn-secondary"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card shadow-glass">
          <h3>{messages.filter((m) => m.type === "Contact Inquiry").length}</h3>
          <p>Direct Inquiries</p>
        </div>
        <div className="stat-card shadow-glass">
          <h3>{messages.filter((m) => m.type === "Project Lead").length}</h3>
          <p>Project Leads</p>
        </div>
        <div className="stat-card shadow-glass">
          <h3>{messages.filter((m) => m.status === "Proposal").length}</h3>
          <p>Proposals Pending</p>
        </div>
        <div className="stat-card shadow-glass">
          <h3>{messages.filter((m) => m.status === "Closed").length}</h3>
          <p>Closed Deals</p>
        </div>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="no-messages glass">
            <p>
              No messages yet. They will appear here once clients submit forms.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="message-card glass">
              <div className="message-header">
                <span
                  className={`message-badge ${m.type.toLowerCase().replace(" ", "-")}`}
                >
                  {m.type}
                </span>
                <span className="message-time">{m.timestamp}</span>
              </div>
              <div className="message-body">
                <h3>{m.name}</h3>
                <p className="message-email">{m.email}</p>
                <p>
                  <strong>Service:</strong> {m.service || "General"}
                </p>
                <p>
                  <strong>Readiness:</strong> {m.readinessScore ?? 0}%
                </p>
                <div className="message-text">
                  <p>{m.message}</p>
                </div>
              </div>
              <div className="message-footer">
                <label>
                  Status
                  <select
                    value={m.status || "New"}
                    onChange={(e) =>
                      updateMessageStatus(
                        m.id,
                        e.target.value as Message["status"],
                      )
                    }
                    className="glass-input"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Closed">Closed</option>
                  </select>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(m.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
