import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';


import {
  Utensils,
  Search,
  Bell,
  MessageCircle,
  User as UserIcon,
  Menu,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo & Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <motion.div initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Utensils className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="hidden md:inline">FoodieShare</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg hidden md:flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            className="w-full pl-10 pr-4 bg-muted rounded-full"
            placeholder="Search recipes, chefs, or ingredients..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {isSearchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-background border rounded-lg shadow-lg z-50"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium">Trending Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Pasta', 'Vegan', 'Quick Meals', 'Desserts'].map((term) => (
                    <Button key={term} variant="outline" size="sm">
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Icons & User */}
        <div className="flex items-center gap-3">
          <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate("/Notifications")} // Navigate to page
    >
  
      <Bell className="w-6 h-6" />
      {notifications > 0 && (
        <Badge className="absolute top-1 right-1 text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">
          {notifications}
        </Badge>
      )}
    </Button>

          {/* Messages */}
          <Link to="/messages">
  <Button variant="ghost" size="icon">
    <MessageCircle className="w-6 h-6" />
  </Button>
</Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://via.placeholder.com/40" alt="User" />
                  <AvatarFallback>
                    <UserIcon className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuItem asChild>
  <Link to="/profile" className="flex items-center">
    <UserIcon className="w-5 h-5 mr-2" /> Profile
  </Link>
</DropdownMenuItem>
<DropdownMenuItem asChild>
  <Link to="/settings" className="flex items-center">
    <Settings className="w-5 h-5 mr-2" /> Settings
  </Link>
</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setNotifications(0)}>
                <Bell className="w-5 h-5 mr-2" /> Clear Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="w-5 h-5 mr-2 text-red-500" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
