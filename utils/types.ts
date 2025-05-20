// types.ts
export type QAItem = {
  id: number;
  question: string;
  answer: string;
  vietnamese: string;
};

// Định nghĩa các nhãn dựa trên ngôn ngữ
export const labels = {
    en: {
      selectLanguage: "Select Language",
      english: "English",
      vietnamese: "Vietnamese",
      selectDataset: "Edit Dataset",
      civils: "Civils",
      n400: "N-400",
      editData: "Edit Data",
      addNew: "Add New",
      question: "Question",
      answer: "Answer",
      vietnameseTranslation: "Vietnamese Translation",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      deleteConfirm: "Are you sure you want to delete this item?",
      shuffle:"Shuffle",
      shuffleCivils: "Shuffle Civils",
      shuffleN400: "Shuffle N-400",
    },
    vi: {
      selectLanguage: "Chọn Ngôn Ngữ",
      english: "English",
      vietnamese: "Tiếng Việt",
      selectDataset: "Sửa Dữ Liệu",
      civils: "Civils",
      n400: "N-400",
      editData: "Sửa Dữ Liệu",
      addNew: "Thêm Mới",
      question: "Câu Hỏi",
      answer: "Đáp Án",
      vietnameseTranslation: "Dịch Sang Tiếng Việt",
      save: "Lưu",
      cancel: "Hủy",
      edit: "Chỉnh Sửa",
      delete: "Xóa",
      deleteConfirm: "Bạn có chắc chắn muốn xóa mục này?",
      shuffle:"Xáo Trộn",
      shuffleCivils: "Xáo Trộn Civils",
      shuffleN400: "Xáo Trộn N-400",
    },
  };