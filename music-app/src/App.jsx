import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import PlayerBar from './components/PlayerBar';
import AuthModal from './components/AuthModal';
import BottomNav from './components/BottomNav';
import { useAuth } from './context/AuthContext';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  
  if (loading) return null; // Show splash or nothing while checking localStorage

  if (!user) {
    return <AuthModal />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'home': return <Home />;
      case 'search': return <Search />;
      case 'library': return <Library />;
      default: return <Home />;
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'active' : ''}`}>
        <Sidebar 
          setView={(view) => {
            setActiveView(view);
            setIsSidebarOpen(false);
          }} 
          activeView={activeView} 
        />
      </div>
      
      <main className="main-content">
        <div className="content-overflow-wrapper">
          {renderView()}
        </div>
      </main>

      <div className="player-wrapper">
        <PlayerBar />
      </div>

      <BottomNav 
        activeView={activeView} 
        setView={setActiveView} 
        toggleSidebar={toggleSidebar} 
      />
    </div>
  );
}

export default App;

