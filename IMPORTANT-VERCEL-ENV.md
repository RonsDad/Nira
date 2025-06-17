# CRITICAL: Set Environment Variable in Vercel

For the chatbot to work on https://ron-ai.io, you MUST:

1. Go to https://vercel.com/dashboard
2. Select your **ron-ai.io** project (NOT the test project)
3. Go to Settings → Environment Variables
4. Add:
   ```
   Key: GEMINI_API_KEY
   Value: AIzaSyBLblzRZmIE2kxXFuIguFC47dbweDTuF9A
   ```
5. Make sure it's enabled for Production, Preview, and Development

The deployment will complete in 1-2 minutes. Once the environment variable is set, your chatbot will work at https://ron-ai.io!
