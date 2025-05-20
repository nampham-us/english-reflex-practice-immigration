// components/VoiceToText.tsx
import React, { useState, useEffect, useRef } from 'react';

const VoiceToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'en-US'; // Đặt ngôn ngữ phù hợp, ví dụ: 'vi-VN' cho tiếng Việt
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            setTranscript((prev) => prev + result[0].transcript + ' ');
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        // Bạn có thể hiển thị interimTranscript nếu muốn
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
      };

      recognitionRef.current = recognition;
    } else {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API');
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
  };

  return (
    <div className="voice-to-text-container">
      <h2>Voice to Text</h2>
      <div className="controls">
        {!isListening ? (
          <button onClick={startListening} className="btn-blue">
            Bắt đầu ghi âm
          </button>
        ) : (
          <button onClick={stopListening} className="btn-red">
            Dừng ghi âm
          </button>
        )}
        <button onClick={handleClear} className="btn-gray">
          Xóa
        </button>
      </div>
      <div className="transcript">
        <h3>Bản văn:</h3>
        <p>{transcript}</p>
      </div>
      {/* Thêm các stylings phù hợp trong CSS */}
    </div>
  );
};

export default VoiceToText;
