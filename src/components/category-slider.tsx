import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const categories = [
  'All',
  'Vegetarian',
  'Non-Vegetarian',
  'Desserts',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Beverages',
];

export const CategorySlider = () => {
  return (
    <div className="w-full overflow-x-auto py-4 no-scrollbar">
      <div className="flex gap-2 min-w-max px-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Utensils className="w-4 h-4" />
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};