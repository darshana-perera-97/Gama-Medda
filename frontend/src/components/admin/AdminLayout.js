import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({ children }) {
  const { isAuthenticated } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content - Offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50">
            {['SI', 'EN', 'TA'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  language === lang
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

