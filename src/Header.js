import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Quản Lý Máy Tính</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/nsx">Quản Lý Nhà Sản Xuất</Nav.Link>
            <Nav.Link as={Link} to="/sanpham">Quản Lý Sản Phẩm</Nav.Link>
            <Nav.Link as={Link} to="/pc">Quản Lý PC</Nav.Link>
            <Nav.Link as={Link} to="/laptop">Quản Lý Laptop</Nav.Link>

            {/* ===== Dropdown Menu cho Chức Năng Thống Kê ===== */}
            <NavDropdown title="Chức Năng Thống Kê" id="thongke-dropdown">
              <NavDropdown.Item as={Link} to="/sp/thongke">Thống kê SP theo loại</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/nsx/thongke">Thống kê nhà sản xuất</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/top-5/thongke">Top 5 SP giá cao nhất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
