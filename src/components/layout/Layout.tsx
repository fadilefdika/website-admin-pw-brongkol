// Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('Dashboard'); // Default title
  const router = useRouter();

  const handleLinkClick = (newTitle: string) => {
    setTitle(newTitle); // Update title when a link is clicked
  };

  // Optionally, you can update the title based on the route
  React.useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': 'Dashboard',
      '/tree-data': 'Data Pohon',
      '/sales-data': 'Data Penjualan',
      '/tree-data/[id]': 'Detail Pohon',
      '/sales-data/[id]': 'Detail Penjualan',
    };

    setTitle(pathTitles[router.pathname] || 'Dashboard');
  }, [router.pathname]);

  return (
    <main className="relative flex flex-row bg-gray-200">
      <Sidebar onLinkClick={handleLinkClick} />
      <div className="flex flex-col flex-1">
        <Navbar title={title} />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
