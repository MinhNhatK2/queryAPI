const { Sequelize } = require("sequelize");

// Thay thế USER, PASSWORD, HOST, PORT, và DATABASE bằng thông tin kết nối từ Supabase
const sequelize = new Sequelize(
  "postgresql://postgres.qyzzpelhwxvrpyglmkgr:minh080402.220502@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  {
    dialect: "postgres",
    logging: false, // Tắt logging nếu không muốn xem các câu query SQL
  }
);

module.exports = sequelize;
