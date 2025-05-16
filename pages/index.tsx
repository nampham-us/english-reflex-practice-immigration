import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
// import "../styles/globals.css"; // Import global CSS

// Import file CSS

type QAItem = {
  question: string;
  answer: string;
  vietnamese: string;
};

const n400_data: QAItem[] = [
  { question: "What does 'claim to be a US citizen' mean?", answer: "To state you are a US citizen", vietnamese: "Khai là công dân Mỹ" },
  { question: "What does 'vote' mean?", answer: "To elect new leaders", vietnamese: "Bầu cử" },
  { question: "What does 'owe taxes' mean?", answer: "To owe the government money", vietnamese: "Nợ thuế" },
  { question: "What does 'overdue' mean?", answer: "Past a dead line", vietnamese: "Quá hạn" },
  { question: "What is the 'Communist Party'?", answer: "Like China, North Korea", vietnamese: "Đảng cộng sản" },
  { question: "What is a 'non-resident alien'?", answer: "A person who has not passed the green card test", vietnamese: "Không có thẻ xanh" },
  { question: "What is a 'totalitarian party'?", answer: "The government controls everything and people have no power", vietnamese: "Đảng độc tài" },
  { question: "What does 'overthrow' mean?", answer: "To remove a government from power", vietnamese: "Lật đổ chính phủ" },
  { question: "What does 'assassination' mean?", answer: "An action of killing someone", vietnamese: "Ám sát" },
  { question: "What does 'kidnap' mean?", answer: "To take someone away illegally", vietnamese: "Bắt cóc" },
  { question: "What does 'hijack' mean?", answer: "To stop and steal a moving airplane", vietnamese: "Cướp phương tiện" },
  { question: "What does 'incite' mean?", answer: "To encourage", vietnamese: "Kích động" },
  { question: "What does 'genocide' mean?", answer: "To kill a whole race", vietnamese: "Diệt chủng" },
  { question: "What does 'torture' mean?", answer: "To hurt someone physically", vietnamese: "Tra tấn" },
  { question: "What is 'national origin'?", answer: "Where a person is from", vietnamese: "Nguồn gốc quốc gia" },
  { question: "What is a 'police unit'?", answer: "A group that protects a community", vietnamese: "Đơn vị cảnh sát" },
  { question: "What is a 'military unit'?", answer: "A group that works for the government", vietnamese: "Đơn vị quân đội" },
  { question: "What is a 'vigilante unit'?", answer: "A group acts like the police, but are not the police", vietnamese: "Nhóm tự xử" },
  { question: "What is a 'paramilitary unit'?", answer: "Like a military group, but it is not official", vietnamese: "Nhóm bán quân sự" },
  { question: "What is a 'rebel group'?", answer: "A group that fights a government", vietnamese: "Nhóm nổi dậy" },
  { question: "What is a 'self-defense unit'?", answer: "A group that protects a place", vietnamese: "Nhóm tự vệ" },
  { question: "What is a 'guerrilla group'?", answer: "A group that uses weapons to attack the government", vietnamese: "Nhóm du kích" },
  { question: "What is 'prison'?", answer: "A place where prisoners are kept", vietnamese: "Nhà tù" },
  { question: "What does 'detained' mean?", answer: "Held in custody by police", vietnamese: "Bị tạm giữ" },
  { question: "What is 'jail'?", answer: "A place where prisoners are kept", vietnamese: "Nhà tù" },
  { question: "What is a 'detention facility'?", answer: "A place where people are forced to stay", vietnamese: "Nơi giam giữ" },
  { question: "What is a 'prison camp'?", answer: "A place to keep enemy soldiers", vietnamese: "Trại tù binh" },
  { question: "What is a 'labor camp'?", answer: "A place to force people to work", vietnamese: "Trại lao động cưỡng bức" },
  { question: "What does 'threaten' mean?", answer: "Warn to hurt someone", vietnamese: "Đe dọa" },
  { question: "What is 'weapons training'?", answer: "To learn how to use a gun", vietnamese: "Học dùng vũ khí" },
  { question: "What is a 'weapon'?", answer: "Like a knife or gun", vietnamese: "Vũ khí" },
  { question: "What is 'paramilitary training'?", answer: "Learning to fight in combat", vietnamese: "Huấn luyện bán quân sự" },
  { question: "What is 'military type training'?", answer: "Learning to fight in combat", vietnamese: "Huấn luyện kiểu quân đội" },
  { question: "What does 'conscript' mean?", answer: "To require someone to join the army", vietnamese: "Bắt đi lính" },
  { question: "What does 'enlist' mean?", answer: "To sign up, in the armed forces", vietnamese: "Tự nguyện nhập ngũ" },
  { question: "What does 'recruit' mean?", answer: "To ask", vietnamese: "Tuyển mộ" },
  { question: "What does 'hostilities' mean?", answer: "Fighting in the war", vietnamese: "Chiến sự" },
  { question: "What does 'crime' mean?", answer: "An action that breaks the law", vietnamese: "Tội phạm" },
  { question: "What does 'arrested' mean?", answer: "Handcuffed by the police", vietnamese: "Bị bắt" },
  { question: "What does 'commit a crime' mean?", answer: "To do something that breaks the law", vietnamese: "Phạm tội" },
  { question: "What does 'offense' mean?", answer: "A minor crime", vietnamese: "Lỗi nhẹ" },
  { question: "What does 'cited' mean?", answer: "Given a ticket by police", vietnamese: "Bị phạt" },
  { question: "What does 'charged' mean?", answer: "Police tell you that you did something illegal", vietnamese: "Bị buộc tội" },
  { question: "What does 'confined' mean?", answer: "To be kept in a place", vietnamese: "Bị giam giữ" },
  { question: "What is a 'suspended sentence'?", answer: "Delaying of a sentence", vietnamese: "Hoãn thi hành án" },
  { question: "What does 'parole' mean?", answer: "1. The early release from prison\n2. The early release of a prisoner", vietnamese: "Thả tù trước hạn" },
  { question: "What does 'probation' mean?", answer: "1. Supervised instead of jail time\n2. You report to an officer regularly instead of jail time", vietnamese: "Quản chế" },
  { question: "What does 'prostitute' mean?", answer: "Someone who has sex for money", vietnamese: "Gái mại dâm" },
  { question: "What does 'manufacture' mean?", answer: "To make something", vietnamese: "Sản xuất" },
  { question: "What does 'procure' mean?", answer: "To find someone for sex", vietnamese: "Môi giới mại dâm" },
  { question: "What does 'produce' mean?", answer: "To make something", vietnamese: "Sản xuất" },
  { question: "What does 'dispense' mean?", answer: "To supply something", vietnamese: "Phân phát" },
  { question: "What does 'cultivate' mean?", answer: "To grow plants", vietnamese: "Trồng trọt" },
  { question: "What does 'distribute' mean?", answer: "To supply something", vietnamese: "Phân phối" },
  { question: "What are 'illegal drugs or narcotics'?", answer: "Like heroin or cocain", vietnamese: "Ma túy bất hợp pháp" },
  { question: "What does 'smuggle' mean?", answer: "Take things to a country illegally", vietnamese: "Buôn lậu" },
  { question: "What is 'drug paraphernalia'?", answer: "Equipment to make illegal drugs", vietnamese: "Dụng cụ ma túy" },
  { question: "What are 'controlled substances'?", answer: "1. Regulated drugs\n2. You can buy it with a prescription but with restrictions", vietnamese: "Thuốc kiểm soát" },
  { question: "What is an 'immigration benefit'?", answer: "Things like visa, green card or citizenship.", vietnamese: "Lợi ích nhập cư" },
  { question: "What is a 'dependent'?", answer: "Someone who relies on another person", vietnamese: "Người phụ thuộc" },
  { question: "What does 'gamble' mean?", answer: "To play a game for money", vietnamese: "Đánh bạc" },
  { question: "What is 'misrepresentation'?", answer: "To lie or give wrong information", vietnamese: "Khai gian" },
  { question: "What does 'pay alimony' mean?", answer: "Pay money to an ex-spouse after a divorce", vietnamese: "Trả cấp dưỡng" },
  { question: "What is a 'public benefit'?", answer: "Welfare, like food stamps", vietnamese: "Phúc lợi xã hội" },
  { question: "What does 'fraudulent' mean?", answer: "To claim something that is not true", vietnamese: "Gian lận" },
  { question: "What does 'lie' mean?", answer: "To say something that is not true", vietnamese: "Nói dối" },
  { question: "What does 'misleading' mean?", answer: "Giving the wrong idea", vietnamese: "Gây hiểu nhầm" },
  { question: "What is 'admission into the US'?", answer: "A right to enter the United States", vietnamese: "Được vào Mỹ" },
  { question: "What are 'deportation proceedings'?", answer: "A Process of removing a person", vietnamese: "Thủ tục trục xuất" },
  { question: "What is 'rescission'?", answer: "To take back a decision", vietnamese: "Thu hồi" },
  { question: "What is 'Selective Service'?", answer: "Services in armed forces under law", vietnamese: "Nghĩa vụ quân sự" },
  { question: "What does 'deport' mean?", answer: "To force a person to leave a country", vietnamese: "Trục xuất" },
  { question: "What does 'drafted' mean?", answer: "Being selected as a soldier", vietnamese: "Bị gọi nhập ngũ" },
  { question: "What are the 'US Armed Forces'?", answer: "US military navy air force", vietnamese: "Quân đội Mỹ" },
  { question: "What does 'avoid being drafted' mean?", answer: "To prevent being selected as a soldier", vietnamese: "Tránh đi lính" },
  { question: "What is 'order of nobility'?", answer: "Like King or Queen", vietnamese: "Tước hiệu quý tộc" },
  { question: "What is a 'hereditary title'?", answer: "A royal title, like Prince or Princess", vietnamese: "Tước hiệu truyền đời" },
  { question: "What is the 'Constitution'?", answer: "It is the supreme law of the land", vietnamese: "Hiến pháp" },
  { question: "What is the 'oath of allegiance'?", answer: "A promise to be loyal to the United States", vietnamese: "Lời thề trung thành" },
  { question: "What is the 'form of government' of the US?", answer: "Republic", vietnamese: "Chính quyền cộng hòa" },
  { question: "What are 'non-combatant services'?", answer: "Services that do not involve combat", vietnamese: "Dịch vụ không chiến đấu" },
  { question: "What is a 'civilian'?", answer: "A person who is not in the military", vietnamese: "Dân thường" },
  { question: "What is 'work of national importance'?", answer: "Tasks that are important to a nation", vietnamese: "Công việc cho quốc gia" },
  { question: "What is 'civilian direction'?", answer: "A direction from a person who is not in the military", vietnamese: "Chỉ đạo của dân thường" }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [language, setLanguage] = useState<"en" | "vi">("en");

  useEffect(() => {
    speak(n400_data[index].question, "en-US");
  }, [index]);

  const nextRandom = () => {
    const next = Math.floor(Math.random() * n400_data.length);
    setIndex(next);
    setShowAnswer(false);
  };

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  };

  const item: QAItem = n400_data[index];

  // Định nghĩa các nhãn giao diện dựa trên ngôn ngữ
  const labels = {
    en: {
      title: "US Citizenship N-400 Meaning Trainer",
      speak: "🔊 Speak",
      speakAnswerEn: "🔊 Speak Answer",
      // speakAnswerVi: "🔊 Speak Answer (VI)",
      nextRandom: "🔁 Random",
      showAnswer: "Show Answer",
      hideAnswer: "Hide Answer",
      selectLanguage: "Select Language",
      english: "English",
      vietnamese: "Tiếng Việt"
    },
    vi: {
      title: "Học Ý Nghĩa Từ Vựng US Citizenship N-400",
      speak: "🔊 Phát âm",
      speakAnswerEn: "🔊 Phát âm Đáp Án",
      // speakAnswerVi: "🔊 Phát âm Đáp Án (VI)",
      nextRandom: "🔁 Ngẫu nhiên",
      showAnswer: "Hiện đáp án",
      hideAnswer: "Ẩn đáp án",
      selectLanguage: "Chọn Ngôn Ngữ",
      english: "English",
      vietnamese: "Tiếng Việt"
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        {labels[language].title}
      </h1>

      {/* Lựa chọn ngôn ngữ */}
      <div className="language-selection" style={{ marginBottom: "20px" }}>
        <span style={{ marginRight: "10px" }}>{labels[language].selectLanguage}:</span>
        <Button
          className={`action-button ${language === "en" ? "btn-active" : "btn-inactive"}`}
          onClick={() => setLanguage("en")}
        >
          {labels[language].english}
        </Button>
        <Button
          className={`action-button ${language === "vi" ? "btn-active" : "btn-inactive"}`}
          onClick={() => setLanguage("vi")}
        >
          {labels[language].vietnamese}
        </Button>
      </div>

      <div className="card">
        <div className="question-container">
          <Button
            className="speak-button"
            onClick={() => speak(item.question, "en-US")}
          >
            {labels[language].speak}
          </Button>
          <span>{item.question}</span>
        </div>

        {showAnswer && (
          <>
            <div className="answer-container">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Button
                  className="speak-answer-button"
                  onClick={() => speak(item.answer, "en-US")}
                  style={{ marginRight: "10px" }}
                >
                  {labels[language].speakAnswerEn}
                </Button>
                {/* <Button
                  className="speak-answer-button"
                  onClick={() => speak(item.vietnamese, "vi-VN")}
                >
                  {labels[language].speakAnswerVi}
                </Button> */}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>✅ </strong> {item.answer}
              </div>
              <div style={{fontSize: "16px", color: "#888", marginTop: "10px"}}>
                {item.vietnamese}
              </div>
            </div>
          </>
        )}

        <div className="buttons-container">
          <Button
            className="action-button btn-purple"
            onClick={nextRandom}
          >
            {labels[language].nextRandom}
          </Button>
          <Button
            className="action-button btn-blue"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? labels[language].hideAnswer : labels[language].showAnswer}
          </Button>
        </div>
      </div>
    </div>
  );
}