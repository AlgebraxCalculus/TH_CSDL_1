import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function SPPage() {
  const [spList, setSpList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newSP, setNewSP] = useState({ MaSP: "", MaNSX: "", Loai: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedSP, setSelectedSP] = useState(null);

  useEffect(() => {
    fetchSPList();
  }, []);

  const fetchSPList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sp");
      setSpList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const handleAddSP = async () => {
    try {
      if (editMode) {
        // Cập nhật sản phẩm
        await axios.put(`http://localhost:5000/sp/${selectedSP.MaSP}`, newSP);
      } else {
        // Thêm sản phẩm mới
        await axios.post("http://localhost:5000/sp", newSP);
      }

      fetchSPList();
      setShowModal(false);
      setNewSP({ MaSP: "", MaNSX: "", Loai: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật sản phẩm:", error);
    }
  };

  const handleEdit = (sp) => {
    setEditMode(true);
    setNewSP({ MaSP: sp.MaSP, MaNSX: sp.MaNSX, Loai: sp.Loai });
    setSelectedSP(sp);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác!")) {
      try {
        await axios.delete(`http://localhost:5000/sp/${id}`);
        fetchSPList();
        alert("Sản phẩm đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm!");
      }
    }
  };

  const filteredSPList = spList.filter(
    (sp) =>
      sp.MaSP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.MaNSX.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sp.Loai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Quản Lý Sản Phẩm</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Button variant="primary" className="mb-3" onClick={() => { setShowModal(true); setEditMode(false); }}>
        + Thêm Sản Phẩm
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Mã SP</th>
            <th>Mã NSX</th>
            <th>Loại</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredSPList.map((sp, index) => (
            <tr key={index}>
              <td>{sp.MaSP}</td>
              <td>{sp.MaNSX}</td>
              <td>{sp.Loai}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(sp)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(sp.MaSP)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Mã Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                value={newSP.MaSP}
                onChange={(e) => setNewSP({ ...newSP, MaSP: e.target.value })}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mã NSX</Form.Label>
              <Form.Control
                type="text"
                value={newSP.MaNSX}
                onChange={(e) => setNewSP({ ...newSP, MaNSX: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Loại</Form.Label>
              <Form.Control
                type="text"
                value={newSP.Loai}
                onChange={(e) => setNewSP({ ...newSP, Loai: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddSP}>
            {editMode ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SPPage;
