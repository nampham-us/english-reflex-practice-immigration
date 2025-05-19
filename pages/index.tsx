// pages/index.tsx
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

type QAItem = {
  id: number;
  question: string;
  answer: string;
  vietnamese: string;
};

type HomeProps = {
  language: "en" | "vi";
  civilsData: QAItem[];
  n400Data: QAItem[];
};

const Home: React.FC<HomeProps> = ({ language, civilsData, n400Data }) => {
  const [selectedData, setSelectedData] = useState<"civils" | "n400">("n400");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentData = selectedData === "civils" ? civilsData : n400Data;
  const item = currentData[index];

  useEffect(() => {
    speak(item.question, "en-US");
  }, [index, currentData]);

  const nextRandom = () => {
    const next = Math.floor(Math.random() * currentData.length);
    setIndex(next);
    setShowAnswer(false);
  };

  const speak = (text: string, lang: string) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    } else {
      alert(language === "en" ? "Sorry, your browser does not support speech synthesis." : "Xin lỗi, trình duyệt của bạn không hỗ trợ phát âm.");
    }
  };

  // Định nghĩa các nhãn dựa trên ngôn ngữ
  const labels = {
    en: {
      civil_title: "100 Civils Question Trainer",
      n400_title: "US Citizenship N-400 Meaning Trainer",
      speak: "🔊 Speak",
      speakAnswerEn: "🔊 Speak Answer",
      nextRandom: "🔁 Random",
      showAnswer: "Show Answer",
      hideAnswer: "Hide Answer",
      selectDataset: "Select Dataset",
      civils: "Civils",
      n400: "N-400"
    },
    vi: {
      civil_title: "Học 100 câu hỏi Quốc tịch Mỹ",
      n400_title: "Học Ý Nghĩa Từ Vựng US Citizenship N-400",
      speak: "🔊 Phát âm",
      speakAnswerEn: "🔊 Phát âm Đáp Án",      
      nextRandom: "🔁 Ngẫu nhiên",
      showAnswer: "Hiện đáp án",
      hideAnswer: "Ẩn đáp án",
      selectDataset: "Chọn Bộ Dữ Liệu",
      civils: "Civils",
      n400: "N-400"
    }
  };

  return (
    <div className="container"> {/* Sử dụng lớp container từ globals.css */}
      <h1 className="title">
        {selectedData === "civils" ? labels[language].civil_title : labels[language].n400_title}
      </h1>

      {/* Lựa chọn bộ dữ liệu */}
      <div className="data-selection" style={{ marginBottom: "20px" }}>
        <label htmlFor="dataset-select" className="sr-only">{labels[language].selectDataset}</label>
        <select
          id="dataset-select"
          value={selectedData}
          onChange={(e) => { setSelectedData(e.target.value as "civils" | "n400"); setIndex(0); setShowAnswer(false); }}
        >
          <option value="civils">{labels[language].civils}</option>
          <option value="n400">{labels[language].n400}</option>
        </select>
      </div>

      {/* Hiển thị câu hỏi và đáp án */}
      <div className="card">
        <div className="question-container">
          <Button
            onClick={() => speak(item.question, "en-US")}
            className="speak-button"
          >
            {labels[language].speak}
          </Button>
          <span>{item.question}</span>
        </div>

        {showAnswer && (
          <div className="answer-container">
            <div className="speak-answer-container">
              <Button
                onClick={() => speak(item.answer, "en-US")}
                className="speak-answer-button"
              >
                {labels[language].speakAnswerEn}
              </Button>
            </div>
            <div>
              <strong>✅ </strong> {item.answer}
            </div>
            <div className="vietnamese-container">
              {item.vietnamese}
            </div>
          </div>
        )}

        <div className="buttons-container">
          <Button onClick={nextRandom} className="action-button btn-purple">
            {labels[language].nextRandom}
          </Button>
          <Button onClick={() => setShowAnswer(!showAnswer)} className="action-button btn-blue">
            {showAnswer ? labels[language].hideAnswer : labels[language].showAnswer}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;