import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m AutoGram\'s AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    hello: 'Hello! Welcome to AutoGram. I can help you with features, pricing, or getting started.',
    features: 'AutoGram offers AI content generation, performance analytics, auto-scheduling, and content workflow management. Which feature would you like to know more about?',
    pricing: 'We offer flexible pricing plans starting from free tier. You can view detailed pricing on our pricing page.',
    'ai content': 'Our AI content generation helps create engaging captions, smart hashtags, and content ideas tailored to your brand voice.',
    analytics: 'Get real-time analytics, audience insights, and comprehensive performance reports to optimize your content strategy.',
    scheduling: 'Our smart scheduling uses AI to post when your audience is most active, with multi-timezone support and bulk scheduling.',
    workflow: 'Streamline content creation with approval workflows, team collaboration, and quality control features.',
    help: 'I can assist with: Features overview, Pricing information, Getting started guide, Technical support, and Account management.',
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return 'I understand you\'re asking about AutoGram. Could you please be more specific? I can help with features, pricing, getting started, or technical questions.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary hover-glow shadow-primary transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100 animate-pulse-glow'
        }`}
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] animate-scale-in">
          <Card className="glass border-border/20 h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 gradient-primary rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="w-5 h-5 animate-float" />
                AutoGram Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-2'
                            : 'glass border-border/20 mr-2 hover-scale'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <div className="glass border-border/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="glass border-border/20 bg-muted/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="gradient-primary hover-glow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;