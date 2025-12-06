require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// CORS FIXED
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://intra-school-tournment.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running");
});

// MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

// Schema
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

// Submit Route
app.post("/api/submit", async (req, res) => {
  try {
    const fields = req.body;

    if (!fields || Object.keys(fields).length === 0) {
      return res.status(400).json({ ok: false, error: "Empty form submitted" });
    }

    const doc = new Submission({ fields });
    const saved = await doc.save();

    return res.json({ ok: true, id: saved._id });
  } catch (err) {
    console.error("❌ Submit Error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running → http://localhost:${PORT}`)
);
