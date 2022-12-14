const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "node-mysql",
  user: "root",
  password: "password",
  port: 3306,
  database: "node",
});

//  一覧取得
app.get("/", (req, res) => {
  let data;
  try {
    pool.query("SELECT * FROM todos", (error, results, fields) => {
      if (error) throw error;
      data = results;

      return res.json({
        todo: data,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

//  追加
app.post("/todo/add", (req, res) => {
  const todo = req.body;
  try {
    pool.query(
      "INSERT INTO todos (id, name, description) values(null, ?, ?)",
      [todo.name, todo.description],
      (error, results, fields) => {
        if (error) throw error;
      }
    );
    return res.json({ status: true });
  } catch (err) {
    console.error(err);
  }
});

// 課題① 取得
app.get("/todo/:id", (req, res) => {
  return res.json({});
});

// 課題② 編集
app.put("/todo/:id", (req, res) => {
  return res.json({ status: true });
});

// 課題③ 削除
app.delete("/todo/:id", (req, res) => {
  return res.json({ status: true });
});

//  サーバー起動
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
