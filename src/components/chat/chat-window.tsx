import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, Smile, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, User } from "@/types";

interface ChatWindowProps {
  recipient: User;
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
  onClose: () => void;
}

export const ChatWindow = ({ recipient, messages: initialMessages, onSendMessage, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: { id: "user", name: "You" },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await onSendMessage(newMessage);
    setNewMessage("");
  };

  const isUserMessage = (message: Message) => message.sender.id === "user";

  return (
    <div className="flex flex-col h-96 w-full max-w-lg bg-white shadow-lg rounded-lg border">
      <div className="p-4 border-b flex items-center justify-between bg-gray-100">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={recipient.avatar} />
            <AvatarFallback>{recipient.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{recipient.name}</h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => {
              const formattedTime = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex"
                >
                  <div
                    className={cn(
                      "rounded-lg p-3 max-w-[70%] w-fit",
                      isUserMessage(message)
                        ? "bg-blue-600 text-white" // ✅ User messages blue
                        : "bg-gray-100 text-gray-900" // ✅ AI messages gray
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="block text-xs opacity-60 mt-1">
                      {formattedTime}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="w-5 h-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
