import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../layouts/MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
        <Header />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 text-white p-4">
          <Sidebar />
        </aside>

        {/* Dashboard or Main Content */}
        <main className="flex-grow bg-gray-100 p-6 overflow-y-auto">
          {children} {/* Render dynamic content (Dashboard, Overview, About) here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
