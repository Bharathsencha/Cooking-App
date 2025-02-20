import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@/context/theme';
import { AuthProvider } from '@/context/AuthContext';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { CookingAssistant } from '@/components/ai/cooking-assistant';
import { Cursor } from '@/components/cursor';
import { Home } from '@/pages/home';
import { Explore } from '@/pages/explore';
import { Reels } from '@/pages/reels';
import { Messages } from '@/pages/messages';
import { Challenges } from '@/pages/challenges';
import { Leaderboard } from '@/pages/leaderboard';
import { RecipeDetail } from '@/pages/recipe-detail';
import { Profile } from '@/pages/profile';
import { Settings } from "@/pages/settings";
import { Notifications } from '@/pages/Notifications';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>

      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        <Header />
        <Sidebar onToggle={(expanded) => setIsSidebarExpanded(expanded)} />
        <Cursor />
        <div className={`transition-all duration-300 ${isSidebarExpanded ? 'pl-[280px]' : 'pl-[80px]'}`}>
          <main className="container py-2">
        <Routes>


              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notification" element={<Notifications />} />
              </Routes>
          </main>
        </div>

        <CookingAssistant />
      </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>


  );
}

export default App;
