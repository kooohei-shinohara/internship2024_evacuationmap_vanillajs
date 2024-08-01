const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3002;

// CORSを有効にする
app.use(cors());

app.get('/api/emergency_shelters', (req, res) => {
  const geojsonPath = path.join(__dirname, 'evacuation_atsugicity.geojson');
  fs.readFile(geojsonPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading geojson file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/flood_layer', (req, res) => {
    const geojsonPath = path.join(__dirname, 'flood_area.geojson');
    fs.readFile(geojsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return res.status(500).send('Error reading the file');
      }
      res.send(JSON.parse(data));
    });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
