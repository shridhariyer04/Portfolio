import React, { useState, useRef, useEffect } from "react";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [localTime, setLocalTime] = useState("");
  const [shridharTime, setShridharTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString());
      const shridharDate = new Date(
        now.getTime() + (5.5 * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000)
      );
      setShridharTime(shridharDate.toLocaleTimeString());
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Contact - ${formData.name}`);
    const body = encodeURIComponent(
      `Hey, I'm ${formData.name}!\n\n` +
      `${formData.message}\n\n` +
      `Looking forward to connecting with you!\n\n` +
      `You can reach me at: ${formData.email}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=shreeiyer04@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="portfolio-footer active">
      <div className="footer-container">
        <div className="footer-top-divider"></div>
        
        <div className="footer-header">
          <h2 className="footer-tagline">Stay Connected</h2>
          <p className="footer-subtitle">Feel free to reach out for collaborations or just a friendly hello</p>
        </div>
        
        <div className="footer-content">
          {/* Contact Form Section */}
          <div className="contact-form-section">
            <div className="contact-card form-visible" style={{ opacity: 1, transform: 'translateY(0)' }}>
              <div className="card-glow"></div>
              <h3 className="contact-form-heading">Write a Message</h3>
              <div className="heading-underline"></div>
              
              {submitted ? (
                <div className="form-success-message">
                  <div className="success-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>Message sent successfully!</p>
                </div>
              ) : (
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} style={{ color: 'white' }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Hello! I'd like to discuss..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="spinner">
                        <span className="spinner-inner"></span>
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="form-decoration left-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
              <div className="decoration-square"></div>
            </div>
            
            <div className="form-decoration right-decoration">
              <div className="decoration-square"></div>
              <div className="decoration-line"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
          
          <div className="footer-grid">
            <div className="footer-links">
              <div className="footer-section">
                <h3 className="footer-heading">Menu</h3>
                <ul className="footer-list">
                  <li><a href="#home" className="footer-link">Home</a></li>
                  <li><a href="#services" className="footer-link">Services</a></li>
                  <li><a href="#projects" className="footer-link">Projects</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Socials</h3>
                <ul className="footer-list">
                  <li><a href="https://x.com/shridhar0405" target="_blank" rel="noopener noreferrer" className="footer-link">X</a></li>
                  <li><a href="https://github.com/shree42003" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
                  <li><a href="www.linkedin.com/in/shridhar-iyer-94a526272" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Resources</h3>
                <ul className="footer-list">
                  <li><a href="https://ijsrem.com/download/from-traditional-to-digital-evaluating-the-role-of-spirituality-in-mental-health-and-therapy/" target="_blank" rel="noopener noreferrer" className="footer-link">Paper Published</a></li>
                </ul>
              </div>
            </div>
            
            <div className="time-card">
              <div className="time-card-inner">
                <div className="time-entry">
                  <p className="time-label">Shridhar's Local Time</p>
                  <p className="time-value">{shridharTime}</p>
                </div>
                <div className="time-divider"></div>
                <div className="time-entry">
                  <p className="time-label">Your Local Time</p>
                  <p className="time-value">{localTime}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              <span>© {new Date().getFullYear()} Shridhar</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <a href="#top" className="back-to-top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </a>
    </div>
  );
};

export default ContactForm;