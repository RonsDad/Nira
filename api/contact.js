// api/contact.js
// Serverless function for Vercel / Netlify (vercel.json routes) to proxy
// contact form submissions to Zapier. This avoids client-side CORS issues
// because the browser only talks to the same-origin /api/contact endpoint.

// IMPORTANT: If you move the Zapier hook URL or use a different provider,
// update the `ZAPIER_WEBHOOK_URL` environment variable rather than editing
// the code. This keeps secrets out of the repo.

const ZAPIER_WEBHOOK_URL =
  process.env.ZAPIER_WEBHOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/23693877/u3ias4y/';

module.exports = async function handler(req, res) {
  // --- Handle CORS pre-flight ------------------------------------------------
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Body may already be an object when using Vercel middleware; ensure we
    // have plain JSON serializable data for Zapier.
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Forward the payload to Zapier. We don't need the response contents; we
    // only care whether Zapier accepted the request.
    const zapierRes = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!zapierRes.ok) {
      const text = await zapierRes.text();
      console.error('Zapier webhook error:', zapierRes.status, text);
      return res.status(500).json({ error: 'Failed to forward to Zapier' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
