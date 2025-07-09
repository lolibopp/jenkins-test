const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

// GET / - sprawność API
app.get('/', (req, res) => {
  res.send('🎉 API działa! Użyj /tasks');
});

// GET /tasks - lista zadań
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - dodaj nowe zadanie { "title": "Kup mleko" }
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title jest wymagane' });
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id - oznacz wykonane
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Nie znaleziono zadania' });
  task.done = req.body.done === true;
  res.json(task);
});

// DELETE /tasks/:id - usuń zadanie
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server start na porcie ${PORT}`));
