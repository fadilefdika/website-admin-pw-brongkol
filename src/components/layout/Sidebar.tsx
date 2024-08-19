import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  onLinkClick: (title: string) => void; // Callback function to update the title
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    onLinkClick(linkName); // Call the passed callback function to update the title
  };

  return (
    <div className="w-64 h-auto bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Admin</div>
      <nav className="mt-4">
        <ul>
          <li className={`hover:bg-gray-700 ${activeLink === 'Dashboard' ? 'bg-gray-700' : ''}`}>
            <Link href="/" className="block p-4" onClick={() => handleLinkClick('Dashboard')}>
              Dashboard
            </Link>
          </li>
          <li className={`hover:bg-gray-700 ${activeLink === 'Data Pohon' ? 'bg-gray-700' : ''}`}>
            <Link href="/tree-data" className="block p-4" onClick={() => handleLinkClick('Data Pohon')}>
              Data Pohon
            </Link>
          </li>
          <li className={`hover:bg-gray-700 ${activeLink === 'Data Penjualan' ? 'bg-gray-700' : ''}`}>
            <Link href="/sales-data" className="block p-4" onClick={() => handleLinkClick('Data Penjualan')}>
              Data Penjualan
            </Link>
          </li>
          <li className={`hover:bg-gray-700 ${activeLink === 'Contact' ? 'bg-gray-700' : ''}`}>
            <Link href="/contact" className="block p-4" onClick={() => handleLinkClick('Contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
