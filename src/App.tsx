import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { CookingAssistant } from '@/components/ai/cooking-assistant';
import { Home } from '@/pages/home';
import { Explore } from '@/pages/explore';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Sidebar />
        <div className="pl-16 lg:pl-64 pt-16">
          <main className="container py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </main>
        </div>

        <CookingAssistant />
      </div>
    </Router>
  );
}

export default App;
