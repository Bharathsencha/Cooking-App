import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, ChefHat } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface RecipeCardProps {
  image: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  onClick: () => void;
}

export const RecipeCard = ({
  image,
  title,
  author,
  likes,
  comments,
  shares,
  onClick,
}: RecipeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden bg-card">
        <div className="relative aspect-video">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex items-center mt-2 text-white/80">
              <ChefHat className="w-4 h-4 mr-1" />
              <span className="text-sm">{author}</span>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{comments}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
              <span>{shares}</span>
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};