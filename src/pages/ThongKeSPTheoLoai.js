import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Container, Table } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ========================== Đăng ký biểu đồ với Chart.js ==========================
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ThongKeSPTheoLoai() {
  const [thongKeData, setThongKeData] = useState([]);

  // ========================== Gọi API để lấy dữ liệu thống kê sản phẩm ==========================
  useEffect(() => {
    fetchThongKe();
  }, []);

  const fetchThongKe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sp/thongke");
      console.log("Dữ liệu API trả về:", response.data); // Debug API
      setThongKeData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    }
  };

  // ========================== Chuẩn bị dữ liệu cho biểu đồ ==========================
  const chartData = {
    labels: thongKeData.map((item) => item.Loai), // Nhãn (các loại sản phẩm)
    datasets: [
      {
        label: "Số lượng sản phẩm",
        data: thongKeData.map((item) => item.SoLuong), // Số lượng sản phẩm tương ứng
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      {/* ========================== Tiêu đề trang thống kê ========================== */}
      <h2 className="my-4">Thống Kê Sản Phẩm</h2>

      {/* ========================== Biểu đồ thống kê sản phẩm ========================== */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Bar data={chartData} />
      </div>

      {/* ========================== Bảng thống kê số lượng sản phẩm theo loại ========================== */}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark text-center">
          <tr>
            <th>Loại Sản Phẩm</th>
            <th>Số Lượng</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {thongKeData.map((item, index) => (
            <tr key={index}>
              <td>{item.Loai}</td>
              <td>{item.SoLuong}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ThongKeSPTheoLoai;
