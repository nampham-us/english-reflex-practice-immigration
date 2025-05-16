import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
// import "../styles/globals.css"; // Import global CSS

// Import file CSS

type QAItem = {
  question: string;
  answer: string;
  vietnamese: string;
};

const civils_data: QAItem[] = [
  { question: "What is the supreme law of the land?", answer: "The Constitution", vietnamese: "Luật cao nhất nước Mỹ" },
  { question: "What does the Constitution do?", answer: "Sets up the government", vietnamese: "Thiết lập chính phủ" },
  { question: "The idea of self-government is in the first three words of the Constitution. What are these words?", answer: "We the People", vietnamese: "Chúng tôi Nhân dân" },
  { question: "What is an amendment?", answer: "A change to the Constitution", vietnamese: "Sửa đổi Hiến pháp" },
  { question: "What do we call the first ten amendments to the Constitution?", answer: "The Bill of Rights", vietnamese: "Mười tu chính án đầu tiên" },
  { question: "What is one right or freedom from the First Amendment?", answer: "Speech", vietnamese: "Quyền tự do (nói, tôn giáo...)" },
  { question: "How many amendments does the Constitution have?", answer: "27 (twenty-seven)", vietnamese: "27 tu chính án" },
  { question: "What did the Declaration of Independence do?", answer: "Said that the United States is free", vietnamese: "Tuyên bố độc lập" },
  { question: "What are two rights in the Declaration of Independence?", answer: "Life, liberty", vietnamese: "Quyền sống, tự do" },
  { question: "What is freedom of religion?", answer: "you can practice any religion or not practice a religion", vietnamese: "Tự do tôn giáo" },
  { question: "What is the economic system in the United States?", answer: "Market economy", vietnamese: "Kinh tế thị trường" },
  { question: "What is the \"rule of law\"?", answer: "Everyone must follow the law", vietnamese: "Mọi người đều phải theo luật" },
  { question: "Name one branch or part of the government.", answer: "Congress", vietnamese: "Một nhánh chính phủ" },
  { question: "What stops one branch of government from becoming too powerful?", answer: "Checks and Balances", vietnamese: "Kiểm soát và cân bằng quyền lực" },
  { question: "Who is in charge of the executive branch?", answer: "The president", vietnamese: "Tổng thống" },
  { question: "Who makes federal laws?", answer: "Congress", vietnamese: "Quốc hội" },
  { question: "What are the two parts of the U.S. Congress?", answer: "The Senate and House of Representatives", vietnamese: "Thượng viện và Hạ viện" },
  { question: "How many U.S. Senators are there?", answer: "100 (One-hundred)", vietnamese: "100 Thượng nghị sĩ" },
  { question: "We elect a U.S. Senator for how many years?", answer: "6 (Six)", vietnamese: "6 năm" },
  { question: "Who is one of your state's U.S. Senators now?", answer: "Answer will vary", vietnamese: "Tùy tiểu bang" },
  { question: "The House of Representatives has how many voting members?", answer: "435 (Four-hundred thirty-five)", vietnamese: "435 Hạ nghị sĩ" },
  { question: "We elect a U.S. Representative for how many years?", answer: "2 (two)", vietnamese: "2 năm" },
  { question: "Name your U.S. Representative.", answer: "Answer will vary", vietnamese: "Tùy khu vực" },
  { question: "Why do some states have more Representatives than other states?", answer: "Because they have more people", vietnamese: "Vì dân số đông hơn" },
  { question: "What is the name of the President of the United States now?", answer: "Donald Trump", vietnamese: "Tổng thống hiện tại" },
  { question: "What is the name of the Vice President of the United States now?", answer: "J.D Vance", vietnamese: "Phó tổng thống hiện tại" },
  { question: "If the President can no longer serve, who becomes President?", answer: "The vice president", vietnamese: "Phó tổng thống lên thay" },
  { question: "If both the President and the Vice President can no longer serve, who becomes President?", answer: "The Speaker of the House", vietnamese: "Chủ tịch Hạ viện lên thay" },
  { question: "Who is the Commander in Chief of the military?", answer: "The president", vietnamese: "Tổng thống" },
  { question: "Who signs bills to become laws?", answer: "The president", vietnamese: "Tổng thống ký thành luật" },
  { question: "Who vetoes bills?", answer: "The president", vietnamese: "Tổng thống phủ quyết" },
  { question: "What does the President's Cabinet do?", answer: "Advices the president", vietnamese: "Cố vấn cho tổng thống" },
  { question: "What are two Cabinet-level positions?", answer: "Secretary of Labor, Secretary of State", vietnamese: "Bộ trưởng Lao động, Ngoại giao" },
  { question: "What does the judicial branch do?", answer: "Reviews Laws", vietnamese: "Xem xét luật" },
  { question: "What is the highest court in the United States?", answer: "The Supreme Court", vietnamese: "Tòa án tối cao" },
  { question: "How many justices are on the Supreme Court?", answer: "9 (nine)", vietnamese: "9 thẩm phán" },
  { question: "Who is the Chief Justice of the United States now?", answer: "John Roberts", vietnamese: "Chánh án hiện tại" },
  { question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", answer: "To print money", vietnamese: "In tiền" },
  { question: "Under our Constitution, some powers belong to the states. What is one power of the states?", answer: "Provide schooling and education", vietnamese: "Quản lý giáo dục" },
  { question: "Who is the Governor of your state now?", answer: "Answers will vary", vietnamese: "Thống đốc tiểu bang" },
  { question: "What is the capital of your state?", answer: "Answers will vary", vietnamese: "Thủ phủ tiểu bang" },
  { question: "What are the two major political parties in the United States?", answer: "Democratic and Republican", vietnamese: "Dân chủ và Cộng hòa" },
  { question: "What is the political party of the President now?", answer: "Republican", vietnamese: "Đảng của tổng thống" },
  { question: "What is the name of the Speaker of the House of Representatives now?", answer: "Mike johnson", vietnamese: "Chủ tịch Hạ viện hiện tại" },
  { question: "There are four amendments to the Constitution about who can vote. Describe one of them.", answer: "Citizens eighteen (18) and older (can vote)", vietnamese: "Công dân 18 tuổi được bầu cử" },
  { question: "What is one responsibility that is only for United States citizens?", answer: "Vote in a federal election", vietnamese: "Bầu cử liên bang" },
  { question: "Name one right only for United States citizens.", answer: "Vote in a federal election", vietnamese: "Chỉ công dân Mỹ được bầu cử" },
  { question: "What are two rights of everyone living in the United States?", answer: "Freedom of speech, freedom of religion", vietnamese: "Tự do ngôn luận, tôn giáo" },
  { question: "What do we show loyalty to when we say the Pledge of Allegiance?", answer: "the United States", vietnamese: "Trung thành nước Mỹ" },
  { question: "What is one promise you make when you become a United States citizen?", answer: "be loyal to the United States", vietnamese: "Hứa trung thành với Mỹ" },
  { question: "How old do citizens have to be to vote for President?", answer: "eighteen (18) and older", vietnamese: "18 tuổi trở lên" },
  { question: "What are two ways that Americans can participate in their democracy?", answer: "Vote, run for office", vietnamese: "Bầu cử, ứng cử" },
  { question: "When is the last day you can send in federal income tax forms?", answer: "April 15", vietnamese: "Ngày 15 tháng 4" },
  { question: "When must all men register for the Selective Service?", answer: "at age eighteen (18)", vietnamese: "18 tuổi phải ghi danh quân dịch" },
  { question: "What is one reason colonists came to America?", answer: "freedom", vietnamese: "Tự do" },
  { question: "Who lived in America before the Europeans arrived?", answer: "American Indians", vietnamese: "Người da đỏ" },
  { question: "What group of people was taken to America and sold as slaves?", answer: "Africans", vietnamese: "Người châu Phi" },
  { question: "Why did the colonists fight the British?", answer: "because of high taxes (taxation without representation)", vietnamese: "Thuế cao, không đại diện" },
  { question: "Who wrote the Declaration of Independence?", answer: "(Thomas) Jefferson", vietnamese: "Thomas Jefferson" },
  { question: "When was the Declaration of Independence adopted?", answer: "July 4, 1776", vietnamese: "4 tháng 7, 1776" },
  { question: "There were 13 original states. Name three.", answer: "New Hampshire, New York, New Jersey", vietnamese: "Kể tên 3 bang đầu tiên" },
  { question: "What happened at the Constitutional Convention?", answer: "The Constitution was written", vietnamese: "Viết Hiến pháp" },
  { question: "When was the Constitution written?", answer: "1787", vietnamese: "Năm 1787" },
  { question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", answer: "(John) Jay", vietnamese: "Tên một tác giả Federalist Papers" },
  { question: "What is one thing Benjamin Franklin is famous for?", answer: "U.S. diplomat", vietnamese: "Nhà ngoại giao Mỹ" },
  { question: "Who is the \"Father of Our Country\"?", answer: "(George) Washington", vietnamese: "George Washington" },
  { question: "Who was the first President?*", answer: "(George) Washington", vietnamese: "George Washington" },
  { question: "What territory did the United States buy from France in 1803?", answer: "the Louisiana Territory", vietnamese: "Lãnh thổ Louisiana" },
  { question: "Name one war fought by the United States in the 1800s.", answer: "Civil War", vietnamese: "Nội chiến" },
  { question: "Name the U.S. war between the North and the South.", answer: "the Civil War", vietnamese: "Nội chiến Mỹ" },
  { question: "Name one problem that led to the Civil War.", answer: "slavery", vietnamese: "Chế độ nô lệ" },
  { question: "What was one important thing that Abraham Lincoln did?", answer: "freed the slaves", vietnamese: "Giải phóng nô lệ" },
  { question: "What did the Emancipation Proclamation do?", answer: "freed the slaves", vietnamese: "Giải phóng nô lệ" },
  { question: "What did Susan B. Anthony do?", answer: "fought for civil rights", vietnamese: "Đấu tranh quyền phụ nữ" },
  { question: "Name one war fought by the United States in the 1900s.", answer: "World War II", vietnamese: "Chiến tranh thế giới II" },
  { question: "Who was President during World War I?", answer: "(Woodrow) Wilson", vietnamese: "Woodrow Wilson" },
  { question: "Who was President during the Great Depression and World War II?", answer: "(Franklin) Roosevelt", vietnamese: "Franklin Roosevelt" },
  { question: "Who did the United States fight in World War II?", answer: "Japan, Germany, and Italy", vietnamese: "Nhật, Đức, Ý" },
  { question: "Before he was President, Eisenhower was a general. What war was he in?", answer: "World War II", vietnamese: "Chiến tranh thế giới II" },
  { question: "During the Cold War, what was the main concern of the United States?", answer: "Communism", vietnamese: "Chủ nghĩa cộng sản" },
  { question: "What movement tried to end racial discrimination?", answer: "civil rights (movement)", vietnamese: "Phong trào dân quyền" },
  { question: "What did Martin Luther King, Jr. do?", answer: "fought for civil rights", vietnamese: "Đấu tranh dân quyền" },
  { question: "What major event happened on September 11, 2001, in the United States?", answer: "Terrorists attacked the United States", vietnamese: "Khủng bố 11/9" },
  { question: "Name one American Indian tribe in the United States.", answer: "Cherokee", vietnamese: "Tên một bộ tộc da đỏ" },
  { question: "Name one of the two longest rivers in the United States.", answer: "Mississippi (River)", vietnamese: "Sông Mississippi hoặc Missouri" },
  { question: "What ocean is on the West Coast of the United States?", answer: "Pacific (Ocean)", vietnamese: "Thái Bình Dương" },
  { question: "What ocean is on the East Coast of the United States?", answer: "Atlantic (Ocean)", vietnamese: "Đại Tây Dương" },
  { question: "Name one U.S. territory.", answer: "Guam", vietnamese: "Tên một lãnh thổ Mỹ" },
  { question: "Name one state that borders Canada.", answer: "New York", vietnamese: "Tên bang giáp Canada" },
  { question: "Name one state that borders Mexico.", answer: "New Mexico", vietnamese: "Tên bang giáp Mexico" },
  { question: "What is the capital of the United States?", answer: "Washington, D.C", vietnamese: "Washington, D.C." },
  { question: "Where is the Statue of Liberty?", answer: "New York (Harbor)", vietnamese: "New York" },
  { question: "Why does the flag have 13 stripes?", answer: "because there were 13 original colonies", vietnamese: "13 thuộc địa đầu tiên" },
  { question: "Why does the flag have 50 stars?", answer: "because there are 50 states", vietnamese: "50 tiểu bang" },
  { question: "What is the name of the national anthem?", answer: "The Star-Spangled Banner", vietnamese: "Quốc ca Mỹ" },
  { question: "When do we celebrate Independence Day?", answer: "July 4", vietnamese: "Ngày 4 tháng 7" },
  { question: "Name two national U.S. holidays.", answer: "Labor Day, Christmas", vietnamese: "Kể tên 2 ngày lễ Mỹ" },
  { question: "When do we celebrate Thanksgiving?", answer: "on the fourth Thursday of November", vietnamese: "Thứ năm cuối tháng 11" }
];



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