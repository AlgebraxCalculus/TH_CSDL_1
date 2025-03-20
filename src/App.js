import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import NsxPage from "./pages/NsxPage";
import SPPage from "./pages/SPPage";
import PCPage from "./pages/PCPage";
import LapTopPage from "./pages/LapTopPage";
import ThongKeSPTheoLoai from "./pages/ThongKeSPTheoLoai";
import ThongKeNSXTheoDC from "./pages/ThongKeNSXTheoDC";
import Top5SPPage from "./pages/Top5SPPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/nsx" element={<NsxPage />} />
        <Route path="/sanpham" element={<SPPage />} />
        <Route path="/pc" element={<PCPage />} />
        <Route path="/laptop" element={<LapTopPage />} />

        {/* Không có trang ThongKeSPPage, các route con được đưa lên trực tiếp */}
        <Route path="/sp/thongke" element={<ThongKeSPTheoLoai />} />
        <Route path="/nsx/thongke" element={<ThongKeNSXTheoDC />} />
        <Route path="/top-5/thongke" element={<Top5SPPage />} />
      </Routes>
    </Router>
  );
}

export default App;
