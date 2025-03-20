import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function PCPage() {
  const [pcList, setPcList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPC, setSelectedPC] = useState(null);
  const [newPC, setNewPC] = useState({ MaSP_P: "", CPU: "", RAM: "", HD: "", Gia: "" });

  useEffect(() => {
    fetchPCList();
  }, []);

  const fetchPCList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pc");
      setPcList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách PC:", error);
    }
  };

  const handleAddOrUpdatePC = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/pc/${selectedPC.MaSP_P}`, newPC);
      } else {
        await axios.post("http://localhost:5000/pc", newPC);
      }

      fetchPCList();
      setShowModal(false);
      setNewPC({ MaSP_P: "", CPU: "", RAM: "", HD: "", Gia: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật PC:", error);
    }
  };

  const handleEdit = (pc) => {
    setEditMode(true);
    setNewPC({ MaSP_P: pc.MaSP_P, CPU: pc.CPU, RAM: pc.RAM, HD: pc.HD, Gia: pc.Gia });
    setSelectedPC(pc);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa PC này?")) {
      try {
        await axios.delete(`http://localhost:5000/pc/${id}`);
        fetchPCList();
      } catch (error) {
        console.error("Lỗi khi xóa PC:", error);
      }
    }
  };

  const filteredPCList = pcList.filter(
    (pc) =>
      pc.MaSP_P.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pc.CPU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Quản Lý PC</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm PC theo mã sản phẩm hoặc CPU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Button variant="primary" className="mb-3" onClick={() => { setShowModal(true); setEditMode(false); }}>
        + Thêm PC
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Mã SP_P</th>
            <th>CPU</th>
            <th>RAM (GB)</th>
            <th>HD (GB)</th>
            <th>Giá (VNĐ)</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredPCList.map((pc, index) => (
            <tr key={index}>
              <td>{pc.MaSP_P}</td>
              <td>{pc.CPU}</td>
              <td>{pc.RAM}</td>
              <td>{pc.HD}</td>
              <td>{pc.Gia.toLocaleString()} VNĐ</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(pc)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(pc.MaSP_P)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Chỉnh Sửa PC" : "Thêm PC"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Mã Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                value={newPC.MaSP_P}
                onChange={(e) => setNewPC({ ...newPC, MaSP_P: e.target.value })}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                value={newPC.CPU}
                onChange={(e) => setNewPC({ ...newPC, CPU: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RAM (GB)</Form.Label>
              <Form.Control
                type="number"
                value={newPC.RAM}
                onChange={(e) => setNewPC({ ...newPC, RAM: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>HD (GB)</Form.Label>
              <Form.Control
                type="number"
                value={newPC.HD}
                onChange={(e) => setNewPC({ ...newPC, HD: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Giá (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                value={newPC.Gia}
                onChange={(e) => setNewPC({ ...newPC, Gia: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdatePC}>
            {editMode ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PCPage;