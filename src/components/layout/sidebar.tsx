import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  PlayCircle,
  MessageSquare,
  Calendar,
  Award,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: Compass, href: '/explore' },
  { name: 'Reels', icon: PlayCircle, href: '/reels' },
  { name: 'Messages', icon: MessageSquare, href: '/messages' },
  { name: 'Challenges', icon: Calendar, href: '/challenges' },
  { name: 'Leaderboard', icon: Award, href: '/leaderboard' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-50 flex flex-col">
      {/* Sidebar Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="m-2" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>
      
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ width: '4rem' }} 
        animate={{ width: isOpen ? '16rem' : '4rem' }}
        transition={{ duration: 0.3 }}
        className="h-full border-r bg-background shadow-md flex flex-col items-start overflow-hidden"
      >
        <div className="flex flex-col w-full py-4">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="flex items-center gap-4 w-full px-4 py-3 transition-all duration-200 hover:bg-muted rounded-md">
              <item.icon className="w-6 h-6 text-primary" />
              <span className={`text-sm font-medium ${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <Button 
          variant="ghost" 
          className="w-full flex items-center gap-4 p-3 transition-all duration-200 hover:bg-muted rounded-md"
        >
          <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
  <Settings className="w-6 h-6 text-primary" />
  <span className={`text-sm font-medium ${isOpen ? "block" : "hidden"}`}>
    Settings
  </span>
</Link>
        </Button>
      </motion.div>
    </div>
  );
};
