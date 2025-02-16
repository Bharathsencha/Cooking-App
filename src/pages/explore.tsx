import { Search, ChefHat, Star, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const trendingRecipes = [
  {
    id: 1,
    title: 'Spicy Ramen Bowl',
    author: 'Chef Hiro',
    image: '/images/ramen.jpg',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Classic Margherita Pizza',
    author: 'Chef Sofia',
    image: '/images/pizza.jpg',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Chocolate Lava Cake',
    author: 'Chef Marco',
    image: '/images/lava-cake.jpg',
    rating: 5.0,
  },
];

export const Explore = () => {
  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          className="w-full pl-10 py-3 rounded-full shadow-lg"
          placeholder="Search recipes, ingredients, or chefs..."
        />
      </div>

      {/* Trending Recipes */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Flame className="text-red-500 w-6 h-6" /> Trending Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden bg-card shadow-lg rounded-xl">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ChefHat className="w-4 h-4" /> {recipe.author}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-yellow-400">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">{recipe.rating}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
