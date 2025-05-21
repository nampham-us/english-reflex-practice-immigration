// components/AIFeedback.tsx
import React, { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

type AIFeedbackProps = {
  audioBlob: Blob;
};

type Feedback = {
  transcript: string;
  pronunciationScore: number; // Giả sử AI trả về điểm phát âm
  suggestions: string[];
};

const AIFeedback: React.FC<AIFeedbackProps> = ({ audioBlob }) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSpeech = async () => {
    setLoading(true);
    // Giả sử API AI trả về một đối tượng Feedback
    // Bạn cần thay thế đoạn này bằng logic gọi API thực tế và xử lý phản hồi

    // Ví dụ giả lập phản hồi
    setTimeout(() => {
      setFeedback({
        transcript: 'This is a sample transcript.',
        pronunciationScore: 85, // Điểm giả định
        suggestions: ['Pronounce "sample" more clearly.', 'Improve intonation on "transcript".'],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="ai-feedback-container">
      <button onClick={analyzeSpeech} className="btn-blue">
        {loading ? 'Đang phân tích...' : 'Phân Tích Giọng Nói'}
      </button>
      {feedback && (
        <div className="feedback-result">
          <h4>Phản Hồi:</h4>
          <p><strong>Bản văn:</strong> {feedback.transcript}</p>
          <p><strong>Điểm Phát Âm:</strong> {feedback.pronunciationScore}/100</p>
          <ul>
            {feedback.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIFeedback;