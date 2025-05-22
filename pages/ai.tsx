// pages/ai.tsx
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const VoiceToText = dynamic(() => import("../components/VoiceToText"), { ssr: false });

const AI: React.FC = () => {
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranscription = (text: string) => {
    setTranscription(text);
  };

  const analyzeSpeech = async () => {
    setLoading(true);
    try {
      // Gửi transcription tới backend để xử lý AI phản hồi
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: transcription })
      });
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      setAiResponse("Error processing request");
    }
    setLoading(false);
  };

  return (
    <div className="ai-page" style={{ padding: "1rem" }}>
      <h1>AI Huấn Luyện Nói Tiếng Anh</h1>
      <p>Nói tiếng Anh của bạn sẽ được phân tích và AI sẽ phản hồi.</p>
      <VoiceToText onResult={handleTranscription} />
      <div style={{ marginTop: "1rem" }}>
        <p><strong>Bản ghi:</strong> {transcription}</p>
        <button onClick={analyzeSpeech} disabled={loading || !transcription}>
          {loading ? "Đang phân tích..." : "Phân tích"}
        </button>
      </div>
      {aiResponse && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Phản hồi từ AI:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AI;
