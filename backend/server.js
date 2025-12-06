require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// ---------------- CORS ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://intra-school-tournment.vercel.app",
      "https://intra-school-tournment.onrender.com"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- MONGO ----------------
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

// ---------------- SCHEMA ----------------
const submissionSchema = new mongoose.Schema({
  formId: {
    type: String,
    default: () =>
      Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
  },
  timestamp: { type: Date, default: () => new Date() },
  fields: {},
});

const Submission = mongoose.model("Submission", submissionSchema);

// ---------------- ROUTE ----------------
app.post("/api/submit", async (req, res) => {
  try {
    const fields = req.body;

    const doc = new Submission({ fields });
    const saved = await doc.save();

    return res.json({ ok: true, id: saved._id, saved });
  } catch (err) {
    console.error("❌ Submit Error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ---------------- START ----------------
app.listen(PORT, () =>
  console.log(`🚀 Server running → http://localhost:${PORT}`)
);
