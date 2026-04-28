import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Gemini API Key assignment
const apiKey = process.env.GEMINI_API_KEY;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message payload required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API Key configuration missing on server' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const response = await model.generateContent(message);
    
    return res.json({ reply: response.response.text() });
  } catch (error) {
    console.error('Gemini Execution Error:', error);
    return res.status(500).json({ error: 'AI processing failed' });
  }
});

// Fallback routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening comfortably on port ${PORT}`);
});
