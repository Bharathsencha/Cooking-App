import { useState } from "react";
import { motion } from "framer-motion";
import { Send, PlusCircle, Smile } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

const demoMessages: Message[] = [
  { id: "1", sender: "Chef Maria", text: "Hey, try my new recipe!", timestamp: "10:30 AM", isUser: false },
  { id: "2", sender: "You", text: "Sounds delicious! What is it?", timestamp: "10:32 AM", isUser: true },
  { id: "3", sender: "Chef Maria", text: "It's a homemade lasagna 🍝", timestamp: "10:35 AM", isUser: false },
];

export const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(), // Unique ID
      sender: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4">
      {/* Header */}
      <div className="p-4 bg-card flex items-center justify-between shadow-md rounded-lg">
        <h2 className="text-xl font-bold">Messages</h2>
        <button title="New Message" className="text-primary hover:text-blue-500 transition">
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] ${
                msg.isUser ? "bg-primary text-white ml-auto" : "bg-card text-foreground"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="block text-xs opacity-70 text-right">{msg.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card flex items-center space-x-3 shadow-lg rounded-lg">
        <button title="Add Emoji" className="text-muted-foreground hover:text-primary transition">
          <Smile className="w-6 h-6" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button title="Send Message" onClick={sendMessage} className="text-primary hover:text-blue-500 transition">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
