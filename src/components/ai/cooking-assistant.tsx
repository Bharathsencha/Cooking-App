import { useState } from "react";

import { fetchAIResponse } from "@/lib/gemini";
import type { Message, User } from "@/types";
import FullScreenChatModal from "@/components/chat/chat-window";

export const CookingAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  

  const recipient: User = {
    name: "AI Cooking Assistant",
    avatar: "/path-to-avatar.jpg",
    id: "1",
    bio: "I'm your AI cooking assistant",
    followers: 0,
    following: 0,
    recipes: 0,
  };

  const handleVoiceCommand = async (command: string) => {
    if (!command.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      receiver: recipient.id,
      text: command,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isUser: true,
      read: false
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    try {
      console.log("Sending command to AI:", command);
      const aiResponse = await fetchAIResponse(command);
      console.log("Received AI response:", aiResponse);

      if (aiResponse) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          receiver: "user",
          text: aiResponse,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isUser: false,
          read: false
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error processing command:", error);
      
      // Optional: Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        sender: "ai",
        receiver: "user",
        text: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isUser: false,
        read: false
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <FullScreenChatModal
      recipient={recipient}
      messages={messages}
      onSendMessage={handleVoiceCommand}
    />
  );
};

export default CookingAssistant;