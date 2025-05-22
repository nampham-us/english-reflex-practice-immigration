// pages/api/ai.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // TODO: Thêm logic AI để phân tích và phản hồi.
    // Ví dụ: Gửi text tới OpenAI GPT-3 hoặc dịch vụ AI khác để nhận phản hồi.

    // Để ví dụ, mình sẽ trả về một phản hồi mẫu.
    const aiResponse = `Bạn nói: "${text}". Đây là phản hồi mẫu từ AI.`;

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error processing AI response:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;