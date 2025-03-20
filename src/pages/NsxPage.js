import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function NsxPage() {
  const [nsxList, setNsxList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newNsx, setNewNsx] = useState({ MaNSX: "", TenNSX: "", DiaChi: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedNsx, setSelectedNsx] = useState(null);

  useEffect(() => {
    fetchNsxList();
  }, []);

  const fetchNsxList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/nsx");
      setNsxList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách NSX:", error);
    }
  };

  const handleAddOrUpdateNsx = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/nsx/${selectedNsx.MaNSX}`, newNsx);
      } else {
        await axios.post("http://localhost:5000/nsx", newNsx);
      }

      fetchNsxList();
      setShowModal(false);
      setNewNsx({ MaNSX: "", TenNSX: "", DiaChi: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật NSX:", error);
    }
  };

  const handleEdit = (nsx) => {
    setEditMode(true);
    setNewNsx({ MaNSX: nsx.MaNSX, TenNSX: nsx.TenNSX, DiaChi: nsx.DiaChi });
    setSelectedNsx(nsx);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhà sản xuất này?")) {
      try {
        await axios.delete(`http://localhost:5000/nsx/${id}`);
        fetchNsxList();
      } catch (error) {
        console.error("Lỗi khi xóa NSX:", error);
      }
    }
  };

  const filteredNsxList = nsxList.filter(
    (nsx) =>
      nsx.MaNSX.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nsx.TenNSX.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Quản Lý Nhà Sản Xuất</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm nhà sản xuất..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Button variant="primary" className="mb-3" onClick={() => { setShowModal(true); setEditMode(false); }}>
        + Thêm Nhà Sản Xuất
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Mã NSX</th>
            <th>Tên NSX</th>
            <th>Địa Chỉ</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredNsxList.map((nsx, index) => (
            <tr key={index}>
              <td>{nsx.MaNSX}</td>
              <td>{nsx.TenNSX}</td>
              <td>{nsx.DiaChi}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(nsx)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(nsx.MaNSX)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Chỉnh Sửa Nhà Sản Xuất" : "Thêm Nhà Sản Xuất"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Mã NSX</Form.Label>
              <Form.Control
                type="text"
                value={newNsx.MaNSX}
                onChange={(e) => setNewNsx({ ...newNsx, MaNSX: e.target.value })}
                disabled={editMode} // Không cho phép chỉnh sửa Mã NSX khi đang edit
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tên NSX</Form.Label>
              <Form.Control
                type="text"
                value={newNsx.TenNSX}
                onChange={(e) => setNewNsx({ ...newNsx, TenNSX: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Địa Chỉ</Form.Label>
              <Form.Control
                type="text"
                value={newNsx.DiaChi}
                onChange={(e) => setNewNsx({ ...newNsx, DiaChi: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateNsx}>
            {editMode ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default NsxPage;
