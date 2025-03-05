import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Utensils, 
  Heart, 
  Share2, 
  Clock, 
  Star,
  Mic,
  ShoppingCart,
  Video,
  Replace
  
} from 'lucide-react';
import { CategorySlider } from '@/components/category-slider';



import type { Recipe } from '@/types/auth';

const platformFeatures = [
  {
    id: 1,
    icon: <Mic className="text-emerald-600" size={40} />,
    title: "AI Cooking Assistant",
    description: "Get real-time, voice-guided cooking instructions. Your personal chef in your pocket!"
  },
  {
    id: 2,
    icon: <Replace className="text-orange-600" size={40} />,
    title: "Smart Ingredient Swaps",
    description: "Missing an ingredient? Our AI suggests perfect alternatives instantly!"
  },
  {
    id: 3,
    icon: <ShoppingCart className="text-red-600" size={40} />,
    title: "Community Marketplace",
    description: "Order delicious homemade meals directly from local home chefs. Taste authenticity!"
  },
  {
    id: 4,
    icon: <Video className="text-purple-600" size={40} />,
    title: "Food Reels",
    description: "Short, engaging food videos that inspire and entertain. Scroll, learn, cook!"
  }
];




const cookoffChallenges = [
  {
    id: 1,
    title: "30-Minute Meal Challenge",
    description: "Create a gourmet meal in just 30 minutes!",
    prize: "Exclusive Kitchen Gadget Set",
    participants: 127,
    deadline: "March 15, 2024"
  },
  {
    id: 2,
    title: "Zero-Waste Cooking Challenge",
    description: "Transform leftovers and reduce food waste.",
    prize: "Sustainable Cooking Workshop",
    participants: 89,
    deadline: "April 5, 2024"
  }
];

const demoRecipes: Recipe[] = [
  {
    id: 1,
    title: "Quantum Flavor Fusion Pizza",
    author: { name: "Culinary Innovator" },
    likes: 456,
    comments: 34,
    shares: 67,
    description: "A mind-bending recipe that deconstructs traditional pizza, layering unexpected flavor profiles that challenge everything you know about comfort food.",
    ingredients: ["Molecular gastronomy techniques", "Unexpected spice combinations", "Textural surprises"],
    cookingTime: "45 mins",
    difficulty: "Experimental",
    category: ["Innovation", "Fusion"],
    tags: ["mind-blowing", "experimental"]
  },
  {
    id: 2,
    title: "Emotional Comfort Risotto",
    author: { name: "Mood Food Alchemist" },
    likes: 612,
    comments: 52,
    shares: 89,
    description: "A risotto crafted not just with ingredients, but with emotions. Each stir tells a story of comfort, nostalgia, and culinary healing.",
    ingredients: ["Memory-infused stock", "Childhood inspiration", "Emotional depth"],
    cookingTime: "60 mins",
    difficulty: "Soulful",
    category: ["Comfort", "Storytelling"],
    tags: ["emotional", "healing"]
  }
];

export const Home = () => {
  const [activeFeature, setActiveFeature] = useState(platformFeatures[0]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provocative Header */}
        <motion.header 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-black text-red-800 tracking-tight mb-6 leading-tight">
            Recipes Are Not <br />
            <span className="text-orange-600">Just Food</span>. They're <span className="text-emerald-700">Experiences</span>.
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Beyond ingredients and instructions. We're building a universe where every recipe tells a story, challenges perceptions, and connects souls.
          </p>
        </motion.header>

        {/* Category Exploration */}
        <div className="mb-16">
          <CategorySlider />
        </div>

        {/* Recipe Grid: Experimental Narratives */}
        <div className="grid md:grid-cols-2 gap-8">
          {demoRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-l-4 border-red-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-red-800">{recipe.title}</h3>
                <span className="bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-sm">
                  {recipe.category[0]}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{recipe.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="mr-2 text-red-500" size={20} />
                    {recipe.cookingTime}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 text-red-500" size={20} />
                    {recipe.difficulty}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Heart className="text-red-500 hover:scale-110 transition" />
                  <Utensils className="text-emerald-700 hover:scale-110 transition" />
                  <Share2 className="text-orange-600 hover:scale-110 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

 {/* Innovative Platform Features Section */}
 <section className="mb-16 bg-white rounded-2xl shadow-lg p-12 border-2 border-orange-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-red-800 mb-4">
              Beyond Just Recipes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a revolutionary platform that transforms how you explore, create, and share culinary experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {platformFeatures.map((feature) => (
              <div 
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`
                  p-6 rounded-xl text-center cursor-pointer transition-all
                  ${activeFeature.id === feature.id 
                    ? 'bg-red-100 shadow-lg scale-105' 
                    : 'hover:bg-orange-50 hover:shadow-md'}
                `}
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-red-800">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Detailed Feature Description */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              {activeFeature.title}
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {activeFeature.description}
            </p>
          </div>
        </section>




      {/* Footer with Challenges */}
      <footer className="bg-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Active Challenges */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Flame className="mr-3 text-orange-400" /> Active Challenges
              </h3>
              {cookoffChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="bg-red-800 rounded-lg p-5 mb-4 hover:bg-red-700 transition"
                >
                  <h4 className="font-semibold text-lg mb-2">{challenge.title}</h4>
                  <p className="text-orange-100 mb-3">{challenge.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      {challenge.participants} Joined
                    </span>
                    <span className="text-orange-200 text-sm">
                      Ends {challenge.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-300 transition">Recipes</a></li>
                <li><a href="#" className="hover:text-orange-300 transition">Challenges</a></li>
                <li><a href="#" className="hover:text-orange-300 transition">Community</a></li>
                <li><a href="#" className="hover:text-orange-300 transition">About Us</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Stay Inspired</h3>
              <p className="mb-4 text-orange-100">
                Get our latest recipes, challenges, and culinary inspiration delivered straight to your inbox.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-12 pt-6 border-t border-red-700">
            <p className="text-orange-200">
              © 2024 Foodieshare. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;