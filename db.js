const sql = require("mssql");

const config = {
  user: "sa",
  password: "12345",
  server: "localhost", // Hoặc IP của SQL Server
  database: "ThucHanh",
  options: {
    encrypt: false, // Bật nếu dùng Azure
    trustServerCertificate: true, // Cần thiết nếu dùng localhost
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Kết nối SQL Server thành công!");
    return pool;
  })
  .catch((err) => console.log("Lỗi kết nối SQL Server:", err));

module.exports = {
  sql,
  poolPromise,
};
