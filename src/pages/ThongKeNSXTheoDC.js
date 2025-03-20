import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Container, Table } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ========================== Đăng ký biểu đồ với Chart.js ==========================
ChartJS.register(ArcElement, Tooltip, Legend);

function ThongKeNSXTheoDC() {
  const [thongKeData, setThongKeData] = useState([]);

  // ========================== Gọi API để lấy dữ liệu thống kê ==========================
  useEffect(() => {
    fetchThongKe();
  }, []);

  const fetchThongKe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/nsx/thongke");
      console.log("Dữ liệu API trả về:", response.data); // Debug API
      setThongKeData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    }
  };

  // ========================== Hàm tạo màu ngẫu nhiên ==========================
  const generateRandomColors = (count) => {
    return Array.from({ length: count }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.6)`;
    });
  };

  // ========================== Kiểm tra nếu chưa có dữ liệu ==========================
  if (thongKeData.length === 0) {
    return (
      <Container>
        <h2 className="my-4">Thống Kê Nhà Sản Xuất Theo Địa Chỉ</h2>
        <p>Đang tải dữ liệu...</p>
      </Container>
    );
  }

  // ========================== Chuẩn bị dữ liệu cho biểu đồ tròn ==========================
  const backgroundColors = generateRandomColors(thongKeData.length);
  const borderColors = backgroundColors.map(color => color.replace("0.6", "1")); // Đổi độ trong suốt để có đường viền rõ hơn

  const chartData = {
    labels: thongKeData.map((item) => item.DiaChi), // Nhãn (địa chỉ)
    datasets: [
      {
        label: "Số lượng nhà sản xuất",
        data: thongKeData.map((item) => item.SoLuong), // Số lượng nhà sản xuất
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      {/* ========================== Tiêu đề trang thống kê ========================== */}
      <h2 className="my-4">Thống Kê Nhà Sản Xuất Theo Địa Chỉ</h2>

      {/* ========================== Biểu đồ tròn thống kê nhà sản xuất ========================== */}
      <div style={{ width: "60%", margin: "0 auto" }}>
        <Pie data={chartData} />
      </div>

      {/* ========================== Bảng thống kê số lượng NSX theo địa chỉ ========================== */}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark text-center">
          <tr>
            <th>Địa Chỉ</th>
            <th>Số Lượng NSX</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {thongKeData.map((item, index) => (
            <tr key={index}>
              <td>{item.DiaChi}</td>
              <td>{item.SoLuong}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ThongKeNSXTheoDC;
