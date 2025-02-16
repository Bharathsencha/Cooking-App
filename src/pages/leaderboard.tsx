import { motion } from "framer-motion";
import { Trophy} from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Chef Maria", points: 980, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
  { id: 2, name: "Sarah Brown", points: 850, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  { id: 3, name: "Gordon C.", points: 790, avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" },
  { id: 4, name: "Jamie O.", points: 730, avatar: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218" },
  { id: 5, name: "Rachel G.", points: 680, avatar: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb" },
];

const getTrophyColor = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
  if (rank === 2) return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
  if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
  return "bg-gray-800 text-gray-300";
};

export const Leaderboard = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <motion.h2
        className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏆 Top Chefs Leaderboard
      </motion.h2>

      <div className="mt-6 space-y-4">
        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.id}
            className={`flex items-center p-4 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg border border-gray-700 ${getTrophyColor(index + 1)}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <span className="ml-4 text-lg font-semibold">{user.name}</span>
            <span className="ml-auto font-bold">{user.points} pts</span>
            {index < 3 && <Trophy className="ml-3 w-6 h-6" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
