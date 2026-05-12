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
    rewrite: 'Completely rewrite the following text while preserving the core meaning. Use fresh phrasing and structure. Return only the rewritten text, no explanation.',
    formal: 'Rewrite the following text in a professional, formal tone suitable for business or academic contexts. Return only the rewritten text, no explanation.',
    casual: 'Rewrite the following text in a friendly, conversational, casual tone. Return only the rewritten text, no explanation.',
    shorter: 'Make the following text shorter and more concise while keeping all key points. Eliminate redundancy and unnecessary words. Return only the shortened text, no explanation.',
    expand: 'Expand the following text with more detail, examples, and depth. Make it richer and more comprehensive. Return only the expanded text, no explanation.',
  };

  const prompt = prompts[mode];
  if (!prompt) return res.status(400).json({ error: 'Invalid mode' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt + '\n\n---\n\n' + text }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' });

    const result = data.content.map(b => b.text || '').join('');
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
