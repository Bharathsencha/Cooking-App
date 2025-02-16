import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";

const demoReels = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Perfect Fluffy Pancakes 🥞",
    author: "Chef Maria",
    likes: 120,
    comments: 45,
    shares: 30,
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    title: "Ultimate Spaghetti Carbonara 🍝",
    author: "Gordon's Kitchen",
    likes: 342,
    comments: 67,
    shares: 50,
  },
  {
    id: 3,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Cheese Pull Madness! 🧀",
    author: "Foodie Sarah",
    likes: 215,
    comments: 88,
    shares: 64,
  },
];

export const Reels = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % demoReels.length);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {demoReels.map((reel, index) => (
        <motion.div
          key={reel.id}
          className={`absolute inset-0 flex flex-col items-center justify-center ${
            index === currentReel ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentReel ? 1 : 0 }}
        >
          {/* Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={reel.video}
            autoPlay
            loop
            muted={isMuted}
            onClick={nextReel}
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-xl font-bold">{reel.title}</h2>
            <p className="text-sm text-white/80">@{reel.author}</p>
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col gap-4 text-white">
            <button className="flex flex-col items-center hover:scale-110 transition">
              <Heart className="w-6 h-6" />
              <span>{reel.likes}</span>
            </button>
            <button className="flex flex-col items-center hover:scale-110 transition">
              <MessageCircle className="w-6 h-6" />
              <span>{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center hover:scale-110 transition">
              <Share2 className="w-6 h-6" />
              <span>{reel.shares}</span>
            </button>
            <button
              className="p-2 bg-black/60 rounded-full hover:scale-110 transition"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
