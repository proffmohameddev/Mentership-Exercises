// Load express
const express = require("express");
// Create express app
const app = express();
// Choose a port
const PORT = 3000;

// examples memory Data

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Deep Work", author: "Cal Newport" },
];

app.use(express.json());

//Routes

//Get All books
app.get("/", (req, res) => {
  res.json(books);
});

//Post Route
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//Get One book

app.get("/books/:id", (req, res) => {
  const book = books.find((u) => u.id == req.params.id);
  if (!book) return res.status(404).send("book not found");
  res.json(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find((u) => u.id == req.params.id);
  if (!book) return res.status(404).send("book not found");
  book.title = req.body.title;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter((u) => u.id != req.params.id);
  res.send("Book deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
