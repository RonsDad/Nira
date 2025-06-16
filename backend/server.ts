import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// Function to detect if a message is a potential lead
function isPotentialLead(message: string): boolean {
  const leadIndicators = [
    /contact.*sales/i, 
    /pricing/i, 
    /demo/i, 
    /quote/i, 
    /interested in/i,
    /how (much|many)/i,
    /email/i,
    /phone/i,
    /call/i,
    /contact/i,
    /early access/i,
    /waitlist/i,
    /sign up/i
  ];
  
  return leadIndicators.some(pattern => pattern.test(message));
}

// Mock response function for when API key is not available
function getMockResponse(message: string): string {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('pricing') || messageLower.includes('cost') || messageLower.includes('price')) {
    return "Nira will operate on a freemium model with affordable subscription tiers for individual clinicians. Organization plans will soon be available. Sign up for our waitlist to be the first to know about pricing!";
  }
  
  if (messageLower.includes('security') || messageLower.includes('hipaa') || messageLower.includes('compliance')) {
    return "Ron AI is building Nira with a security-first mindset. Our initial product is designed to work with de-identified data to ensure zero risk, and our long-term roadmap includes full HIPAA compliance and SOC 2 certification for our enterprise partners.";
  }
  
  if (messageLower.includes('demo') || messageLower.includes('try') || messageLower.includes('test')) {
    return "I'd love to show you what Nira can do! We're currently in development and building our waitlist. Would you like to request early access? This will give you priority access when we launch.";
  }
  
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
    return "Hello! I'm Ron AI's assistant. Nira is our revolutionary healthcare AI platform that helps clinicians automate administrative tasks and focus on patient care. How can I help you learn more about Nira today?";
  }
  
  if (messageLower.includes('features') || messageLower.includes('what') || messageLower.includes('does') || messageLower.includes('can')) {
    return "Nira specializes in automating prior authorizations, insurance verifications, and clinical documentation. Our AI agents work 24/7 to handle tedious administrative tasks, freeing up healthcare professionals to focus on what matters most - patient care. Would you like to learn more about a specific feature?";
  }
  
  const responses = [
    "That's a great question! Nira is designed to streamline healthcare workflows and reduce administrative burden. Would you like to request early access to be among the first to experience our platform?",
    "I understand you're interested in Nira's capabilities. Our AI-powered platform helps automate administrative tasks, allowing healthcare professionals to focus on patient care. Can I help you with any specific questions?",
    "Thanks for your interest in Nira! Our platform integrates with existing healthcare systems to automate workflows and improve operational efficiency. Would you like to join our waitlist for early access?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], userContext = {} } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const isLead = isPotentialLead(message);
    
    if (!API_KEY) {
      // Use mock responses when API key is not available
      const reply = getMockResponse(message);
      return res.json({
        reply,
        isPotentialLead: isLead,
        timestamp: Date.now().toString()
      });
    }
    
    try {
      // Use Gemini AI
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      // Build system prompt
      const systemPrompt = `You are Nira's AI Assistant. You are a powerful, reliable co-pilot on the clinician's side.

Key Directives:
- Primary Goal: Guide users to understand Nira's value and encourage them to "Request Early Access" or "Join the Waitlist"
- Handle Objections: For cost questions, explain our freemium model with affordable subscription tiers
- Security First: Emphasize security-first design, de-identified data handling, and HIPAA compliance roadmap
- Stay Focused: Stick to core knowledge, don't make up features

Always be helpful, conversational, and focused on the user's needs while guiding them toward early access.`;
      
      // Build conversation context
      let conversationContext = `${systemPrompt}\n\nConversation History:\n`;
      
      // Add last 5 messages for context
      const recentHistory = history.slice(-5);
      for (const msg of recentHistory) {
        const role = msg.sender === 'user' ? 'User' : 'Assistant';
        conversationContext += `${role}: ${msg.text}\n`;
      }
      
      conversationContext += `\nUser: ${message}\nAssistant:`;
      
      const result = await model.generateContent(conversationContext);
      const response = await result.response;
      const botReply = response.text();
      
      res.json({
        reply: botReply,
        isPotentialLead: isLead,
        timestamp: Date.now().toString()
      });
      
    } catch (aiError) {
      console.error('Gemini API error:', aiError);
      // Fall back to mock response on AI error
      const reply = getMockResponse(message);
      res.json({
        reply,
        isPotentialLead: isLead,
        timestamp: Date.now().toString()
      });
    }
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    gemini_configured: Boolean(API_KEY)
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Nira AI Chatbot Backend (TypeScript)',
    status: 'running',
    endpoints: ['/api/chat', '/api/health']
  });
});

// Start server
app.listen(port, () => {
  console.log(`Nira AI Chatbot Backend (TypeScript) running on port ${port}`);
  console.log(`Gemini AI configured: ${Boolean(API_KEY)}`);
});
