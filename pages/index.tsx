// pages/index.tsx
import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Button";
import { shuffleArray } from "../utils/shuffle"; // Hàm shuffle đã định nghĩa trước đó
import { speak } from "../utils/speak"; // Hàm phát âm đã định nghĩa trước đó
// Import các icon từ react-icons/fa
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {QAItem} from "../utils/types";

type HomeProps = {
  language: "en" | "vi";
  civilsData: QAItem[];
  n400Data: QAItem[];
};

const Home: React.FC<HomeProps> = ({ language, civilsData, n400Data }) => {
  const [selectedData, setSelectedData] = useState<"civils" | "n400">("n400");
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentShuffledIndex, setCurrentShuffledIndex] = useState(0);

  const currentData = selectedData === "civils" ? civilsData : n400Data;

  // Hàm khởi tạo danh sách shuffled indices
  const initializeShuffledIndices = useCallback(() => {
    const indices = currentData.map((_, index) => index);
    const shuffled = shuffleArray(indices);
    setShuffledIndices(shuffled);
    setCurrentShuffledIndex(0);
  }, [currentData]);

  // Khởi tạo shuffled indices khi component mount hoặc khi selectedData thay đổi
  useEffect(() => {
    initializeShuffledIndices();
    setShowAnswer(false);
  }, [initializeShuffledIndices]);

  // Lấy mục hiện tại dựa trên shuffledIndices và currentShuffledIndex
  const item = currentData[shuffledIndices[currentShuffledIndex]];

  // Gọi hàm speak khi item thay đổi
  useEffect(() => {
    if (item) {
      speak(item.question, "en-US");
    }
  }, [item]);

  // Hàm xử lý Next
  const handleNext = () => {
    if (currentShuffledIndex + 1 < shuffledIndices.length) {
      setCurrentShuffledIndex(currentShuffledIndex + 1);
    } else {
      // Nếu đã đến cuối danh sách, tái sắp xếp lại
      initializeShuffledIndices();
    }
    setShowAnswer(false);
  };

  // Hàm xử lý Prev
  const handlePrev = () => {
    if (currentShuffledIndex > 0) {
      setCurrentShuffledIndex(currentShuffledIndex - 1);
      setShowAnswer(false);
    }
  };

  // Định nghĩa các nhãn dựa trên ngôn ngữ
  const labels = {
    en: {
      civil_title: "100 Civils Question Trainer",
      n400_title: "US Citizenship N-400 Meaning Trainer",
      speak: "🔊 Speak",
      speakAnswerEn: "🔊 Speak Answer",
      next: "Next",
      prev: "Prev",
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
      next: "Tiếp Theo",
      prev: "Trước",
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
          onChange={(e) => {
            const value = e.target.value as "civils" | "n400";
            setSelectedData(value);
            initializeShuffledIndices(); // Khởi tạo lại shuffledIndices khi thay đổi dataset
          }}
        >
          <option value="civils">{labels[language].civils}</option>
          <option value="n400">{labels[language].n400}</option>
        </select>
      </div>

      {/* Hiển thị câu hỏi và đáp án */}
      <div className="card">
        {item ? (
          <>
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
              {/* Nhóm nút Prev và Next */}
              
                {/* Nút Prev */}
                <Button
                  onClick={handlePrev}
                  className={`btn-purple ${currentShuffledIndex === 0 ? "disabled" : ""}`}
                  disabled={currentShuffledIndex === 0}
                >
                  {/* {labels[language].prev} */}
                  <FaArrowLeft />
                </Button>                

              {/* Nút Show/Hide Answer */}
              <div className="full-width-button">
                <Button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="action-button btn-blue"
                >
                  {showAnswer ? labels[language].hideAnswer : labels[language].showAnswer}
                </Button>
              </div>

              {/* Nút Next */}
                <Button
                  onClick={handleNext}
                  className="btn-purple"
                >
                  {/* {labels[language].next} */}
                  <FaArrowRight />
                </Button>
              
            </div>
          </>
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default Home;