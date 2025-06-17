"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface ChatbotProps {
  className?: string
}

// Initialize Gemini AI directly in frontend
// NOTE: This exposes your API key in the browser - only for development!
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBLblzRZmIE2kxXFuIguFC47dbweDTuF9A'
const genAI = new GoogleGenerativeAI(API_KEY)

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Ron AI, your healthcare automation assistant. How can I help you streamline your healthcare operations today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const getAssistantResponse = async (userMessage: string) => {
    setIsTyping(true)
    
    try {
      // Use Gemini AI SDK directly
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' })
      
      // Build system prompt
      const systemPrompt = `You are Nira's AI Assistant. You are a powerful, reliable co-pilot on the clinician's side.

Key Directives:
- Primary Goal: Guide users to understand Nira's value and encourage them to "Request Early Access" or "Join the Waitlist"
- Handle Objections: For cost questions, explain our freemium model with affordable subscription tiers
- Security First: Emphasize security-first design, de-identified data handling, and HIPAA compliance roadmap
- Stay Focused: Stick to core knowledge, don't make up features

Always be helpful, conversational, and focused on the user's needs while guiding them toward early access.`
      
      // Build conversation context
      let conversationContext = `${systemPrompt}\n\nConversation History:\n`
      
      // Add last 5 messages for context
      const recentHistory = messages.slice(-5)
      for (const msg of recentHistory) {
        const role = msg.sender === 'user' ? 'User' : 'Assistant'
        conversationContext += `${role}: ${msg.text}\n`
      }
      
      conversationContext += `\nUser: ${userMessage}\nAssistant:`
      
      const result = await model.generateContent(conversationContext)
      const response = await result.response
      const botReply = response.text()
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text: botReply,
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
      
    } catch (error) {
      console.error('Gemini API error:', error)
      
      // Simple fallback response
      const newMessage: Message = {
        id: Date.now().toString(),
        text: "I apologize, but I'm having trouble connecting. Please try again later or contact support for assistance with Ron AI's Nira platform.",
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    
    // Get assistant response
    getAssistantResponse(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`mb-4 w-80 md:w-96 ${isMinimized ? 'h-16' : 'h-[520px]'} transition-all duration-300`}
          >
            {/* Glassmorphism Chat Window */}
            <div className="h-full rounded-2xl backdrop-blur-xl bg-black/40 border border-white/20 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Nira AI Assistant</h3>
                    <p className="text-white/60 text-xs">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={minimizeChat}
                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white rounded-br-md"
                              : "bg-orange-500 text-white rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl rounded-bl-md">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-white/10">
                    <div className="flex space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full backdrop-blur-xl bg-black/50 border border-white/20 shadow-2xl flex items-center justify-center hover:bg-black/60 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
