// components/VoiceToText.tsx
"use client";
import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import AIFeedback from './AIFeedback';

interface VoiceToTextProps {
  onResult?: (text: string) => void;
}

const VoiceToText: React.FC<VoiceToTextProps> = ({ onResult }) => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleAnalyze = async (blob: Blob) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
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
    <ReactMediaRecorder
      audio
      mediaRecorderOptions={{ mimeType: "audio/wav" }} // Thử đổi thành 'audio/mp4' hoặc 'audio/mpeg' nếu cần
      render={({ 
        status, 
        startRecording, 
        stopRecording, 
        mediaBlobUrl, 
        previewStream, 
        error, 
      }) => (
        <div className="voice-to-text-container">
          <h2>Voice to Text</h2>
          <div className="controls">
            {status !== 'recording' ? (
              <button onClick={startRecording} className="base-button btn-blue">
                Bắt đầu ghi âm
              </button>
            ) : (
              <button onClick={stopRecording} className="base-button btn-red">
                Dừng ghi âm
              </button>
            )}
            <button
              onClick={() => {
                setTranscript('');
              }}
              className="base-button btn-gray"
            >
              Xóa
            </button>
            <button
              onClick={async () => {
                if (mediaBlobUrl) {
                  const res = await fetch(mediaBlobUrl);
                  const blobFromUrl = await res.blob();
                  setRecordedBlob(blobFromUrl);
                  handleAnalyze(blobFromUrl);
                }
              }}
              className="base-button btn-purple"
              disabled={!mediaBlobUrl || loading}
            >
              {loading ? 'Đang phân tích...' : 'Phân Tích'}
            </button>
          </div>
          <div className="transcript">
            <h3>Bản văn:</h3>
            <p>{transcript}</p>
          </div>
          {recordedBlob && <AIFeedback audioBlob={recordedBlob} />}
          {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
        </div>
      )}
    />
  );
};

export default VoiceToText;
