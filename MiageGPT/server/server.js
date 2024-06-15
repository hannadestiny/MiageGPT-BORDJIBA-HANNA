import express from 'express';
import multer from 'multer';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import path from 'path';
import { API_KEY } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: API_KEY,
});

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, '../client')));

const upload = multer();

app.post('/chat', upload.none(), async (req, res) => {
  const prompt = req.body.prompt;
  console.log('PROMPT: ', prompt);

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    if (prompt.startsWith('/image')) {
      const imagePrompt = prompt.replace('/image', '').trim();
      const response = await openai.images.generate({
        prompt: imagePrompt,
        n: 1,
        size: "512x512"
      });
      res.json({ image: response.data[0].url });
    } else if (prompt.startsWith('/speech')) {
      const speechPrompt = prompt.replace('/speech', '').trim();
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: speechPrompt,
          },
        ],
        temperature: 1,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      res.json({ message: response.choices[0].message.content, speech: true });
    } else if (prompt.startsWith('/stable-diffusion')) {
      res.json({ message: `Using Stable Diffusion service for: "${prompt}"` });
    } else {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      res.json(response);
    }
  } catch (error) {
    console.error('Error handling prompt:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
