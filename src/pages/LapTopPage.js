import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function LaptopPage() {
  const [laptopList, setLaptopList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [newLaptop, setNewLaptop] = useState({
    MaSP_L: "",
    CPU: "",
    RAM: "",
    HD: "",
    ManHinh: "",
    Gia: ""
  });

  useEffect(() => {
    fetchLaptopList();
  }, []);

  const fetchLaptopList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/laptop");
      setLaptopList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách Laptop:", error);
    }
  };

  const handleAddOrUpdateLaptop = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/laptop/${selectedLaptop.MaSP_L}`, newLaptop);
      } else {
        await axios.post("http://localhost:5000/laptop", newLaptop);
      }
      fetchLaptopList();
      setShowModal(false);
      setNewLaptop({ MaSP_L: "", CPU: "", RAM: "", HD: "", ManHinh: "", Gia: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật Laptop:", error);
    }
  };

  const handleEdit = (laptop) => {
    setEditMode(true);
    setNewLaptop({ ...laptop });
    setSelectedLaptop(laptop);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Laptop này?")) {
      try {
        await axios.delete(`http://localhost:5000/laptop/${id}`);
        fetchLaptopList();
      } catch (error) {
        console.error("Lỗi khi xóa Laptop:", error);
      }
    }
  };

  const filteredLaptopList = laptopList.filter(
    (laptop) =>
      laptop.MaSP_L.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.CPU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Quản Lý Laptop</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm Laptop theo mã sản phẩm hoặc CPU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Button variant="primary" className="mb-3" onClick={() => { setShowModal(true); setEditMode(false); }}>
        + Thêm Laptop
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Mã SP_L</th>
            <th>CPU</th>
            <th>RAM (GB)</th>
            <th>HD (GB)</th>
            <th>Màn Hình (inch)</th>
            <th>Giá (VNĐ)</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredLaptopList.map((laptop, index) => (
            <tr key={index}>
              <td>{laptop.MaSP_L}</td>
              <td>{laptop.CPU}</td>
              <td>{laptop.RAM}</td>
              <td>{laptop.HD}</td>
              <td>{laptop.ManHinh}</td>
              <td>{laptop.Gia.toLocaleString()} VNĐ</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(laptop)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(laptop.MaSP_L)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Chỉnh Sửa Laptop" : "Thêm Laptop"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Mã Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                value={newLaptop.MaSP_L}
                onChange={(e) => setNewLaptop({ ...newLaptop, MaSP_L: e.target.value })}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                value={newLaptop.CPU}
                onChange={(e) => setNewLaptop({ ...newLaptop, CPU: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RAM (GB)</Form.Label>
              <Form.Control
                type="number"
                value={newLaptop.RAM}
                onChange={(e) => setNewLaptop({ ...newLaptop, RAM: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>HD (GB)</Form.Label>
              <Form.Control
                type="number"
                value={newLaptop.HD}
                onChange={(e) => setNewLaptop({ ...newLaptop, HD: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Màn Hình (inch)</Form.Label>
              <Form.Control
                type="number"
                value={newLaptop.ManHinh}
                onChange={(e) => setNewLaptop({ ...newLaptop, ManHinh: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Giá (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                value={newLaptop.Gia}
                onChange={(e) => setNewLaptop({ ...newLaptop, Gia: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateLaptop}>
            {editMode ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LaptopPage;
