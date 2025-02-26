import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkNews = async () => {
    if (!text) return alert("Enter some text!");
    
    setLoading(true);
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/", { text });
      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Error checking news");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="max-w-lg w-full p-6 bg-gray-800 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Fake News Detector 📰
        </h1>
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter news text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={checkNews}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check News"}
        </button>
        {result && (
          <div className="mt-4 text-lg font-semibold text-center">
            {result === "Fake News" ? (
              <span className="text-red-500">🚨 Fake News Detected! 🚨</span>
            ) : (
              <span className="text-green-400">✅ This news seems real.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
