import { Link } from "react-router-dom";

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/" className="logo">TenantTrails</Link>

        <div className="nav-actions">
          <Link to="/login">Sign In</Link>
          <Link to="/signup" className="nav-button">Get Started</Link>
        </div>
      </nav>

      <main className="hero">
        <p className="tagline">Launching in Halifax, Nova Scotia</p>

        <h1>
          Know what you're <br />
          signing before <br />
          you sign it.
        </h1>

        <p className="description">
          Read honest reviews from past tenants. See AI-generated summaries.
          Make informed decisions about where you live.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="primary-btn">Create Free Account</Link>
          <Link to="/login" className="secondary-btn">Sign In</Link>
        </div>

        <section className="features">
          <FeatureCard
            icon="⭐"
            title="Verified Reviews"
            text="Read ratings with photos and videos from past tenants."
          />
          <FeatureCard
            icon="🤖"
            title="AI Summaries"
            text="Key issues and sentiment extracted from every review."
          />
          <FeatureCard
            icon="💬"
            title="Ask Questions"
            text="Comment on reviews and get answers from past tenants."
          />
        </section>
      </main>
    </div>
  );
}

export default Landing;