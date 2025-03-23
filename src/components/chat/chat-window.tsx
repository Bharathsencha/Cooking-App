import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Image as ImageIcon, 
  Smile, 
  X, 
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, User } from "@/types";

interface FullScreenChatModalProps {
  recipient: User;
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
}

export const FullScreenChatModal = ({ 
  recipient, 
  messages: initialMessages, 
  onSendMessage 
}: FullScreenChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Update messages when initialMessages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Send message via parent component's handler
    await onSendMessage(newMessage);
    
    // Clear input
    setNewMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <Bot className="w-7 h-7" />
        </Button>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarImage src={recipient.avatar} />
                    <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{recipient.name}</h3>
                    <p className="text-sm text-blue-100">Online</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsChatOpen(false)} 
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[70%]",
                        message.isUser 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span 
                        className={cn(
                          "text-xs block mt-1",
                          message.isUser ? "text-blue-100" : "text-gray-500"
                        )}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white p-5 border-t">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <ImageIcon className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Smile className="w-6 h-6" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your cooking question..."
                    className="flex-1 rounded-full px-4 py-2 bg-gray-50 border-2 border-transparent text-gray-900 focus:border-blue-500 focus:bg-white"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FullScreenChatModal;