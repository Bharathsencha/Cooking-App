import { useState } from 'react';
import { 
  Search, 
  ChefHat, 
  Star, 
  Flame, 
  Filter, 
  Clock, 
  Heart, 
  Tag 
} from 'lucide-react';
import { motion } from 'framer-motion';

const cuisineCategories = [
  'Italian', 'Mexican', 'Indian', 'Japanese', 
  'Thai', 'Vegan', 'Desserts', 'Breakfast'
];

const trendingRecipes = [
  {
    id: 1,
    title: 'Spicy Ramen Bowl',
    author: 'Chef Hiro',
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f1f5",
    rating: 4.8,
    cookTime: '45 mins',
    difficulty: 'Medium',
    likes: 1234,
    tags: ['Spicy', 'Asian']
  },
  {
    id: 2,
    title: 'Classic Margherita Pizza',
    author: 'Chef Sofia',
    image: "https://images.unsplash.com/photo-1513104890138-7c749a281501",
    rating: 4.9,
    cookTime: '30 mins',
    difficulty: 'Easy',
    likes: 2456,
    tags: ['Italian', 'Vegetarian']
  },
  {
    id: 3,
    title: 'Chocolate Lava Cake',
    author: 'Chef Marco',
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3",
    rating: 5.0,
    cookTime: '25 mins',
    difficulty: 'Hard',
    likes: 3678,
    tags: ['Dessert', 'Chocolate']
  },
  {
    id: 4,
    title: 'Authentic Thai Green Curry',
    author: 'Chef Nara',
    image: "https://images.unsplash.com/photo-1516685680541-f6a5586a98bc",
    rating: 4.7,
    cookTime: '55 mins',
    difficulty: 'Medium',
    likes: 1876,
    tags: ['Thai', 'Spicy']
  }
];

export const Explore = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search recipes, cuisines, ingredients..." 
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              aria-label="Filter recipes" 
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
            >
              <Filter />
            </button>
          </div>

          {/* Cuisine Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            {cuisineCategories.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition
                  ${selectedCuisine === cuisine 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-red-100'}
                `}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Recipes Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-red-800">
            <Flame className="text-red-500 w-8 h-8" /> Trending Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 flex items-center">
                      <Heart className="mr-2 text-red-500" size={16} />
                      {recipe.likes}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-red-900">{recipe.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-gray-600">
                        <ChefHat className="mr-2 text-red-500" size={16} />
                        {recipe.author}
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="mr-1" size={16} />
                        {recipe.rating}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-red-500" size={16} />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <Tag className="mr-2 text-green-500" size={16} />
                        {recipe.difficulty}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      {recipe.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;