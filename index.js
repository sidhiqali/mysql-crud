import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_schema",
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?) ";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    err ? res.json(err) : res.json("successfully created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE book_id = ? ";
  db.query(q, [bookId], (err, data) => {
    err ? res.json(err) : res.json("successfully deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`=? , `desc`= ?, `cover` = ?";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    err ? res.json(err) : res.json("successfully upadated");
  });
});

app.get("/", (req, res) => {
  res.send("server running successfully");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
