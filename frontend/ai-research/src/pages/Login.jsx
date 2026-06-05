import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const data = await loginUser(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080b12;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* starfield */
        .lg-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 7%,  rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 52%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 83% 38%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 58% 78%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 63%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 25% 88%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(2px 2px at 6% 72%, rgba(120,140,255,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 93% 14%, rgba(100,180,255,0.3) 0%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* aurora top-left */
        .lg-aurora {
          position: fixed;
          top: -25%;
          left: -15%;
          width: 65%;
          height: 55%;
          background: radial-gradient(ellipse, rgba(56,78,200,0.13) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        /* aurora bottom-right */
        .lg-aurora2 {
          position: fixed;
          bottom: -20%;
          right: -10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(ellipse, rgba(120,60,220,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* card */
        .lg-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          margin: 1.5rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.75rem 2.5rem 2.5rem;
          backdrop-filter: blur(16px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
          animation: lg-card-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes lg-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        /* icon badge */
        .lg-icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(91,125,255,0.1);
          border: 1px solid rgba(91,125,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        /* eyebrow */
        .lg-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5b7dff;
          margin-bottom: 6px;
        }

        .lg-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          background: linear-gradient(135deg, #e8eaf2 30%, #8899dd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.4rem;
        }

        .lg-sub {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 300;
          color: #2e3454;
          letter-spacing: 0.03em;
          margin-bottom: 2rem;
        }

        /* divider */
        .lg-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 2rem;
        }

        /* field */
        .lg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 1rem;
        }

        .lg-label {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3a4070;
        }

        .lg-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .lg-input-icon {
          position: absolute;
          left: 14px;
          color: #2e3454;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .lg-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 13px 14px 13px 40px;
          color: #e8eaf2;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          caret-color: #5b7dff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .lg-input::placeholder {
          color: #1e2238;
        }

        .lg-input:focus {
          border-color: rgba(91,125,255,0.45);
          box-shadow: 0 0 0 3px rgba(91,125,255,0.08);
        }

        .lg-input.error {
          border-color: rgba(248,113,113,0.4);
        }

        .lg-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #2e3454;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }

        .lg-eye-btn:hover { color: #8899dd; }

        /* error banner */
        .lg-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(248,113,113,0.07);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 1.2rem;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          color: #f87171;
          letter-spacing: 0.02em;
          animation: lg-shake 0.35s ease;
        }

        @keyframes lg-shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }

        /* submit */
        .lg-submit {
          width: 100%;
          margin-top: 1.5rem;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #3a54d4 0%, #5b7dff 100%);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .lg-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .lg-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lg-submit:not(:disabled):hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .lg-submit:not(:disabled):active {
          transform: translateY(0);
        }

        /* spinner inside button */
        .lg-spin {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          animation: lg-spinner 0.7s linear infinite;
        }

        @keyframes lg-spinner {
          to { transform: rotate(360deg); }
        }

        /* footer */
        .lg-footer {
          margin-top: 1.75rem;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          color: #1e2238;
          letter-spacing: 0.06em;
        }
      `}</style>

            <div className="lg-page">
                <div className="lg-aurora" />
                <div className="lg-aurora2" />

                <div className="lg-card">

                    {/* Icon */}
                    <div className="lg-icon-badge">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5b7dff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <p className="lg-eyebrow">AI Research Agent</p>
                    <h1 className="lg-title">Welcome back</h1>
                    <p className="lg-sub">// sign in to your workspace</p>

                    <div className="lg-divider" />

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Email */}
                        <div className="lg-field">
                            <label className="lg-label">Email</label>
                            <div className="lg-input-wrap">
                                <span className="lg-input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className={`lg-input${error ? " error" : ""}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="lg-field">
                            <label className="lg-label">Password</label>
                            <div className="lg-input-wrap">
                                <span className="lg-input-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className={`lg-input${error ? " error" : ""}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="lg-eye-btn"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword
                                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="lg-error">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button type="submit" className="lg-submit" disabled={loading}>
                            {loading
                                ? <><div className="lg-spin" /> Signing in…</>
                                : <>Sign in →</>
                            }
                        </button>
                    </form>
                    <div
                        style={{
                            marginTop: "1.5rem",
                            textAlign: "center",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "11px",
                            color: "#3a4070",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Don&apos;t have an account?{" "}

                        <span
                            onClick={() => navigate("/signup")}
                            style={{
                                color: "#5b7dff",
                                cursor: "pointer",
                                transition: "opacity 0.2s",
                            }}
                        >
                            Create Account
                        </span>
                    </div>

                    <p className="lg-footer">// your sessions are encrypted end-to-end</p>
                </div>
            </div>
        </>
    );
}