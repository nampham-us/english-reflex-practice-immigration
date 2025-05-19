// pages/settings.tsx
import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal"; // Import Modal

type QAItem = {
  id: number;
  question: string;
  answer: string;
  vietnamese: string;
};

type SettingsProps = {
  language: "en" | "vi";
  setLanguage: (lang: "en" | "vi") => void;
  civilsData: QAItem[];
  setCivilsData: React.Dispatch<React.SetStateAction<QAItem[]>>;
  n400Data: QAItem[];
  setN400Data: React.Dispatch<React.SetStateAction<QAItem[]>>;
};

const Settings: React.FC<SettingsProps> = ({
  language,
  setLanguage,
  civilsData,
  setCivilsData,
  n400Data,
  setN400Data,
}) => {
  // Định nghĩa các nhãn dựa trên ngôn ngữ
  const labels = {
    en: {
      selectLanguage: "Select Language",
      english: "English",
      vietnamese: "Vietnamese",
      selectDataset: "Select Dataset for Editing",
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
    },
    vi: {
      selectLanguage: "Chọn Ngôn Ngữ",
      english: "English",
      vietnamese: "Tiếng Việt",
      selectDataset: "Chọn Bộ Dữ Liệu Để Chỉnh Sửa",
      civils: "Civils",
      n400: "N-400",
      editData: "Chỉnh Sửa Dữ Liệu",
      addNew: "Thêm Mới",
      question: "Câu Hỏi",
      answer: "Đáp Án",
      vietnameseTranslation: "Dịch Sang Tiếng Việt",
      save: "Lưu",
      cancel: "Hủy",
      edit: "Chỉnh Sửa",
      delete: "Xóa",
      deleteConfirm: "Bạn có chắc chắn muốn xóa mục này?",
    },
  };

  // State để chọn bộ dữ liệu cần chỉnh sửa
  const [selectedDataset, setSelectedDataset] = useState<"civils" | "n400">("civils");

  // State để quản lý thêm mới và chỉnh sửa
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<QAItem | null>(null);
  const [formData, setFormData] = useState<QAItem>({
    id: Date.now(),
    question: "",
    answer: "",
    vietnamese: "",
  });

  const data = selectedDataset === "civils" ? civilsData : n400Data;
  const setData = selectedDataset === "civils" ? setCivilsData : setN400Data;

  const handleSave = () => {
    if (isAdding) {
      setData([...data, { ...formData, id: Date.now() }]);
    } else if (isEditing && currentEditItem) {
      const updatedData = data.map((item) =>
        item.id === currentEditItem.id ? { ...formData, id: currentEditItem.id } : item
      );
      setData(updatedData);
    }
    setFormData({ id: Date.now(), question: "", answer: "", vietnamese: "" });
    setIsAdding(false);
    setIsEditing(false);
    setCurrentEditItem(null);
  };

  const handleEdit = (item: QAItem) => {
    // console.log("Editing item:", item); // Debug log
    setIsEditing(true);
    setCurrentEditItem(item);
    setFormData(item);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(labels[language].deleteConfirm);
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentEditItem(null);
    setFormData({ id: Date.now(), question: "", answer: "", vietnamese: "" });
  };

  return (
    <div className="settings-container"> {/* Sử dụng lớp container đã định nghĩa */}
      {/* Chọn Ngôn Ngữ */}
      <div className="settings-section">
        <h2>{labels[language].selectLanguage}</h2>
        <div className="button-group">
          <Button
            onClick={() => setLanguage("en")}
            className={`btn-blue ${language === "en" ? "btn-active" : "btn-inactive"}`}
          >
            {labels[language].english}
          </Button>
          <Button
            onClick={() => setLanguage("vi")}
            className={`btn-blue ${language === "vi" ? "btn-active" : "btn-inactive"}`}
          >
            {labels[language].vietnamese}
          </Button>
        </div>
      </div>

      {/* Chọn Bộ Dữ Liệu Để Chỉnh Sửa */}
      <div className="settings-section">
        <h2>{labels[language].selectDataset}</h2>
        <div className="data-selection">
          <select
            value={selectedDataset}
            onChange={(e) => {
              const value = e.target.value as "civils" | "n400";
              setSelectedDataset(value);
              closeModal(); // Đóng modal khi thay đổi dataset
            }}
          >
            <option value="civils">{labels[language].civils}</option>
            <option value="n400">{labels[language].n400}</option>
          </select>
        </div>
      </div>

      {/* Danh Sách Các Câu Hỏi và Đáp Án */}
      <div className="settings-section">
        <h3>{labels[language].editData}</h3>
        <Button
          onClick={() => {
            setIsAdding(true);
            setFormData({ id: Date.now(), question: "", answer: "", vietnamese: "" });
            setIsEditing(false);
            setCurrentEditItem(null);
          }}
          className="btn-purple"
        >
          {labels[language].addNew}
        </Button>
        <ul className="qa-list">
          {data.map((qa) => (
            <li key={qa.id}>
              <div className="qa-item">
                <div className="qa-item-content">
                  <strong>{qa.question}</strong>
                  <p>{qa.answer}</p>
                </div>
                <div className="action-buttons">
                  <Button onClick={() => handleEdit(qa)} className="edit-button">
                    {labels[language].edit}
                  </Button>
                  <Button onClick={() => handleDelete(qa.id)} className="delete-button">
                    {labels[language].delete}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Cho Thêm Mới hoặc Chỉnh Sửa */}
      <Modal isVisible={isAdding || isEditing} onClose={closeModal}>
        <div className="form-container">
          <h3>{isAdding ? labels[language].addNew : labels[language].editData}</h3>
          <div className="form-group">
            <label>{labels[language].question}:</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>{labels[language].answer}:</label>
            <input
              type="text"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>{labels[language].vietnameseTranslation}:</label>
            <input
              type="text"
              value={formData.vietnamese}
              onChange={(e) => setFormData({ ...formData, vietnamese: e.target.value })}
            />
          </div>
          <div className="button-group">
            <Button onClick={handleSave} className="btn-blue">
              {labels[language].save}
            </Button>
            <Button onClick={closeModal} className="btn-red">
              {labels[language].cancel}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;