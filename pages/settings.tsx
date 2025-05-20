// pages/settings.tsx
import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal"; // Import Modal
import { shuffleArray } from "../utils/shuffle"; // Import hàm shuffle
import { QAItem, labels } from "../utils/types";


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

  // Hàm để shuffle dữ liệu
  const handleShuffle = (dataset: "civils" | "n400") => {
    if (dataset === "civils") {
      setCivilsData(shuffleArray(civilsData));
    } else {
      setN400Data(shuffleArray(n400Data));
    }
  };

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
    <div className="settings-container">
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

      {/* Thêm Nút Shuffle */}
      <div className="settings-section">
        <h3>{labels[language].shuffle}</h3>
        {selectedDataset == "civils" ? (
          <div className="button-group">
            <Button onClick={() => handleShuffle("civils")} className="btn-purple">
              {labels[language].shuffleCivils}
            </Button>
          </div>
        ) : (
          <div className="button-group">
            <Button onClick={() => handleShuffle("n400")} className="btn-purple">
              {labels[language].shuffleN400}
            </Button>
          </div>
        )}
      </div>

      {/* Danh Sách Các Câu Hỏi và Đáp Án */}
      <div className="settings-section">
        <h3>{labels[language].editData}</h3>
        <div className="button-group">
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
        </div>
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