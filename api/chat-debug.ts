import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Test endpoint to debug the issue
  
  const debugInfo = {
    method: req.method,
    hasApiKey: !!process.env.GEMINI_API_KEY,
    apiKeyLength: process.env.GEMINI_API_KEY?.length || 0,
    nodeVersion: process.version,
    body: req.body,
    headers: req.headers
  };
  
  res.status(200).json({
    debug: true,
    info: debugInfo,
    env: {
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      keyPrefix: process.env.GEMINI_API_KEY?.substring(0, 10) + '...' || 'NOT SET'
    }
  });
}
