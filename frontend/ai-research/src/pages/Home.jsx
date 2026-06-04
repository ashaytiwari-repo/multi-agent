import { useState } from "react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { exportToPDF } from "../utils/pdfExport";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResearch = async () => {
    if (!topic.trim()) return;
    try {
      setLoading(true);
      setReport("");
      const res = await API.post("/research", { topic });
      setReport(res.data.research.report);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) generateResearch();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rai-root {
          display: flex;
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf2;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Starfield background */
        .rai-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 38% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 40%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 65%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 28% 90%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 62% 33%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at 8% 75%, rgba(120,140,255,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 95% 15%, rgba(100,180,255,0.35) 0%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Aurora glow */
        .rai-root::after {
          content: '';
          position: fixed;
          top: -30%;
          left: -10%;
          width: 70%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(56,78,200,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── SIDEBAR ── */
        .rai-sidebar-wrap {
          position: relative;
          z-index: 10;
          width: 260px;
          flex-shrink: 0;
        }

        /* ── MAIN ── */
        .rai-main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem 4rem;
          max-width: calc(100vw - 260px);
        }

        /* ── HEADER ── */
        .rai-header {
          width: 100%;
          max-width: 760px;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .rai-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5b7dff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rai-eyebrow::before,
        .rai-eyebrow::after {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #5b7dff);
        }
        .rai-eyebrow::after {
          background: linear-gradient(90deg, #5b7dff, transparent);
        }

        .rai-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-align: center;
          background: linear-gradient(135deg, #e8eaf2 30%, #8899dd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rai-subtitle {
          font-size: 14px;
          font-weight: 400;
          color: #5a6080;
          letter-spacing: 0.01em;
          font-family: 'DM Mono', monospace;
        }

        /* ── INPUT PANEL ── */
        .rai-input-panel {
          width: 100%;
          max-width: 720px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 6px 6px 6px 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s;
          box-shadow: 0 0 0 0 rgba(91,125,255,0);
        }

        .rai-input-panel:focus-within {
          border-color: rgba(91,125,255,0.5);
          box-shadow: 0 0 32px rgba(91,125,255,0.08), 0 0 0 1px rgba(91,125,255,0.2);
        }

        .rai-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e8eaf2;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 400;
          caret-color: #5b7dff;
        }

        .rai-input::placeholder {
          color: #2e3454;
        }

        .rai-btn-generate {
          flex-shrink: 0;
          padding: 12px 28px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #3a54d4 0%, #5b7dff 100%);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }

        .rai-btn-generate:disabled {
          background: rgba(255,255,255,0.07);
          color: #3a3f5c;
          cursor: not-allowed;
        }

        .rai-btn-generate:not(:disabled):hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .rai-btn-generate:not(:disabled):active {
          transform: translateY(0);
        }

        .rai-btn-export {
          flex-shrink: 0;
          padding: 12px 20px;
          border: 1px solid rgba(52,211,153,0.35);
          border-radius: 14px;
          background: rgba(52,211,153,0.08);
          color: #34d399;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rai-btn-export:hover {
          background: rgba(52,211,153,0.16);
          transform: translateY(-1px);
        }

        /* ── HINT CHIPS ── */
        .rai-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 1.25rem;
          justify-content: center;
        }

        .rai-chip {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          color: #3a4070;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 5px 14px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: 0.01em;
        }

        .rai-chip:hover {
          color: #8899dd;
          border-color: rgba(91,125,255,0.35);
        }

        /* ── LOADER ── */
        .rai-loader-wrap {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .rai-loader-bar {
          width: 240px;
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .rai-loader-bar::after {
          content: '';
          position: absolute;
          left: -60%;
          top: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #5b7dff, #a78bfa, transparent);
          animation: rai-scan 1.6s ease-in-out infinite;
        }

        @keyframes rai-scan {
          0% { left: -60%; }
          100% { left: 110%; }
        }

        .rai-loader-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.12em;
          color: #3a4070;
          text-transform: uppercase;
        }

        /* ── REPORT ── */
        .rai-report-wrap {
          margin-top: 2.5rem;
          width: 100%;
          max-width: 760px;
          animation: rai-fade-in 0.5s ease;
        }

        @keyframes rai-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rai-report-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .rai-report-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5b7dff;
          background: rgba(91,125,255,0.1);
          border: 1px solid rgba(91,125,255,0.25);
          border-radius: 6px;
          padding: 4px 10px;
        }

        .rai-report-divider {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        .rai-report-body {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(8px);
        }

        /* Markdown styles */
        .rai-report-body h1,
        .rai-report-body h2,
        .rai-report-body h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: #c8ccee;
          margin: 1.8em 0 0.6em;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .rai-report-body h1 { font-size: 1.6rem; }
        .rai-report-body h2 { font-size: 1.25rem; }
        .rai-report-body h3 { font-size: 1.05rem; color: #9ba8d8; }

        .rai-report-body p {
          font-size: 15px;
          line-height: 1.8;
          color: #7a82a8;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .rai-report-body strong {
          color: #b8bedd;
          font-weight: 600;
        }

        .rai-report-body ul,
        .rai-report-body ol {
          margin: 0.75rem 0 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .rai-report-body li {
          font-size: 14.5px;
          line-height: 1.7;
          color: #7a82a8;
        }

        .rai-report-body blockquote {
          border-left: 2px solid #5b7dff;
          margin: 1.2rem 0;
          padding: 0.5rem 1.2rem;
          color: #5a6080;
          font-style: italic;
        }

        .rai-report-body code {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          background: rgba(91,125,255,0.1);
          border: 1px solid rgba(91,125,255,0.2);
          border-radius: 5px;
          padding: 2px 7px;
          color: #8899dd;
        }

        .rai-report-body pre {
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .rai-report-body pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: #7a9fd8;
        }

        .rai-report-body a {
          color: #5b7dff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .rai-report-body hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 2rem 0;
        }

        /* Gradient bottom fade on report */
        .rai-report-fade {
          position: relative;
          pointer-events: none;
        }
      `}</style>

      <div className="rai-root">

        {/* Sidebar */}
        <div className="rai-sidebar-wrap">
          <Sidebar setReport={setReport} setLoading={setLoading} />
        </div>

        {/* Main content */}
        <main className="rai-main">

          {/* Header */}
          <header className="rai-header">
            <span className="rai-eyebrow">Powered by AI</span>
            <h1 className="rai-title">AI Research Agent</h1>
            <p className="rai-subtitle">// deep-dive synthesis on any topic</p>
          </header>

          {/* Input panel */}
          <div className="rai-input-panel">
            <input
              className="rai-input"
              placeholder="What should we explore today?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {report && !loading && (
              <button
                className="rai-btn-export"
                onClick={() => exportToPDF("report-content", "AI-Research-Report.pdf")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                PDF
              </button>
            )}

            <button
              className="rai-btn-generate"
              onClick={generateResearch}
              disabled={loading}
            >
              {loading ? "Generating…" : "Generate →"}
            </button>
          </div>

          {/* Hint chips */}
          {!report && !loading && (
            <div className="rai-chips">
              {["Quantum computing", "Climate tipping points", "CRISPR gene editing", "Dark matter", "AGI timelines"].map((hint) => (
                <button
                  key={hint}
                  className="rai-chip"
                  onClick={() => setTopic(hint)}
                >
                  {hint}
                </button>
              ))}
            </div>
          )}

          {/* Loader */}
          {loading && (
            <div className="rai-loader-wrap">
              <Loader />
              <div className="rai-loader-bar" />
              <span className="rai-loader-label">Synthesizing research…</span>
            </div>
          )}

          {/* Report */}
          {report && !loading && (
            <div className="rai-report-wrap">
              <div className="rai-report-header">
                <span className="rai-report-tag">Report</span>
                <div className="rai-report-divider" />
              </div>
              <div id="report-content" className="rai-report-body">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default Home;