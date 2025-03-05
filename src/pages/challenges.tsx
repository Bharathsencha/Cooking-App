import { motion } from 'framer-motion';
import { Trophy, Clock, Flame, Users, Star } from 'lucide-react';

export const Challenges = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900 py-12 px-6">
      {/* Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-wide text-red-800">
          🔥 Cooking Challenges
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Join, cook, and compete with chefs worldwide!
        </p>
      </div>

      {/* Featured Challenge */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 mb-12 max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold flex items-center gap-2 text-red-800">
          <Flame className="text-red-500" /> This Week's Challenge: "Best Pasta Dish"
        </h3>
        <p className="text-gray-600 mt-2">
          Create the most delicious pasta and stand a chance to win exclusive rewards!
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-red-500" /> 
            <span>Ends in 3 Days</span>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            Join Now
          </button>
        </div>
      </motion.div>

      {/* Ongoing Challenges */}
      <div className="mb-12 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-red-800">🏆 Ongoing Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Dessert Master",
              description: "Create the most innovative dessert!",
              participants: 127,
              prize: "$500 Cash"
            },
            {
              title: "Spicy Food Battle",
              description: "Who can handle the heat?",
              participants: 89,
              prize: "Gourmet Spice Kit"
            },
            {
              title: "Breakfast King",
              description: "Reinvent breakfast classics",
              participants: 156,
              prize: "Cooking Masterclass"
            }
          ].map((challenge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-red-800 mb-2">{challenge.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span>{challenge.participants} Joined</span>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {challenge.prize}
                </span>
              </div>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition">
                Participate
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Winners */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-red-800">🏅 Past Winners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Chef Alex",
              challenge: "Best Burger Challenge",
              dish: "Smoky Maple Bacon Burger",
              rating: 4.9
            },
            {
              name: "Chef Mia",
              challenge: "Vegan Delight",
              dish: "Quinoa Buddha Bowl",
              rating: 4.8
            },
            {
              name: "Chef Leo",
              challenge: "Seafood Spectacular",
              dish: "Citrus Salmon Ceviche",
              rating: 5.0
            }
          ].map((winner, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <Trophy className="text-yellow-500 w-8 h-8 mr-3" />
                <div>
                  <h4 className="text-lg font-bold text-red-800">{winner.name}</h4>
                  <p className="text-gray-600 text-sm">{winner.challenge}</p>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-gray-700 mb-2">Winning Dish: {winner.dish}</p>
                <div className="flex items-center text-yellow-500">
                  <Star className="mr-2" />
                  <span className="font-semibold">{winner.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;