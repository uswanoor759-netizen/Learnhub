import { Link } from "react-router-dom";

const socialLinks = [
  { name: "YouTube", short: "YT", url: "https://www.youtube.com/" },
  { name: "TikTok", short: "TT", url: "https://www.tiktok.com/" },
  { name: "Instagram", short: "IG", url: "https://www.instagram.com/" },
  { name: "LinkedIn", short: "in", url: "https://www.linkedin.com/" },
  { name: "Facebook", short: "f", url: "https://www.facebook.com/" },
  { name: "GitHub", short: "GH", url: "https://github.com/" },
];

export default function Footer() {
  return (
    <footer className="learnhub-footer">
      <div className="container">
        <div className="footer-main">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <Link to="/" className="footer-brand">
                <span className="footer-logo">L</span>
                <span>LearnHub</span>
              </Link>

              <p className="footer-description">
                Learn with purpose. Grow with confidence.
                Build the skills that shape your future.
              </p>

              <p className="footer-social-label">CONNECT WITH US</p>

              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.short}
                  </a>
                ))}
              </div>
            </div>

            <div className="col-6 col-lg-2 col-md-3">
              <h5 className="footer-heading">Explore</h5>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/register">Join LearnHub</Link></li>
                <li><Link to="/login">Sign In</Link></li>
              </ul>
            </div>

            <div className="col-6 col-lg-2 col-md-3">
              <h5 className="footer-heading">Learning Space</h5>
              <ul className="footer-links">
                <li><Link to="/dashboard">Student Dashboard</Link></li>
                <li><Link to="/instructor">Instructor Studio</Link></li>
                <li><Link to="/courses">Discover Courses</Link></li>
                <li><Link to="/register">Create Account</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6">
              <span className="footer-eyebrow">YOUR JOURNEY STARTS HERE</span>

              <h4 className="footer-quote">
                Your future is built
                <br />
                one skill at a time.
              </h4>

              <p className="footer-inspiration">
                Every new skill is a new possibility.
                Start learning something meaningful today.
              </p>

              <Link to="/courses" className="footer-cta">
                Find Your Next Course <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>

          <p className="footer-made">
            Crafted for curious minds <span>✦</span>
          </p>

          <Link to="/" className="footer-back-top">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}