require("pg");
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Sử dụng cors để cho phép tất cả các nguồn gốc truy cập
app.use(cors());

// Kết nối tới PostgreSQL
const db = new Client({
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  user: "postgres.qyzzpelhwxvrpyglmkgr",
  password: "minh080402.220502",
  database: "postgres",
  port: 6543, // Đảm bảo port này là đúng
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối:", err);
    return;
  }
  console.log("Kết nối PostgreSQL thành công");
});

// Hàm tạo API động
const createAPI = (route, sqlQuery) => {
  app.get(route, (req, res) => {
    db.query(sqlQuery, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // Sử dụng results.rows để lấy mảng kết quả từ PostgreSQL
      const questions = {};
      results.rows.forEach((row) => {
        if (!questions[row.id]) {
          questions[row.id] = {
            id: row.id,
            type: row.type,
            question_text: row.content,
            image_url: row.url,
            answers: [],
          };
        }
        questions[row.id].answers.push({
          answer_id: row.ans_id,
          answer_text: row.answer,
          is_correct: row.is_correct,
        });
      });

      res.json(Object.values(questions));
    });
  });
};

// Câu truy vấn SQL cho từng route
const sqlA1 = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_motos WHERE type = 0 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 1 LIMIT 8)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 2 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 3 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 4 LIMIT 7)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 5 LIMIT 7)
  ) AS q
  LEFT JOIN answer_motos AS ans ON q.id = ans.id_que;
`;

const sqlB1 = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 LIMIT 6)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 LIMIT 9)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 LIMIT 9)
  ) AS q
  LEFT JOIN answer_otos AS ans ON q.id = ans.id_que;
`;

const sqlB2 = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 LIMIT 7)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 5 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 LIMIT 2)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 LIMIT 10)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 LIMIT 10)
  ) AS q
  LEFT JOIN answer_otos AS ans ON q.id = ans.id_que;
`;

const sqlC = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 LIMIT 7)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 5 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 LIMIT 2)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 LIMIT 14)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 LIMIT 11)
  ) AS q
  LEFT JOIN answer_otos AS ans ON q.id = ans.id_que;
`;

// Tạo các API với các route và câu truy vấn SQL tương ứng
createAPI("/A1_API", sqlA1);
createAPI("/B1_API", sqlB1);
createAPI("/B2_API", sqlB2);
createAPI("/C_API", sqlC);

// Chạy server
app.listen(PORT, () => {
  console.log(`Server chạy trên cổng ${PORT}`);
});
