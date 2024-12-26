import './App.css';
import { useState } from 'react';
import { requestToGroqAI } from "./utils/groq";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Ganti gaya sesuai preferensi Anda

function App() {
  const [content, setContent] = useState(""); // State untuk input pertanyaan
  const [data, setData] = useState(""); // State untuk respons dari GroqAI

  const handleSubmit = async () => {
    try {
      const ai = await requestToGroqAI(content); // Mengirim pertanyaan ke GroqAI
      setData(ai); // Menyimpan respons ke state
    } catch (error) {
      console.error("Error:", error); // Menangkap dan mencetak error ke console
    }
  };

  return (
    <main className="flex flex-col items-center min-h-[80vh] justify-center">
      {/* Header */}
      <h1 className="text-4xl text-indigo-500 mb-6">UcupAI with Groq and React</h1>

      {/* Form untuk input pertanyaan */}
      <form className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Pertanyaan"
          className="border border-indigo-500 py-3 px-3 rounded-md bg-transparent text-white w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
        >
          Kirim
        </button>
      </form>

      {/* Syntax Highlighter untuk respons */}
      <div className="border border-indigo-500 py-3 px-3 rounded-md bg-transparent text-white mt-6 w-full max-w-md">
        <SyntaxHighlighter language="json" style={dracula}>
          {data || "// Respons akan muncul di sini"}
        </SyntaxHighlighter>
      </div>
    </main>
  );
}

export default App;
