import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Removed future flags as they are not available


import AuthPage from './pages/AuthPage'; // Importing AuthPage
import { useState } from 'react';
import { ThemeProvider } from "@/context/theme";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UploadVideoPage from "@/pages/UploadVideoPage";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Cursor } from "@/components/cursor";
import { CookingAssistant } from "@/components/ai/cooking-assistant";
import { Home } from "@/pages/home";
import { Explore } from "@/pages/explore";
import { Reels } from "@/pages/reels";
import { Messages } from "@/pages/messages";
import { Challenges } from "@/pages/challenges";
import { Leaderboard } from "@/pages/leaderboard";
import { RecipeDetail } from "@/pages/recipe-detail";
import { Profile } from "@/pages/profile";
import { Settings } from "@/pages/settings";
import { Notifications } from "@/pages/Notifications";
import ToastContainer from '@/components/ToastContainer';

function AppContent() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <Sidebar onToggle={(expanded) => setIsSidebarExpanded(expanded)} />
      <Cursor />
      <div className={`transition-all duration-300 ${isSidebarExpanded ? 'pl-[280px]' : 'pl-[80px]'}`}>
        <main className="container py-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UploadVideoPage" element={<UploadVideoPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/AuthPage" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
      <CookingAssistant />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
        <ToastContainer />
          <AppContent />
          {/* Removed future flags as they are not available */}


        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
