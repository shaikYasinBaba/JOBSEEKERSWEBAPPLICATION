import React, { useState } from 'react';
import './index.css';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', passcode: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { name, passcode } = formData;

    // Local frontend validation of credentials
    setTimeout(() => {
      if (name === 'yasin' && passcode === 'yasin123') {
        setStatus('success');
        setFormData({ name: '', passcode: '' });
        localStorage.clear(); // Clear all localStorage data on success
      } else {
        setStatus('error');
        setErrorMsg('Invalid credentials.');
      }
    }, 500); // Simulate some delay
  };

  const closePopup = () => {
    setShowPopup(false);
    setStatus('idle');
    setFormData({ name: '', passcode: '' });
    setErrorMsg('');
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <p><strong>SHAIK YASIN BABA</strong></p>
          <p>Suryapet, Telangana, 508206</p>
          <p>📞 9381125634 | 📧 <a href="mailto:shaikyasinbaba6@gmail.com">shaikyasinbaba6@gmail.com</a></p>
          <p>
            🔗 <a href="https://www.linkedin.com/in/yasin-baba-shaik-a37646369" target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
            💻 <a href="https://github.com/shaikYasinBaba" target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
            🧹 <span className="clear-db-link" onClick={() => setShowPopup(true)} style={{ cursor: 'pointer' }}>Clear DB</span>
          </p>
        </div>
      </footer>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            {status === 'success' ? (
              <div className="success-message">
                ✅ All data cleared successfully!
                <button className="btn" onClick={closePopup}>Close</button>
              </div>
            ) : (
              <>
                <h3>Confirm Clear Database</h3>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      autoFocus
                    />
                  </label>
                  <label>
                    Passcode:
                    <input
                      type="password"
                      name="passcode"
                      value={formData.passcode}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                    />
                  </label>
                  {errorMsg && <p className="error-text">❌ {errorMsg}</p>}
                  <div className="modal-buttons">
                    <button type="submit" className="btn danger" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Clearing...' : 'Confirm'}
                    </button>
                    <button type="button" className="btn" onClick={closePopup} disabled={status === 'loading'}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
