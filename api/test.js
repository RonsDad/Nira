export default function handler(req, res) {
  res.status(200).json({
    message: 'Test endpoint working',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    apiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'NOT SET',
    method: req.method
  });
}
