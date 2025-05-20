// pages/_app.tsx
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import BottomNav from "../components/BottomNav";
import "../styles/globals.css";
import { QAItem as QAItemCivils } from "../utils/types";
import { QAItem as QAItemN400 } from "../utils/types";
import { defaultCivilsData } from "../data/civilsData";
import { defaultN400Data } from "../data/n400Data";

function MyApp({ Component, pageProps }: AppProps) {
  // State quản lý ngôn ngữ
  const [language, setLanguage] = useState<"en" | "vi">("en");

  // Utility functions to interact with localStorage
  const loadData = <T,>(key: string, initialData: T[]) => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : initialData;
    }
    return initialData;
  };

  const saveData = <T,>(key: string, data: T[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const [civilsData, setCivilsData] = useState<QAItemCivils[]>(() =>
    loadData<QAItemCivils>("civils_data", defaultCivilsData)
  );

  const [n400Data, setN400Data] = useState<QAItemN400[]>(() =>
    loadData<QAItemN400>("n400_data", defaultN400Data)
  );

  // Lưu dữ liệu vào localStorage khi có sự thay đổi
  useEffect(() => {
    saveData("civils_data", civilsData);
  }, [civilsData]);

  useEffect(() => {
    saveData("n400_data", n400Data);
  }, [n400Data]);

  return (
    <>
      <Component
        {...pageProps}
        language={language}
        setLanguage={setLanguage}
        civilsData={civilsData}
        setCivilsData={setCivilsData}
        n400Data={n400Data}
        setN400Data={setN400Data}
      />
      <BottomNav />
    </>
  );
}

export default MyApp;