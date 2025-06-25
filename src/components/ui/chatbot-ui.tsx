'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaperPlaneIcon, ChatBubbleIcon, Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PromptButtons } from '@/components/ui/chatbot/prompt-buttons';
import { ContactForm } from '@/components/ui/chatbot/contact-form';

// Simple animated typing indicator component
const TypingIndicator = () => (
  <div className="flex space-x-1 items-center h-5"> {/* Added fixed height */}
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, delay: 0.1, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

interface Message {
  sender: 'user' | 'bot' | 'system';
  text: string;
  isLead?: boolean;
  prompt?: boolean; // Indicates if this is a prompt button message
  formType?: 'contact' | 'appointment' | 'feedback'; // Type of form to display
}

export function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'system', text: "[Pasted text +44 lines]" },
    { sender: 'bot', text: "Hi there! I'm Ron AI's assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    company: ''
  });
  const [isUserIdentified, setIsUserIdentified] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  // Set up periodic proactive messaging
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      // Set a timeout to show notification after a period of inactivity
      chatTimeout.current = setTimeout(() => {
        // Add a proactive message if chat was previously used
        addProactiveMessage();
      }, 60000); // 1 minute
    }

    return () => {
      if (chatTimeout.current) {
        clearTimeout(chatTimeout.current);
      }
    };
  }, [isOpen, messages]);

  // Handle opening the chat when notification is clicked
  useEffect(() => {
    if (showNotification && !isOpen) {
      setUnreadCount(prev => prev + 1);
    }
    
    if (isOpen) {
      setShowNotification(false);
      setUnreadCount(0);
    }
  }, [showNotification, isOpen]);

  // Function to add a proactive message
  const addProactiveMessage = () => {
    const proactiveMessages = [
      "Do you have any questions about Ron AI's healthcare solutions?",
      "Would you like to see how Ron AI can help streamline your healthcare operations?",
      "Can I provide you with information about our integration capabilities?",
      "Are you looking for ways to improve patient outcomes with AI?"
    ];
    
    const randomMessage = proactiveMessages[Math.floor(Math.random() * proactiveMessages.length)];
    setMessages(prev => [...prev, { sender: 'bot', text: randomMessage }]);
    setShowNotification(true);
  };

  // Extract user info from message if possible
  const extractUserInfo = (message: string) => {
    // Simple pattern matching for demonstration purposes
    // In production, you'd want more sophisticated NLP or regex
    const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch && !userInfo.email) {
      setUserInfo(prev => ({ ...prev, email: emailMatch[0] }));
      checkIfLeadExists(emailMatch[0]);
    }
    
    // Look for name patterns
    const nameMatch = message.match(/(?:my name is|I am|I'm) ([A-Za-z]+(?: [A-Za-z]+)?)/i);
    if (nameMatch && !userInfo.name) {
      setUserInfo(prev => ({ ...prev, name: nameMatch[1] }));
    }
    
    // Look for company patterns
    const companyMatch = message.match(/(?:work for|from|at) ([A-Za-z]+(?: [A-Za-z]+)?)/i);
    if (companyMatch && !userInfo.company) {
      setUserInfo(prev => ({ ...prev, company: companyMatch[1] }));
    }
  };

  // Check if lead already exists in HubSpot via Zapier
  const checkIfLeadExists = async (email: string) => {
    try {
      const response = await fetch(`/api/hubspot-zapier?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setIsUserIdentified(true);
          // Update user info from returned contact if available
          if (data.contact) {
            const contact = data.contact;
            setUserInfo(prev => ({
              ...prev,
              name: [contact.firstName, contact.lastName].filter(Boolean).join(' ') || prev.name,
              company: contact.company || prev.company,
            }));
          }
        }
      }
    } catch (error) {
      console.error("Error checking for existing lead:", error);
    }
  };

  // Submit lead to HubSpot via Zapier
  const submitLeadToHubSpot = async () => {
    if (!userInfo.email) return;
    
    try {
      // Format chat history for submission (exclude system messages)
      const chatHistory = messages
        .filter(msg => msg.sender !== 'system')
        .map(msg => `${msg.sender}: ${msg.text}`)
        .join('\n');
      
      await fetch('/api/hubspot-zapier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
          firstName: userInfo.name.split(' ')[0] || '',
          lastName: userInfo.name.split(' ').slice(1).join(' ') || '',
          company: userInfo.company || '',
          source: 'Website Chat Widget',
          chatHistory: chatHistory,
          formType: messages.find(m => m.formType)?.formType || 'contact'
        }),
      });
    } catch (error) {
      console.error("Error submitting lead to HubSpot:", error);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, promptMessage?: string) => {
    if (e) e.preventDefault();
    
    const userMessage = promptMessage || inputValue.trim();
    if (!userMessage) return;

    // Add user message to state
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    if (!promptMessage) setInputValue('');
    setIsLoading(true);

    // Extract user info from message
    extractUserInfo(userMessage);

    try {
      // Send message to backend API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.filter(msg => msg.sender !== 'system'), // Exclude system messages
          userContext: userInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Check if response indicates we should display a form
      const shouldShowForm = data.showForm && ['contact', 'appointment', 'feedback'].includes(data.formType);
      const shouldShowPrompts = data.showPrompts && Array.isArray(data.promptOptions) && data.promptOptions.length > 0;
      
      // Add bot response to state
      const botMessage: Message = { // Add explicit type annotation
        sender: 'bot', 
        text: data.reply,
        isLead: data.isPotentialLead,
        formType: shouldShowForm ? data.formType : undefined
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // If we need to show prompt buttons, add them after bot's message
      if (shouldShowPrompts) {
        setMessages((prev) => [
          ...prev, 
          { 
            sender: 'bot', 
            text: data.promptOptions.join(', '), 
            prompt: true 
          }
        ]);
      }
      
      // If this is a lead and we have email, submit to HubSpot
      if (data.isPotentialLead && userInfo.email) {
        submitLeadToHubSpot();
      }

    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't connect. Please try again later." }]);
    } finally {
      setIsLoading(false);
      // Removed focus to prevent page scrolling
    }
  };
  
  // Handler for when a prompt button is clicked
  const handlePromptClick = (prompt: string) => {
    handleSendMessage(undefined, prompt);
  };
  
  // Handler for form submission
  const handleFormSubmit = (formData: any) => {
    // Update user info with form data
    setUserInfo(prev => ({
      ...prev,
      email: formData.email,
      name: formData.name,
      company: formData.company || prev.company
    }));
    
    // Submit to HubSpot
    submitLeadToHubSpot();
    
    // Send a message to the chat indicating the form was submitted
    setMessages(prev => [
      ...prev,
      { 
        sender: 'user', 
        text: `Submitted contact information: ${formData.name}, ${formData.email}${formData.company ? `, ${formData.company}` : ''}` 
      }
    ]);
    
    // Trigger a bot response
    handleSendMessage(undefined, "I've submitted my contact information");
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
         <Button
           className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 hover:scale-110 transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:bg-cyan-400/20 border border-cyan-400/30 group"
           variant="outline"
           size="icon"
           onClick={() => setIsOpen(true)}
           aria-label="Open Chat"
         >
           <ChatBubbleIcon className="h-6 w-6 group-hover:text-cyan-400" />
           {unreadCount > 0 && (
             <Badge variant="destructive" className="absolute -top-2 -right-2">
               {unreadCount}
             </Badge>
           )}
         </Button>
      )}

      {/* Notification */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-24 right-6 p-4 bg-white/95 backdrop-blur-sm text-gray-800 rounded-lg border border-gray-200 shadow-lg max-w-xs z-50"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex gap-3 items-start cursor-pointer">
              <Avatar className="h-10 w-10 mt-0.5">
                <AvatarImage src="/20250502_1721_Ronny, Helpful Healthcare Robot_simple_compose_01jt9r7935e5da625ajkznmpdx (1).png" alt="Bot" />
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-cyan-300 mb-1">Ron AI Assistant</h4>
                <p className="text-sm">{messages[messages.length - 1].text}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl flex flex-col z-50 overflow-hidden text-gray-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/20250502_1721_Ronny, Helpful Healthcare Robot_simple_compose_01jt9r7935e5da625ajkznmpdx (1).png" alt="Ron AI" />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300">Ron AI Assistant</h3>
                  {isUserIdentified && (
                    <p className="text-xs text-cyan-500/70">Welcome back!</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400 hover:text-cyan-300 hover:bg-white/10">
                      <InfoCircledIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ron AI is here to help with your healthcare questions
                  </TooltipContent>
                </Tooltip>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7 text-neutral-400 hover:text-cyan-300 hover:bg-white/10">
                  <Cross2Icon className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>
            </div>

            {/* Message Area */}
            <ScrollArea className="flex-1 overflow-y-auto px-4 py-3" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="/20250502_1721_Ronny, Helpful Healthcare Robot_simple_compose_01jt9r7935e5da625ajkznmpdx (1).png" alt="Bot" />
                        <AvatarFallback>RA</AvatarFallback>
                      </Avatar>
                    )}
                    {/* Message bubble */}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[75%] break-words ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-600/90 to-cyan-700/90 text-white shadow-[0_2px_8px_rgba(0,200,255,0.3)]' 
                          : msg.sender === 'system'
                          ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-gray-400 border border-gray-700/50 text-xs italic'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {msg.sender === 'system' ? (
                        <div className="text-xs italic">{msg.text}</div>
                      ) : msg.prompt ? (
                        <PromptButtons
                          prompts={msg.text.split(', ')} 
                          onSelectPrompt={handlePromptClick}
                        />
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:text-blue-600 prose-headings:font-medium prose-headings:mb-1 prose-headings:mt-2 prose-p:my-1 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-2 prose-pre:rounded prose-pre:my-2 prose-li:my-0.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-strong:text-gray-900 prose-strong:font-medium">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      )}
                      
                      {msg.isLead && msg.sender === 'bot' && (
                        <div className="mt-1 pt-1 border-t border-cyan-500/20 text-xs text-cyan-400/70">
                          Contact information will help us serve you better
                        </div>
                      )}
                      
                      {msg.formType && msg.sender === 'bot' && (
                        <div className="mt-3">
                          <ContactForm 
                            onSubmit={handleFormSubmit} 
                            formType={msg.formType}
                          />
                        </div>
                      )}
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-cyan-800/50 text-cyan-200">U</AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                   <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-start gap-3"
                   >
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="/20250502_1721_Ronny, Helpful Healthcare Robot_simple_compose_01jt9r7935e5da625ajkznmpdx (1).png" alt="Bot" />
                        <AvatarFallback>RA</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-gray-100 border border-gray-200 flex items-center">
                        <TypingIndicator />
                      </div>
                   </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Footer */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input
                  id="chat-input"
                  className="flex-1 bg-white border-gray-300 focus-visible:ring-blue-500 focus-visible:ring-offset-0 text-gray-800 placeholder:text-gray-500"
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !inputValue.trim()} 
                  aria-label="Send Message" 
                  className="bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white border-none disabled:opacity-50 disabled:from-neutral-700 disabled:to-neutral-800"
                >
                  <PaperPlaneIcon className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
