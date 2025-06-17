module.exports = function handler(req, res) {
  // Handle CORS
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

  const hasApiKey = !!process.env.GEMINI_API_KEY;
  const apiKeyPrefix = process.env.GEMINI_API_KEY 
    ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' 
    : 'NOT SET';

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'production',
      hasGeminiApiKey: hasApiKey,
      geminiApiKeyPrefix: apiKeyPrefix
    }
  });
};
