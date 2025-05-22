// components/VoiceToText.tsx
import React, { useState, useEffect, useRef } from 'react';
import AIFeedback from './AIFeedback';

interface VoiceToTextProps {
  onResult?: (text: string) => void;
}

const VoiceToText: React.FC<VoiceToTextProps> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      let options = { mimeType: 'audio/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'audio/mp4' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'audio/mpeg' };
        }
      }
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
        setAudioBlob(blob);
        setAudioChunks([]);
      };
      
      mediaRecorderRef.current = mediaRecorder;
    }).catch(err => {
      console.error('Error accessing microphone', err);
      alert('Không thể truy cập vào microphone của bạn.');
    });
  } else {
    alert('Trình duyệt của bạn không hỗ trợ getUserMedia API');
  }
}, []);

  const startListening = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
    setAudioBlob(null);
  };

  const handleAnalyze = async () => {
    if (!audioBlob) return;

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];

        const response = await fetch('/api/speech-to-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ audioData: base64data }),
        });

        const data = await response.json();

        if (response.ok) {
          setTranscript(data.transcript);
          if (onResult) {
            onResult(data.transcript);
          }
        } else {
          console.error('Error from API:', data.error);
          setTranscript('Lỗi khi xử lý âm thanh.');
        }

        setLoading(false);
      };
    } catch (error) {
      console.error('Error analyzing speech:', error);
      setTranscript('Lỗi khi xử lý âm thanh.');
      setLoading(false);
    }
  };

  return (
    <div className="voice-to-text-container">
      <h2>Voice to Text</h2>
      <div className="controls">
        {!isListening ? (
          <button onClick={startListening} className="base-button btn-blue">
            Bắt đầu ghi âm
          </button>
        ) : (
          <button onClick={stopListening} className="base-button btn-red">
            Dừng ghi âm
          </button>
        )}
        <button onClick={handleClear} className="base-button btn-gray">
          Xóa
        </button>
        <button onClick={handleAnalyze} className="base-button btn-purple" disabled={!audioBlob || loading}>
          {loading ? 'Đang phân tích...' : 'Phân Tích'}
        </button>
      </div>
      <div className="transcript">
        <h3>Bản văn:</h3>
        <p>{transcript}</p>
      </div>
      {audioBlob && <AIFeedback audioBlob={audioBlob} />}
    </div>
  );
};

export default VoiceToText;