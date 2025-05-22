"use client";
// components/AIFeedback.tsx
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Tùy thuộc vào logic của bạn, bạn có thể tự động gọi phân tích khi nhận được audioBlob
    // Ví dụ:
    // analyzeSpeech();
  }, [audioBlob]);

  const analyzeSpeech = async () => {
    setLoading(true);
    // Gửi audioBlob hoặc transcript tới API để nhận phản hồi từ AI
    // Ví dụ: Gửi lên API `/api/ai-feedback`

    try {
      // Giả sử bạn đã có một API route để xử lý phản hồi AI
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];

        const response = await fetch('/api/ai-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ audioData: base64data }),
        });

        const data = await response.json();

        if (response.ok) {
          setFeedback(data.feedback);
        } else {
          console.error('Error from AI Feedback API:', data.error);
          setFeedback(null);
        }

        setLoading(false);
      };
    } catch (error) {
      console.error('Error analyzing speech:', error);
      setFeedback(null);
      setLoading(false);
    }
  };

  return (
    <div className="ai-feedback-container">
      <button onClick={analyzeSpeech} className="btn-blue" disabled={loading}>
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
