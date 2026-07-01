const Employees = () => {
  const team = [
    {
      name: "Deep",
      role: "Founder & Frontend Web Developer",
      bio: "Visionary leader with a passion for building scalable digital ecosystems. Alex has over 10 years of experience in full-stack engineering and architecture.",
      skills: ["System Design", "React", "Cloud Ops"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: "⚡",
    },
    {
      name: "Aritra",
      role: "Backend Web Developer",
      bio: "Crafting visually stunning and intuitive digital experiences. Sarah ensures that every Waveworld project is both beautiful and functional.",
      skills: ["Node.js", "PostgreSQL", "Scalability"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
      icon: "🚀",
    }
  ];

  return (
    <div className="employees-page">
      {/* 🚀 Team Hero Section */}
      <section className="employees-hero">
        <div className="container">
          <h1 className="section-title">
            The Minds <span>Behind Waveworld</span>
          </h1>
          <p className="section-desc">
            We are a group of dedicated professionals committed to pushing the
            boundaries of what's possible in the digital space.
          </p>
        </div>
      </section>

      {/* 👥 Team Grid Section */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="employee-card shadow-glass">
                <div className="member-icon-box">
                  <div className="member-icon">{member.icon}</div>
                </div>
                <div className="member-header">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>

                <div className="skill-badges">
                  {member.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="member-bio">{member.bio}</p>

                <div className="member-socials">
                  <a href={member.socials.linkedin} className="social-link">
                    LinkedIn
                  </a>
                  <a href={member.socials.github} className="social-link">
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 Career CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass">
            <h2>
              Want to join <span>Our Mission?</span>
            </h2>
            <p>
              We're always looking for talented individuals to help us shape the
              future of the digital world. Check our open positions.
            </p>
            <button
              className="btn-primary"
              style={{ padding: "1.2rem 3rem", fontSize: "1.1rem" }}
            >
              View Open Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
