// utils/speak.ts
export function speak(text: string, lang: string = "en-US") {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Trình duyệt của bạn không hỗ trợ Speech Synthesis.");
  }
}