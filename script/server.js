const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para permitir requisições de qualquer origem
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint para obter visualizações
app.get('/views', (req, res) => {
  const viewsData = JSON.parse(fs.readFileSync('views.json', 'utf-8'));
  res.json({ views: viewsData.views });
});

// Endpoint para incrementar visualizações
app.post('/views', (req, res) => {
  const viewsData = JSON.parse(fs.readFileSync('views.json', 'utf-8'));
  viewsData.views += 1;
  fs.writeFileSync('views.json', JSON.stringify(viewsData, null, 2));
  res.json({ views: viewsData.views });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});