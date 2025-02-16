import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchAIResponse } from "@/lib/gemini";
import { ChatWindow } from "@/components/chat/chat-window";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

export const CookingAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleVoiceCommand = async (command: string) => {
    if (!command.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: command,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    };

    // Update state with user message first
    setMessages((prev) => [...prev, userMessage]);

    try {
      console.log("Sending command to AI:", command);
      const aiResponse = await fetchAIResponse(command);
      console.log("Received AI response:", aiResponse); // ✅ Debugging line

      if (aiResponse) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "AI Cooking Assistant",
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isUser: false,
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error processing command:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Floating AI Assistant Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-red-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isChatOpen && (
        <Card className="w-80 mt-2 p-3 shadow-lg rounded-lg max-h-96 overflow-y-auto">
          <ChatWindow
            recipient={{
              name: "AI Cooking Assistant",
              avatar: "/path-to-avatar.jpg",
              id: "1",
              bio: "I'm your AI cooking assistant",
              followers: 0,
              following: 0,
              recipes: 0,
            }}
            messages={messages} // Ensure messages are correctly formatted
            onSendMessage={handleVoiceCommand}
            onClose={() => setIsChatOpen(false)}
          />
        </Card>
      )}
    </div>
  );
};
