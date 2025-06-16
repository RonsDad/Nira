# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)
- GEMINI_API_KEY environment variable

## Deployment Steps

### 1. Push to Git
```bash
git add .
git commit -m "Add Vercel serverless function for chatbot"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Set Environment Variables
In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 4. Redeploy (if needed)
After adding environment variables, trigger a new deployment:
```bash
vercel --prod
```

## What's Changed for Vercel

1. **API Function**: Created `/api/chat.ts` as a Vercel serverless function
2. **No separate backend**: The Express backend is replaced by serverless functions
3. **Environment variables**: Set through Vercel dashboard instead of .env files
4. **CORS**: Handled within the serverless function

## Local Development
For local development, you can still use the existing setup:
```bash
# Frontend
npm run dev

# Backend (local only)
cd backend && npm run dev
```

## Production URLs
- Frontend: `https://ron-ai.io`
- API: `https://ron-ai.io/api/chat`

## Setting Up Custom Domain (ron-ai.io)

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain: `ron-ai.io`
4. Follow Vercel's instructions to update your DNS records:
   - Add an A record pointing to `76.76.21.21`
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
5. Vercel will automatically provision SSL certificates

### DNS Configuration:
If you're using a different DNS provider, add these records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Troubleshooting

### API not working after deployment
1. Check environment variables are set in Vercel
2. Check function logs in Vercel dashboard
3. Ensure `@vercel/node` and `@google/generative-ai` are in dependencies

### CORS issues
The serverless function includes CORS headers. If you still have issues, check the allowed origins in `/api/chat.ts`

### Build failures
1. Ensure all dependencies are in `package.json` (not devDependencies)
2. Check build logs in Vercel dashboard
3. Verify Node.js version compatibility
