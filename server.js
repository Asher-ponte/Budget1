const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

app.use(cors());
app.use(express.json());

// Helper functions
function getFilePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}
function readData(name) {
  const file = getFilePath(name);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
function writeData(name, data) {
  fs.writeFileSync(getFilePath(name), JSON.stringify(data, null, 2));
}

// API endpoints
app.get('/api/:type', (req, res) => {
  const data = readData(req.params.type);
  res.json(data);
});

app.post('/api/:type', (req, res) => {
  writeData(req.params.type, req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});