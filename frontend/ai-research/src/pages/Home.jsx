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

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar
        setReport={setReport}
        setLoading={setLoading}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col items-center p-6">

        <h1 className="text-3xl font-bold mb-6">
          AI Research Agent
        </h1>

        {/* INPUT SECTION */}
        <div className="flex w-full max-w-2xl gap-2">
          <input
            className="flex-1 p-3 rounded text-black"
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
          />

          <button
            onClick={generateResearch}
            disabled={loading}
            className={`px-5 rounded ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {/* PDF EXPORT BUTTON */}
          {report && !loading && (
            <button
              onClick={() =>
                exportToPDF(
                  "report-content",
                  "AI-Research-Report.pdf"
                )
              }
              className="bg-green-600 px-4 rounded"
            >
              Export PDF
            </button>
          )}
        </div>

        {/* LOADER */}
        {loading && <Loader />}

        {/* REPORT */}
        <div
          id="report-content"
          className="mt-6 w-full max-w-3xl bg-slate-900 p-6 rounded-xl prose prose-invert"
        >
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
};

export default Home;