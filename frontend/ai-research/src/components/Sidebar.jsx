import { useEffect, useState } from "react";
import { getHistory, getResearchById } from "../services/historyApi";

export default function Sidebar({ setReport, setLoading }) {
  const [history, setHistory] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  const openReport = async (id) => {
    try {
      setActiveId(id);
      setLoading(true);
      const data = await getResearchById(id);
      setReport(data.report);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@400;500;600;700&display=swap');

        .sb-root {
          width: ${collapsed ? "60px" : "260px"};
          min-height: 100vh;
          background: rgba(255,255,255,0.018);
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          font-family: 'Syne', sans-serif;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .sb-root { display: none; }
        }

        /* top bar */
        .sb-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 16px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          gap: 8px;
          min-height: 64px;
        }

        .sb-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #5b7dff;
          white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
          font-family: 'DM Mono', monospace;
        }

        .sb-toggle {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: #3a4070;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, background 0.2s;
        }

        .sb-toggle:hover {
          color: #8899dd;
          background: rgba(91,125,255,0.08);
        }

        /* count badge */
        .sb-badge {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: #5b7dff;
          background: rgba(91,125,255,0.1);
          border: 1px solid rgba(91,125,255,0.2);
          border-radius: 20px;
          padding: 2px 8px;
          white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
        }

        /* list */
        .sb-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sb-list::-webkit-scrollbar { width: 3px; }
        .sb-list::-webkit-scrollbar-track { background: transparent; }
        .sb-list::-webkit-scrollbar-thumb { background: rgba(91,125,255,0.2); border-radius: 3px; }

        /* empty state */
        .sb-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 2rem 1rem;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
        }

        .sb-empty-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2e3454;
        }

        .sb-empty-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          color: #2e3454;
          text-align: center;
          letter-spacing: 0.04em;
        }

        /* item */
        .sb-item {
          border-radius: 10px;
          border: 1px solid transparent;
          padding: ${collapsed ? "10px 0" : "10px 12px"};
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
          overflow: hidden;
          justify-content: ${collapsed ? "center" : "flex-start"};
          display: flex;
          flex-direction: ${collapsed ? "row" : "column"};
          align-items: ${collapsed ? "center" : "flex-start"};
          gap: 5px;
        }

        .sb-item:hover {
          background: rgba(91,125,255,0.07);
          border-color: rgba(91,125,255,0.15);
        }

        .sb-item.active {
          background: rgba(91,125,255,0.1);
          border-color: rgba(91,125,255,0.3);
        }

        .sb-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 2px;
          background: #5b7dff;
          border-radius: 2px;
        }

        .sb-item-dot {
          flex-shrink: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(91,125,255,0.3);
          margin-top: ${collapsed ? "0" : "3px"};
          transition: background 0.15s;
        }

        .sb-item.active .sb-item-dot,
        .sb-item:hover .sb-item-dot {
          background: #5b7dff;
        }

        .sb-item-content {
          flex: 1;
          min-width: 0;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.15s;
          width: ${collapsed ? "0" : "auto"};
          overflow: hidden;
        }

        .sb-item-topic {
          font-size: 13px;
          font-weight: 500;
          color: #8899cc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .sb-item.active .sb-item-topic {
          color: #c8ccee;
        }

        .sb-item-date {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: #2e3454;
          letter-spacing: 0.03em;
          margin-top: 2px;
        }

        /* footer */
        .sb-footer {
          padding: 12px 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
          pointer-events: ${collapsed ? "none" : "auto"};
        }

        .sb-footer-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: #1e2238;
          letter-spacing: 0.06em;
          text-align: center;
        }
      `}</style>

      <aside className="sb-root">

        {/* Top bar */}
        <div className="sb-topbar">
          {!collapsed && <span className="sb-title">History</span>}
          {!collapsed && history.length > 0 && (
            <span className="sb-badge">{history.length}</span>
          )}
          <button
            className="sb-toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ marginLeft: collapsed ? "auto" : undefined, marginRight: collapsed ? "auto" : undefined }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {collapsed
                ? <><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></>
                : <><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></>
              }
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="sb-list">
          {history.length === 0 ? (
            <div className="sb-empty">
              <div className="sb-empty-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <p className="sb-empty-text">no research yet</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item._id}
                className={`sb-item${activeId === item._id ? " active" : ""}`}
                onClick={() => openReport(item._id)}
                title={collapsed ? item.topic : undefined}
              >
                <div className="sb-item-dot" />
                <div className="sb-item-content">
                  <p className="sb-item-topic">{item.topic}</p>
                  <p className="sb-item-date">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                      : "no date"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="sb-footer">
          <p className="sb-footer-text">// research archive</p>
        </div>

      </aside>
    </>
  );
}