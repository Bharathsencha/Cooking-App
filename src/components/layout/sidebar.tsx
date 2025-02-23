import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  PlayCircle,
  MessageSquare,
  Calendar,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: Compass, href: '/explore' },
  { name: 'Reels', icon: PlayCircle, href: '/reels' },
  { name: 'Messages', icon: MessageSquare, href: '/messages' },
  { name: 'Challenges', icon: Calendar, href: '/challenges' },
  { name: 'Leaderboard', icon: Award, href: '/leaderboard' },
];

interface SidebarProps {
  onToggle?: (expanded: boolean) => void;
}

export const Sidebar = ({ onToggle }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 280 : 80 }}
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] border-r bg-background/95 backdrop-blur-md z-30 shadow-sm"
    >
      <div className="flex h-full flex-col gap-2 p-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4 relative",
                  isActive && "bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isExpanded && isActive && (
                  <motion.div
                    className="absolute left-0 w-1 h-full bg-primary rounded-r-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Button>
            </Link>
          );
        })}
        <div className="flex-1" />
        <Button
          variant="ghost"
          className="justify-start gap-4"
          onClick={() => {
            const newExpanded = !isExpanded;
            setIsExpanded(newExpanded);
            onToggle?.(newExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <Settings className="w-5 h-5" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );
};