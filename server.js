const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files if needed (e.g., your frontend)

// Helper function to read and write the db.json file
function readDbFile() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeDbFile(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET widgets
app.get('/widgets', (req, res) => {
  const data = readDbFile();
  res.json(data.widgets || []);
});

// POST widget
app.post('/widgets', (req, res) => {
  const newWidget = req.body;
  const data = readDbFile();
  newWidget.id = (data.widgets.length > 0 ? Math.max(...data.widgets.map(widget => Number(widget.id))) : 0) + 1;
  data.widgets.push(newWidget);
  writeDbFile(data);
  res.status(201).json(newWidget);
});

// PATCH widget position
app.patch('/widgets/:id', (req, res) => {
  const widgetId = Number(req.params.id);
  const updatedFields = req.body;
  const data = readDbFile();
  const widgetIndex = data.widgets.findIndex(widget => Number(widget.id) === widgetId);

  if (widgetIndex !== -1) {
    data.widgets[widgetIndex] = {
      ...data.widgets[widgetIndex],
      ...updatedFields,
    };
    writeDbFile(data);
    res.json(data.widgets[widgetIndex]);
  } else {
    res.status(404).json({ message: 'Widget not found' });
  }
});

// Start server
app.listen(PORT, () => {
  debugger;
  console.log(`Server is running on http://localhost:${PORT}`);
});
