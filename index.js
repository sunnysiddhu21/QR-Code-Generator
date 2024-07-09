const express = require('express');
const path = require('path');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to generate QR code
app.get('/generate', async (req, res) => {
  const text = req.query.text;
  if (!text) {
    return res.status(400).send('Text is required');
  }
  try {
    const qrCodeData = await QRCode.toDataURL(text);
    res.send(qrCodeData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating QR code');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
