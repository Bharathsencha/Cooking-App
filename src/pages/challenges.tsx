import { motion } from 'framer-motion';
import { Trophy, Clock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Challenges = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold tracking-wide">🔥 Cooking Challenges</h2>
        <p className="text-lg text-gray-300 mt-2">Join, cook, and compete with chefs worldwide!</p>
      </div>

      {/* Featured Challenge */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 mb-12"
      >
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Flame className="text-red-500" /> This Week’s Challenge: "Best Pasta Dish"
        </h3>
        <p className="text-gray-300 mt-2">Create the most delicious pasta and stand a chance to win exclusive rewards!</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-400">
            <Clock className="w-5 h-5" /> Ends in 3 Days
          </span>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
            Join Now
          </Button>
        </div>
      </motion.div>

      {/* Ongoing Challenges */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">🏆 Ongoing Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Dessert Master", "Spicy Food Battle", "Breakfast King"].map((challenge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-lg"
            >
              <h4 className="text-xl font-bold">{challenge}</h4>
              <p className="text-gray-300 text-sm mt-1">Show your skills and win prizes!</p>
              <Button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md">
                Participate
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Winners */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">🏅 Past Winners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Chef Alex", "Chef Mia", "Chef Leo"].map((winner, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg flex items-center gap-3"
            >
              <Trophy className="text-yellow-500 w-8 h-8" />
              <div>
                <h4 className="text-lg font-bold">{winner}</h4>
                <p className="text-gray-400 text-sm">Won "Best Burger Challenge"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
