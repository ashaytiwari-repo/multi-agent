import { useState } from "react";
import { signupUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const handleChange = (e) => {
    setError("");
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (e.target.name === "password") setStrength(calcStrength(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await signupUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Signup failed. That email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#f87171", "#fb923c", "#facc15", "#34d399"][strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .su-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080b12;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .su-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 9%,  rgba(255,255,255,.4)  0%, transparent 100%),
            radial-gradient(1px 1px at 42% 55%, rgba(255,255,255,.3)  0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 40%, rgba(255,255,255,.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,.3)  0%, transparent 100%),
            radial-gradient(1px 1px at 92% 66%, rgba(255,255,255,.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 28% 88%, rgba(255,255,255,.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 5% 74%, rgba(120,140,255,.4)  0%, transparent 100%),
            radial-gradient(2px 2px at 94% 13%, rgba(100,180,255,.3)  0%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        .su-aurora {
          position: fixed;
          top: -20%;
          right: -10%;
          width: 60%;
          height: 55%;
          background: radial-gradient(ellipse, rgba(80,40,200,.11) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        .su-aurora2 {
          position: fixed;
          bottom: -20%;
          left: -10%;
          width: 55%;
          height: 50%;
          background: radial-gradient(ellipse, rgba(40,100,200,.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .su-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          margin: 1.5rem;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 24px;
          padding: 2.75rem 2.5rem 2.5rem;
          backdrop-filter: blur(16px);
          box-shadow: 0 32px 64px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.04);
          animation: su-in .5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes su-in {
          from { opacity: 0; transform: translateY(24px) scale(.98); }
          to   { opacity: 1; transform: none; }
        }

        .su-badge {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(52,211,153,.08);
          border: 1px solid rgba(52,211,153,.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .su-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #34d399;
          margin-bottom: 6px;
        }

        .su-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.1;
          background: linear-gradient(135deg, #e8eaf2 30%, #6ee7b7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: .35rem;
        }

        .su-sub {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 300;
          color: #1e3040;
          letter-spacing: .03em;
          margin-bottom: 2rem;
        }

        .su-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,.05);
          margin-bottom: 2rem;
        }

        .su-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 1rem;
        }

        .su-label {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #3a4070;
        }

        .su-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .su-input-icon {
          position: absolute;
          left: 14px;
          color: #2e3454;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .su-input {
          width: 100%;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          padding: 13px 14px 13px 40px;
          color: #e8eaf2;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          caret-color: #34d399;
          transition: border-color .2s, box-shadow .2s;
        }

        .su-input::placeholder { color: #1e2238; }

        .su-input:focus {
          border-color: rgba(52,211,153,.4);
          box-shadow: 0 0 0 3px rgba(52,211,153,.07);
        }

        .su-input.error { border-color: rgba(248,113,113,.4); }

        .su-eye {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #2e3454;
          display: flex;
          padding: 4px;
          border-radius: 6px;
          transition: color .2s;
        }
        .su-eye:hover { color: #6ee7b7; }

        /* password strength */
        .su-strength {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .su-bars {
          display: flex;
          gap: 4px;
          flex: 1;
        }

        .su-bar {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          background: rgba(255,255,255,.07);
          transition: background .3s;
        }

        .su-strength-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: .08em;
          min-width: 36px;
          text-align: right;
          transition: color .3s;
        }

        /* error */
        .su-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(248,113,113,.07);
          border: 1px solid rgba(248,113,113,.2);
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 1.2rem;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          color: #f87171;
          letter-spacing: .02em;
          animation: su-shake .35s ease;
        }

        @keyframes su-shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }

        /* hints row */
        .su-hints {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 5px;
        }

        .su-hint {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: .04em;
          padding: 3px 9px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,.06);
          color: #2e3454;
          transition: color .2s, border-color .2s;
        }

        .su-hint.ok {
          color: #34d399;
          border-color: rgba(52,211,153,.25);
        }

        /* submit */
        .su-submit {
          width: 100%;
          margin-top: 1.5rem;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #0d9e6e 0%, #34d399 100%);
          color: #022c1e;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          transition: opacity .2s, transform .15s;
        }

        .su-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .su-submit:disabled { opacity: .45; cursor: not-allowed; }
        .su-submit:not(:disabled):hover { opacity: .88; transform: translateY(-1px); }
        .su-submit:not(:disabled):active { transform: translateY(0); }

        .su-spin {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(2,44,30,.3);
          border-top-color: #022c1e;
          animation: su-spinner .7s linear infinite;
        }

        @keyframes su-spinner { to { transform: rotate(360deg); } }

        .su-login-link {
          margin-top: 1.5rem;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          color: #2e3454;
          letter-spacing: .04em;
        }

        .su-login-link a {
          color: #34d399;
          text-decoration: none;
          border-bottom: 1px solid rgba(52,211,153,.3);
          padding-bottom: 1px;
          transition: border-color .2s;
        }

        .su-login-link a:hover { border-color: #34d399; }

        .su-footer {
          margin-top: .75rem;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: #1a1f30;
          letter-spacing: .06em;
        }
      `}</style>

      <div className="su-page">
        <div className="su-aurora" />
        <div className="su-aurora2" />

        <div className="su-card">

          {/* Badge */}
          <div className="su-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Heading */}
          <p className="su-eyebrow">AI Research Agent</p>
          <h1 className="su-title">Create account</h1>
          <p className="su-sub">// start your research journey</p>

          <div className="su-divider" />

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="su-field">
              <label className="su-label">Full name</label>
              <div className="su-input-wrap">
                <span className="su-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Ada Lovelace"
                  className={`su-input${error ? " error" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="su-field">
              <label className="su-label">Email</label>
              <div className="su-input-wrap">
                <span className="su-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`su-input${error ? " error" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="su-field">
              <label className="su-label">Password</label>
              <div className="su-input-wrap">
                <span className="su-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="min. 8 characters"
                  className={`su-input${error ? " error" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="su-eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>

              {/* Strength meter */}
              {formData.password && (
                <div className="su-strength">
                  <div className="su-bars">
                    {[1,2,3,4].map((i) => (
                      <div
                        key={i}
                        className="su-bar"
                        style={{ background: i <= strength ? strengthColor : undefined }}
                      />
                    ))}
                  </div>
                  <span className="su-strength-label" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}

              {/* Hint chips */}
              <div className="su-hints">
                {[
                  { label: "8+ chars", ok: formData.password.length >= 8 },
                  { label: "Uppercase", ok: /[A-Z]/.test(formData.password) },
                  { label: "Number",    ok: /[0-9]/.test(formData.password) },
                  { label: "Symbol",    ok: /[^A-Za-z0-9]/.test(formData.password) },
                ].map(({ label, ok }) => (
                  <span key={label} className={`su-hint${ok ? " ok" : ""}`}>
                    {ok ? "✓ " : ""}{label}
                  </span>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="su-error">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="su-submit" disabled={loading}>
              {loading
                ? <><div className="su-spin" /> Creating account…</>
                : <>Create account →</>
              }
            </button>
          </form>

          <p className="su-login-link">
            already have an account?{" "}
            <a href="/login">sign in</a>
          </p>

          <p className="su-footer">// your data is encrypted at rest</p>
        </div>
      </div>
    </>
  );
}