import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebase/config';

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
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3);



  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-md px-4">
      <div className="container flex h-20 items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo & Menu */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted/50">
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <motion.div initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Utensils className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="hidden md:inline text-2xl font-bold tracking-tight">FoodieShare</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl hidden md:flex mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            className="w-full pl-10 pr-4 bg-muted/50 rounded-full border border-transparent focus:border-primary/50 transition-colors"
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
        <Link to="/UploadVideoPage">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted/50"
          >
            <span className="text-xl">+</span>
          </Button>
        </Link>


        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-muted/50"
            onClick={() => navigate("/Notifications")}
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
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </Link>

          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || "https://via.placeholder.com/40"} alt="User" />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || <UserIcon className="w-5 h-5" />}
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
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-2 text-red-500" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
          <Link to="/AuthPage">
            <Button variant="outline" className="gap-2">
              Login/Signup
            </Button>
          </Link>
          )}
        </div>
      </div>
    </header>
  );
};
