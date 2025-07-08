# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ron AI Pilot is a Next.js 15 application for Ron AI's healthcare AI assistant. The project features a cyberpunk-themed UI and integrates AI-powered chat functionality to help clinicians with administrative tasks.

## Development Commands

```bash
# Start development (frontend + backend)
npm run dev

# Frontend only
npm run frontend
npm run dev:frontend-only

# Backend only
npm run backend
npm run dev:backend-only

# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel
npm run deploy

# Linting
npm run lint

# Kill existing servers
npm run cleanup
```

## Architecture

### Frontend (Next.js App Router)
- `/app` - App Router pages using server components
- `/src/components` - Shared React components (legacy from Vite)
- UI components use shadcn/ui pattern with Radix UI primitives
- Tailwind CSS with custom cyberpunk theme (electric cyan #00d9ff, cyber magenta #ff00e5)

### Backend (Python Flask)
- `/backend/server.py` - Flask server with CORS enabled
- Runs on port 5001 by default
- Integrates Google Generative AI (Gemini) for chat functionality
- API endpoint: `/api/chat` proxied through Next.js

### Key Integration Points
- Next.js proxies `/api/*` requests to Flask backend (port 5001)
- Environment variables required for AI services (GOOGLE_API_KEY)
- Concurrent execution managed by `concurrently` package

## Testing Approach

Currently no test framework is configured. When implementing tests:
1. Check if a testing framework needs to be installed
2. Follow Next.js testing best practices
3. Test both frontend components and backend API endpoints

## Important Patterns

### Component Structure
- UI components follow shadcn/ui pattern with `cn()` utility for className merging
- Components are in `/src/components/ui` with compound component patterns
- Form components use React Hook Form with zod validation

### API Communication
- Frontend calls `/api/*` endpoints which are proxied to Flask
- CORS is configured in Flask for local development
- Error handling should account for both network and AI service failures

### Styling Conventions
- Tailwind CSS with custom color scheme
- Cyberpunk theme with gradient backgrounds and neon effects
- Responsive design with mobile-first approach

## Environment Setup

Create `.env.local` with:
```
GOOGLE_API_KEY=your_gemini_api_key
```

For backend, ensure Python environment with:
```bash
cd backend
pip install -r requirements.txt
```

## Deployment Notes

- Frontend deploys to Vercel automatically
- Backend requires separate deployment consideration
- Static assets in `/public` are served by Next.js
- Video content in `/public/videos` may need CDN for production