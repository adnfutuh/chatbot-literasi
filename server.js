// server.js
require("dotenv").config();
const express = require("express");
const { OpenAIApi, Configuration } = require("openai");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah chatbot AI dari OJK yang menjelaskan istilah dan konsep keuangan kepada masyarakat awam dalam bahasa Indonesia yang mudah dimengerti.",
        },
        { role: "user", content: userMessage },
      ],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mendapatkan respon" });
  }
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
