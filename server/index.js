// index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

(async () => {
  const { nanoid } = await import('nanoid');

  // Configure CORS
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-client-domain.vercel.app'] // Replace with your client domain
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }));

  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });

  const upload = multer({ storage });

  const fileMap = {};

  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const code = nanoid(6);
      const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      fileMap[code] = filePath;

      const qr = await QRCode.toDataURL(filePath);
      res.json({ code, fileUrl: filePath, qr });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  app.get('/download/:code', (req, res) => {
    const fileUrl = fileMap[req.params.code];
    if (!fileUrl) return res.status(404).json({ error: 'Invalid code' });
    res.redirect(fileUrl);
  });

  // Health check endpoint for Vercel
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
