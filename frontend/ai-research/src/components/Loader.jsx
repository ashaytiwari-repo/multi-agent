const STEPS = [
  "Scanning knowledge vectors…",
  "Cross-referencing sources…",
  "Synthesizing insights…",
  "Composing report…",
];

export default function Loader() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@500;600&display=swap');

        .ldr-root {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2.5rem 0 1rem;
          font-family: 'Syne', sans-serif;
        }

        /* Orbital ring */
        .ldr-orbit {
          position: relative;
          width: 72px;
          height: 72px;
        }

        .ldr-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(91,125,255,0.15);
        }

        .ldr-ring::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color: #5b7dff;
          border-right-color: rgba(167,139,250,0.6);
          animation: ldr-spin 1.4s cubic-bezier(0.6,0.2,0.4,0.8) infinite;
        }

        .ldr-ring-inner {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 1px solid rgba(91,125,255,0.1);
        }

        .ldr-ring-inner::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-bottom-color: #a78bfa;
          border-left-color: rgba(91,125,255,0.4);
          animation: ldr-spin-rev 1.8s cubic-bezier(0.6,0.2,0.4,0.8) infinite;
        }

        .ldr-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5b7dff;
          animation: ldr-pulse 1.4s ease-in-out infinite;
        }

        @keyframes ldr-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ldr-spin-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes ldr-pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.2); }
        }

        /* Steps */
        .ldr-steps {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 260px;
        }

        .ldr-step {
          display: flex;
          align-items: center;
          gap: 10px;
          animation: ldr-step-in 0.4s ease both;
        }

        .ldr-step:nth-child(1) { animation-delay: 0.0s; }
        .ldr-step:nth-child(2) { animation-delay: 0.5s; }
        .ldr-step:nth-child(3) { animation-delay: 1.0s; }
        .ldr-step:nth-child(4) { animation-delay: 1.5s; }

        @keyframes ldr-step-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .ldr-step-pip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: rgba(91,125,255,0.25);
          animation: ldr-pip 2s ease-in-out infinite;
        }

        .ldr-step:nth-child(1) .ldr-step-pip { animation-delay: 0.0s; }
        .ldr-step:nth-child(2) .ldr-step-pip { animation-delay: 0.5s; }
        .ldr-step:nth-child(3) .ldr-step-pip { animation-delay: 1.0s; }
        .ldr-step:nth-child(4) .ldr-step-pip { animation-delay: 1.5s; }

        @keyframes ldr-pip {
          0%, 100% { background: rgba(91,125,255,0.2); }
          50%       { background: #5b7dff; }
        }

        .ldr-step-text {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #3a4070;
          animation: ldr-text-cycle 2s ease-in-out infinite;
        }

        .ldr-step:nth-child(1) .ldr-step-text { animation-delay: 0.0s; }
        .ldr-step:nth-child(2) .ldr-step-text { animation-delay: 0.5s; }
        .ldr-step:nth-child(3) .ldr-step-text { animation-delay: 1.0s; }
        .ldr-step:nth-child(4) .ldr-step-text { animation-delay: 1.5s; }

        @keyframes ldr-text-cycle {
          0%, 100% { color: #2e3454; }
          50%       { color: #8899dd; }
        }

        /* Progress track */
        .ldr-track {
          width: 200px;
          height: 1px;
          background: rgba(255,255,255,0.05);
          border-radius: 1px;
          overflow: hidden;
          position: relative;
        }

        .ldr-track::after {
          content: '';
          position: absolute;
          left: -50%;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #5b7dff, #a78bfa, transparent);
          animation: ldr-sweep 2s ease-in-out infinite;
        }

        @keyframes ldr-sweep {
          0%   { left: -50%; }
          100% { left: 110%; }
        }
      `}</style>

      <div className="ldr-root" role="status" aria-label="Generating research report">

        {/* Orbital spinner */}
        <div className="ldr-orbit">
          <div className="ldr-ring">
            <div className="ldr-ring-inner" />
            <div className="ldr-dot" />
          </div>
        </div>

        {/* Animated steps */}
        <div className="ldr-steps" aria-hidden="true">
          {STEPS.map((step) => (
            <div className="ldr-step" key={step}>
              <div className="ldr-step-pip" />
              <span className="ldr-step-text">{step}</span>
            </div>
          ))}
        </div>

        {/* Sweep bar */}
        <div className="ldr-track" aria-hidden="true" />

      </div>
    </>
  );
}