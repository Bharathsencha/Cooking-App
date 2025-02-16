import { motion } from 'framer-motion';
import { CategorySlider } from '@/components/category-slider';
import { RecipeCard } from '@/components/recipe-card';
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
  },
  {
    id: 2,
    title: "Avocado Toast with Poached Eggs",
    author: {
      id: "2",
      name: "Sarah Brown",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Healthy breakfast enthusiast",
      followers: 890,
      following: 230,
      recipes: 28
    },
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    likes: 156,
    comments: 8,
    shares: 23,
    ingredients: ["Bread", "Avocado", "Eggs", "Salt"],
    instructions: ["Toast bread", "Mash avocado", "Poach eggs"],
    cookingTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    category: ["Breakfast", "Healthy"],
    tags: ["breakfast", "healthy", "vegetarian"],
    createdAt: new Date().toISOString()
  }
];

export const Home = () => {
  return (
    <div className="space-y-8 px-4 md:px-12 py-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <motion.h1 
        className="text-center text-4xl font-extrabold text-white drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover New Recipes
      </motion.h1>
      
      <CategorySlider />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-900/50 backdrop-blur-lg border border-gray-700 hover:shadow-2xl"
          >
            <RecipeCard
              image={recipe.image}
              title={recipe.title}
              author={recipe.author.name}
              likes={recipe.likes}
              comments={recipe.comments}
              shares={recipe.shares}
              onClick={() => {/* Navigate to recipe detail */}}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
