import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { exportToPDF } from "../utils/pdfExport";

const Home = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResearch = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      setReport("");

      const res = await API.post("/research", {
        topic,
      });

      setReport(res.data.research.report);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      generateResearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .rai-root {
          display: flex;
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf2;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

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

        .rai-sidebar-wrap {
          position: relative;
          z-index: 10;
          width: 260px;
          flex-shrink: 0;
        }

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

        .rai-header {
          width: 100%;
          max-width: 760px;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .rai-topbar {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }

        .rai-logout-btn {
          padding: 10px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #e8eaf2;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .rai-logout-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(91,125,255,0.35);
          transform: translateY(-1px);
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
        }

        .rai-input-panel:focus-within {
          border-color: rgba(91,125,255,0.5);
          box-shadow: 0 0 32px rgba(91,125,255,0.08),
                      0 0 0 1px rgba(91,125,255,0.2);
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
          cursor: pointer;
          transition: 0.2s;
        }

        .rai-btn-generate:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .rai-btn-generate:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          transition: 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rai-btn-export:hover {
          background: rgba(52,211,153,0.16);
          transform: translateY(-1px);
        }

        .rai-loader-wrap {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .rai-report-wrap {
          margin-top: 2.5rem;
          width: 100%;
          max-width: 760px;
        }

        .rai-report-body {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(8px);
        }

        .rai-report-body h1,
        .rai-report-body h2,
        .rai-report-body h3 {
          margin: 1rem 0;
          color: #dce1ff;
        }

        .rai-report-body p,
        .rai-report-body li {
          color: #a0a8c5;
          line-height: 1.8;
        }

        .rai-report-body code {
          background: rgba(91,125,255,0.1);
          padding: 2px 6px;
          border-radius: 6px;
        }
      `}</style>

      <div className="rai-root">

        {/* Sidebar */}
        <div className="rai-sidebar-wrap">
          <Sidebar
            setReport={setReport}
            setLoading={setLoading}
          />
        </div>

        {/* Main */}
        <main className="rai-main">

          {/* Header */}
          <header className="rai-header">

            <div className="rai-topbar">
              <button
                className="rai-logout-btn"
                onClick={handleLogout}
              >
                Logout →
              </button>
            </div>

            <span className="rai-eyebrow">
              Powered by AI
            </span>

            <h1 className="rai-title">
              AI Research Agent
            </h1>

            <p className="rai-subtitle">
              // deep-dive synthesis on any topic
            </p>
          </header>

          {/* Input */}
          <div className="rai-input-panel">

            <input
              className="rai-input"
              placeholder="What should we explore today?"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            {report && !loading && (
              <button
                className="rai-btn-export"
                onClick={() =>
                  exportToPDF(
                    "report-content",
                    "AI-Research-Report.pdf"
                  )
                }
              >
                PDF
              </button>
            )}

            <button
              className="rai-btn-generate"
              onClick={generateResearch}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate →"}
            </button>
          </div>

          {/* Loader */}
          {loading && (
            <div className="rai-loader-wrap">
              <Loader />
            </div>
          )}

          {/* Report */}
          {report && !loading && (
            <div className="rai-report-wrap">
              <div
                id="report-content"
                className="rai-report-body"
              >
                <ReactMarkdown>
                  {report}
                </ReactMarkdown>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default Home;