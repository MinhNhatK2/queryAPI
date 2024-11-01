//API
require("pg");
const express = require("express");
const cors = require("cors");
const sequelize = require("./models/database");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối tới PostgreSQL
const db = new Client({
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  user: "postgres.qyzzpelhwxvrpyglmkgr",
  password: "minh080402.220502",
  database: "postgres",
  port: 6543, // PostgreSQL sử dụng cổng 5432 mặc định
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối:", err);
    return;
  }
  console.log("Kết nối PostgreSQL thành công");
});

// API để lấy câu hỏi từ database
app.get("/A1_API", (req, res) => {
  const sql = `
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

  db.query(sql, (err, results) => {
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

// API để lấy câu hỏi từ database
app.get("/B1_API", (req, res) => {
  const sql = `
    SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
    FROM ((
    SELECT * 
    FROM question_otos
    WHERE type = 0    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 1    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 2    
    LIMIT 6
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 3    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 4    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 6    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 7    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 8    
    LIMIT 9
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 9    
    LIMIT 9
)) as q LEFT JOIN answer_otos ans ON q.id = ans.id_que;
  `;

  db.query(sql, (err, results) => {
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

// API để lấy câu hỏi từ database
app.get("/B2_API", (req, res) => {
  const sql = `SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
    FROM (
    (
    SELECT * 
    FROM question_otos
    WHERE type = 0
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 1
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 2
    LIMIT 7
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 3
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 4
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 5
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 6
    LIMIT 2
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 7
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 8
    LIMIT 10
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 9
    LIMIT 10
)) as q LEFT JOIN answer_otos ans ON q.id = ans.id_que;
  `;

  db.query(sql, (err, results) => {
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

// API để lấy câu hỏi từ database
app.get("/C_API", (req, res) => {
  const sql = `SELECT q.*, ans.id as ans_id, ans.content as answer, ans.is_correct 
    FROM (
    (
    SELECT * 
    FROM question_otos
    WHERE type = 0
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 1
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 2
    
    LIMIT 7
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 3
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 4
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 5
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 6
    
    LIMIT 2
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 7
    
    LIMIT 1
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 8
    
    LIMIT 14
)
UNION ALL
(
    SELECT * 
    FROM question_otos
    WHERE type = 9
    
    LIMIT 11
)) as q LEFT JOIN answer_otos ans ON q.id = ans.id_que;
  `;

  db.query(sql, (err, results) => {
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

// Chạy server
app.listen(PORT, () => {
  console.log(`Server chạy trên cổng ${PORT}`);
});
