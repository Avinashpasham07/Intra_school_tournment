// backend/server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// ---------------- MONGO ATLAS ONLY --------------------
const MONGO_URI = process.env.MONGO_URI;

// ---------------- CORS --------------------
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ---------------- UPLOAD FOLDER --------------------
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use("/uploads", express.static(UPLOAD_DIR));

// ---------------- MULTER SETUP --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files allowed"));
    cb(null, true);
  },
});

const cpUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "signatureParticipant", maxCount: 1 },
  { name: "signatureParent", maxCount: 1 },
  { name: "signatureTeacher", maxCount: 1 },
]);

// ---------------- DB CONNECTION --------------------
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 MongoDB Atlas Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });

// ---------------- SCHEMAS --------------------
const fileSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  filename: String,
  size: Number,
  path: String,
});

const submissionSchema = new mongoose.Schema({
  formId: {
    type: String,
    default: () =>
      Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
  },
  timestamp: { type: Date, default: () => new Date() },
  fields: { type: mongoose.Schema.Types.Mixed },
  files: { type: Map, of: fileSchema },
});

const Submission = mongoose.model("Submission", submissionSchema);

// ---------------- SUBMIT ROUTE --------------------
app.post("/api/submit", cpUpload, async (req, res) => {
  try {
    const fields = req.body || {};
    const files = req.files || {};

    const fileMeta = {};
    ["photo", "signatureParticipant", "signatureParent", "signatureTeacher"].forEach((key) => {
      if (files[key] && files[key][0]) {
        const f = files[key][0];
        fileMeta[key] = {
          fieldname: f.fieldname,
          originalname: f.originalname,
          filename: f.filename,
          size: f.size,
          path: path.join("uploads", f.filename),
        };
      }
    });

    const doc = new Submission({
      fields,
      files: fileMeta,
    });

    const saved = await doc.save();

    return res.json({
      ok: true,
      id: saved._id,
      message: "Form submitted successfully!",
      saved,
    });
  } catch (err) {
    console.error("❌ Error on /api/submit:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// ---------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({ ok: false, error: err.message });
});

// ---------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
