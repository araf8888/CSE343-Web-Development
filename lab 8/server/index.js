// server/index.js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ---------------------------
// In-memory storage
// ---------------------------
let posts = [
  // Example post
  { id: 1, name: "Hello World", content: "This is the first post!" },
  { id: 2, name: "Second", content: "Another post" }
];

let comments = {
  // Example comments
  1: [{ comment: "Nice post!" }, { comment: "Welcome!" }]
};

// ---------------------------
// GET all posts
// ---------------------------
app.get("/posts", (req, res) => {
  res.json(posts);
});

// ---------------------------
// GET single post
// ---------------------------
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) return res.status(404).json({ error: "Post not found" });

  res.json(post);
});

// ---------------------------
// PUT update post
// ---------------------------
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, content } = req.body;

  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) return res.status(404).json({ error: "Post not found" });

  posts[postIndex] = { id, name, content };
  res.json(posts[postIndex]);
});

// ---------------------------
// DELETE post
// ---------------------------
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) return res.status(404).json({ error: "Post not found" });

  posts.splice(postIndex, 1);
  delete comments[id];

  res.json({ message: `Post ${id} deleted` });
});

// ---------------------------
// POST create new post
// ---------------------------
let nextPostId = posts.length + 1; // start from max existing ID + 1

app.post("/posts", (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: "Name and content required" });
  }

  const newPost = {
    id: nextPostId++,  // use and increment the counter
    name,
    content,
  };

  posts.push(newPost);
  comments[newPost.id] = [];

  res.status(201).json(newPost);
});

// ---------------------------
// GET comments for a post
// ---------------------------
app.get("/posts/:id/comments", (req, res) => {
  const id = Number(req.params.id);

  if (!comments[id]) return res.status(404).json({ error: "Post not found" });

  res.json(comments[id]);
});

// ---------------------------
// POST create a new comment
// ---------------------------
app.post("/posts/:id/comments", (req, res) => {
  const id = Number(req.params.id);
  const { comment } = req.body;

  if (!comment) return res.status(400).json({ error: "Comment text required" });

  if (!comments[id]) return res.status(404).json({ error: "Post not found" });

  const newComment = { comment };
  comments[id].push(newComment);

  res.status(201).json(newComment);
});

// ---------------------------
// Start server
// ---------------------------
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is started at port : ${PORT}`);
});
