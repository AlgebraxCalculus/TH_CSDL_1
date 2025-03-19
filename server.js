const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sql, poolPromise } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ========================== CRUD NSX ==========================
// Lấy danh sách nhà sản xuất
app.get("/nsx", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM NSX");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Thêm nhà sản xuất
app.post("/nsx", async (req, res) => {
  try {
    const { MaNSX, TenNSX, DiaChi } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaNSX", sql.VarChar, MaNSX)
      .input("TenNSX", sql.VarChar, TenNSX)
      .input("DiaChi", sql.VarChar, DiaChi)
      .query("INSERT INTO NSX (MaNSX, TenNSX, DiaChi) VALUES (@MaNSX, @TenNSX, @DiaChi)");
    res.send("Thêm NSX thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cập nhật nhà sản xuất
app.put("/nsx/:id", async (req, res) => {
  try {
    const { TenNSX, DiaChi } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaNSX", sql.VarChar, req.params.id)
      .input("TenNSX", sql.VarChar, TenNSX)
      .input("DiaChi", sql.VarChar, DiaChi)
      .query("UPDATE NSX SET TenNSX = @TenNSX, DiaChi = @DiaChi WHERE MaNSX = @MaNSX");
    res.send("Cập nhật NSX thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Xóa nhà sản xuất
app.delete("/nsx/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input("MaNSX", sql.VarChar, req.params.id).query("DELETE FROM NSX WHERE MaNSX = @MaNSX");
    res.send("Xóa NSX thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// ========================== CRUD SP ==========================
// Lấy danh sách sản phẩm
app.get("/sp", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM SP");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Thêm sản phẩm
app.post("/sp", async (req, res) => {
  try {
    const { MaSP, MaNSX, Loai } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaSP", sql.VarChar, MaSP)
      .input("MaNSX", sql.VarChar, MaNSX)
      .input("Loai", sql.VarChar, Loai)
      .query("INSERT INTO SP (MaSP, MaNSX, Loai) VALUES (@MaSP, @MaNSX, @Loai)");
    res.send("Thêm sản phẩm thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Xóa sản phẩm
app.delete("/sp/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input("MaSP", sql.VarChar, req.params.id).query("DELETE FROM SP WHERE MaSP = @MaSP");
    res.send("Xóa sản phẩm thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ========================== CRUD PC ==========================
// Lấy danh sách PC
app.get("/pc", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM PC");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Thêm PC
app.post("/pc", async (req, res) => {
  try {
    const { MaSP_P, CPU, RAM, HD, Gia } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaSP_P", sql.VarChar, MaSP_P)
      .input("CPU", sql.VarChar, CPU)
      .input("RAM", sql.Decimal(10, 2), RAM)
      .input("HD", sql.Decimal(10, 2), HD)
      .input("Gia", sql.Int, Gia)
      .query("INSERT INTO PC (MaSP_P, CPU, RAM, HD, Gia) VALUES (@MaSP_P, @CPU, @RAM, @HD, @Gia)");
    res.send("Thêm PC thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Xóa PC
app.delete("/pc/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input("MaSP_P", sql.VarChar, req.params.id).query("DELETE FROM PC WHERE MaSP_P = @MaSP_P");
    res.send("Xóa PC thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ========================== CRUD Laptop ==========================
// Lấy danh sách Laptop
app.get("/laptop", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Laptop");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Thêm Laptop
app.post("/laptop", async (req, res) => {
  try {
    const { MaSP_L, CPU, RAM, HD, ManHinh, Gia } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaSP_L", sql.VarChar, MaSP_L)
      .input("CPU", sql.VarChar, CPU)
      .input("RAM", sql.Decimal(10, 2), RAM)
      .input("HD", sql.Decimal(10, 2), HD)
      .input("ManHinh", sql.Decimal(10, 2), ManHinh)
      .input("Gia", sql.Int, Gia)
      .query("INSERT INTO Laptop (MaSP_L, CPU, RAM, HD, ManHinh, Gia) VALUES (@MaSP_L, @CPU, @RAM, @HD, @ManHinh, @Gia)");
    res.send("Thêm Laptop thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Xóa Laptop
app.delete("/laptop/:id", async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input("MaSP_L", sql.VarChar, req.params.id).query("DELETE FROM Laptop WHERE MaSP_L = @MaSP_L");
    res.send("Xóa Laptop thành công!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// ========================== API thống kê số lượng sản phẩm theo loại ==========================
app.get("/sp/thongke", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT Loai, COUNT(*) AS SoLuong 
      FROM SP 
      GROUP BY Loai
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Lỗi khi thống kê sản phẩm:", error);
    res.status(500).json({ error: "Lỗi thống kê sản phẩm" });
  }
});

// ========================== API thống kê số lượng nhà sản xuất theo địa chỉ ==========================
app.get("/nsx/thongke", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT DiaChi, COUNT(*) AS SoLuong 
      FROM NSX 
      GROUP BY DiaChi
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Lỗi khi thống kê nhà sản xuất:", error);
    res.status(500).json({ error: "Lỗi thống kê nhà sản xuất" });
  }
});

// ========================== API lấy top 5 sản phẩm giá cao nhất ==========================
app.get("/sp/top5", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
    WITH SanPhamGia AS (
      SELECT SP.MaSP, SP.Loai, PC.Gia 
      FROM SP
      INNER JOIN PC ON SP.MaSP = PC.MaSP_P
      UNION ALL
      SELECT SP.MaSP, SP.Loai, Laptop.Gia 
      FROM SP
      INNER JOIN Laptop ON SP.MaSP = Laptop.MaSP_L
    )
    SELECT TOP 5 * 
    FROM SanPhamGia
    ORDER BY Gia DESC;
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Lỗi khi lấy top 5 sản phẩm:", error);
    res.status(500).json({ error: "Lỗi lấy top 5 sản phẩm" });
  }
});


// ========================== Khởi động server ==========================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
