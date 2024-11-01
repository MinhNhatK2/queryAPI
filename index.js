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

      const questions = {};

      results.rows.forEach((row) => {
        const questionId = parseInt(row.id); // Chuyển id sang số nguyên

        if (!questions[questionId]) {
          questions[questionId] = {
            id: questionId,
            type: parseInt(row.type),
            question_text: row.content,
            image_url: row.url || "", // Chuyển null thành chuỗi rỗng nếu không có url
            answers: [],
          };
        }

        questions[questionId].answers.push({
          answer_id: parseInt(row.ans_id), // Chuyển answer_id sang số nguyên
          answer_text: row.answer,
          is_correct: row.is_correct ? 1 : 0, // Chuyển true/false thành 1/0
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
    (SELECT * FROM question_motos WHERE type = 0 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 1 ORDER BY RANDOM() LIMIT 8)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 2 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 3 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 4 ORDER BY RANDOM() LIMIT 7)
    UNION ALL
    (SELECT * FROM question_motos WHERE type = 5 ORDER BY RANDOM() LIMIT 7)
  ) AS q
  LEFT JOIN answer_motos AS ans ON q.id = ans.id_que;
`;

const sqlB1 = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 ORDER BY RANDOM() LIMIT 6)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 ORDER BY RANDOM() LIMIT 9)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 ORDER BY RANDOM() LIMIT 9)
  ) AS q
  LEFT JOIN answer_otos AS ans ON q.id = ans.id_que;
`;

const sqlB2 = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 ORDER BY RANDOM() LIMIT 7)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 5 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 ORDER BY RANDOM() LIMIT 2)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 ORDER BY RANDOM() LIMIT 10)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 ORDER BY RANDOM() LIMIT 10)
  ) AS q
  LEFT JOIN answer_otos AS ans ON q.id = ans.id_que;
`;

const sqlC = `
  SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
  FROM (
    (SELECT * FROM question_otos WHERE type = 0 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 1 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 2 ORDER BY RANDOM() LIMIT 7)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 3 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 4 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 5 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 6 ORDER BY RANDOM() LIMIT 2)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 7 ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 8 ORDER BY RANDOM() LIMIT 14)
    UNION ALL
    (SELECT * FROM question_otos WHERE type = 9 ORDER BY RANDOM() LIMIT 11)
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
