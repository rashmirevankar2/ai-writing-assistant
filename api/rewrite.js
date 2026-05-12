export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, mode } = req.body;
  if (!text || !mode) return res.status(400).json({ error: 'Missing text or mode' });

  const prompts = {
    improve: 'Improve the clarity, flow, and quality of the following text. Fix grammar, enhance word choice, and make it more engaging. Return only the improved text, no explanation.',
    rewrite: 'Completely rewrite the following text while preserving the core meaning. Return only the rewritten text, no explanation.',
    formal: 'Rewrite the following text in a professional, formal tone. Return only the rewritten text, no explanation.',
    casual: 'Rewrite the following text in a friendly, casual tone. Return only the rewritten text, no explanation.',
    shorter: 'Make the following text shorter and more concise. Return only the shortened text, no explanation.',
    expand: 'Expand the following text with more detail and depth. Return only the expanded text, no explanation.',
  };

  const prompt = prompts[mode];
  if (!prompt) return res.status(400).json({ error: 'Invalid mode' });

  try {
    const response = await fetch(
      'https://models.inference.ai.azure.com/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt + '\n\n---\n\n' + text }],
          max_tokens: 1000
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' });

    const result = data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
