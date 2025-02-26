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
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Fake News Detector</h1>
      <textarea className="border p-2 w-full max-w-lg" rows="4" onChange={(e) => setText(e.target.value)}></textarea>
      <button onClick={checkNews} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? "Checking..." : "Check News"}
      </button>
      {result && <p className="mt-4 p-4 bg-gray-200 rounded">{result}</p>}
    </div>
  );
}
