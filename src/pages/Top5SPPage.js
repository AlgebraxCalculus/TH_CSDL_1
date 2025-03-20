import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Container, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ========================== Đăng ký biểu đồ với Chart.js ==========================
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Top5SPPage() {
  const [top5Data, setTop5Data] = useState([]);

  // ========================== Gọi API để lấy dữ liệu top 5 sản phẩm ==========================
  useEffect(() => {
    fetchTop5();
  }, []);

  const fetchTop5 = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sp/top5");
      console.log("Dữ liệu API trả về:", response.data); // Debug API
      setTop5Data(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu top 5 sản phẩm:", error);
    }
  };

  // ========================== Kiểm tra nếu chưa có dữ liệu ==========================
  if (top5Data.length === 0) {
    return (
      <Container>
        <h2 className="my-4">Top 5 Sản Phẩm Giá Cao Nhất</h2>
        <p>Đang tải dữ liệu...</p>
      </Container>
    );
  }

  // ✅ Sắp xếp dữ liệu theo giá tăng dần trước khi hiển thị trên biểu đồ
  const sortedData = [...top5Data].sort((a, b) => a.Gia - b.Gia);

  // ========================== Chuẩn bị dữ liệu cho biểu đồ đường ==========================
  const chartData = {
    labels: sortedData.map((item) => `${item.MaSP} (${item.Loai})`), // Mã + Loại sản phẩm
    datasets: [
      {
        label: "Giá (VNĐ)",
        data: sortedData.map((item) => item.Gia), // Giá sản phẩm
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  return (
    <Container>
      {/* ========================== Tiêu đề trang top 5 sản phẩm ========================== */}
      <h2 className="my-4">Top 5 Sản Phẩm Giá Cao Nhất</h2>

      {/* ========================== Biểu đồ top 5 sản phẩm ========================== */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Line data={chartData} />
      </div>

      {/* ========================== Bảng danh sách top 5 sản phẩm ========================== */}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark text-center">
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Loại Sản Phẩm</th>
            <th>Giá (VNĐ)</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {top5Data.map((item, index) => (
            <tr key={index}>
              <td>{item.MaSP}</td>
              <td>{item.Loai}</td>
              <td>{item.Gia.toLocaleString()} VNĐ</td> {/* Hiển thị giá có dấu phân cách */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Top5SPPage;
