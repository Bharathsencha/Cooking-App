import React from 'react';
import { motion } from 'framer-motion';
import { CategorySlider } from '@/components/category-slider';
import { RecipeCard } from '@/components/recipe-card';
import UploadVideo from '@/components/UploadVideo'; // 🆕 Import UploadVideo Component
import type { Recipe } from '@/types';

const demoRecipes: Recipe[] = [
  {
    id: 1,
    title: "Homemade Pizza Margherita",
    author: {
      id: "1",
      name: "Chef Maria",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Passionate about Italian cuisine",
      followers: 1200,
      following: 300,
      recipes: 45
    },
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    likes: 234,
    comments: 12,
    shares: 45,
    ingredients: ["Pizza dough", "Tomatoes", "Mozzarella", "Basil"],
    instructions: ["Prepare the dough", "Add toppings", "Bake at 450°F"],
    cookingTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    category: ["Italian", "Pizza"],
    tags: ["dinner", "vegetarian"],
    createdAt: new Date().toISOString()
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Main container with proper max-width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Discover New Recipes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore delicious recipes from talented chefs around the world
          </p>
        </motion.header>

        {/* Upload Video Button */}
        <div className="flex justify-center mb-8">
          <UploadVideo />
        </div>

        {/* Category slider with proper spacing */}
        <div className="mb-12">
          <CategorySlider />
        </div>

        {/* Recipe grid with responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {demoRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
              }}
              className="group"
            >
              <div className="relative h-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-gray-600 hover:shadow-xl hover:shadow-black/20">
                <RecipeCard
                  image={recipe.image}
                  title={recipe.title}
                  author={recipe.author.name}
                  likes={recipe.likes}
                  comments={recipe.comments}
                  shares={recipe.shares}
                  onClick={() => {/* Navigate to recipe detail */}}
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
