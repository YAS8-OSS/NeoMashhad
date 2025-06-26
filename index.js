require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// ����� OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ���� ������� ������ ���� ��� ����
app.post('/api/convert-text', async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: '���� ������ �����' });
    }

    // ������ ������ ���� ��� ��� �����
    const prompt = `
    ��� ���� ������ ��� ��� ���� ������� ���� ���� ������ ����ʡ ������ ������ɡ ��������:
    ����: """${inputText}"""
    `;

    // ������� API �� OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "��� ����� ���� ������ ������� ��� ��� �������." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const sceneDescription = completion.data.choices[0].message.content;

    res.json({ scene: sceneDescription });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '��� ��� ����� ��������' });
  }
});

// ����� �������
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
