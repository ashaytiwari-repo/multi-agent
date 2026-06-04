import { useEffect, useState } from "react";
import {
    getHistory,
    getResearchById,
} from "../services/historyApi";

export default function Sidebar({
    setReport,
    setLoading,
}) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getHistory();
            setHistory(data);
        };

        fetchHistory();
    }, []);

    const openReport = async (id) => {
        try {
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
        <div className="w-72 bg-slate-900 p-4 hidden md:block overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
                Research History
            </h2>

            <div className="space-y-2">
                {history.map((item) => (
                    <div
                        key={item._id}
                        onClick={() => openReport(item._id)}
                        className="p-2 bg-slate-800 rounded cursor-pointer hover:bg-slate-700"
                    >
                        <p className="text-sm font-medium">
                            {item.topic}
                        </p>

                        <p className="text-xs text-gray-400">
                            {item.createdAt
                                ? new Date(item.createdAt).toLocaleString()
                                : "No Date"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}