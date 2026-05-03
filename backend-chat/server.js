require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Kita bersihkan API Key dari spasi nakal
const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
  try {
    // Pakai model gemini-1.5-flash yang paling ringan
    // GANTI DARI gemini-1.5-flash KE gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const userMessage = req.body.message;
    // Prompt khusus asisten Nando
    const prompt = `Kamu asisten virtual Nando. Jawab dengan ramah: ${userMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (error) {
    console.error("DETEKSI ERROR:", error.message);
    res.status(500).json({ reply: "Duh, otaknya lagi loading. Coba chat lagi ya!" });
  }
});

app.listen(3000, () => console.log("Server AI Nando Berhasil Nyala di Port 3000!"));