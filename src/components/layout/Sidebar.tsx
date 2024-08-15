import Link from 'next/link';

interface SidebarProps {
  onLinkClick: (title: string) => void; // Callback function to update the title
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  return (
    <div className="w-64 h-auto bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Admin</div>
      <nav className="mt-4">
        <ul>
          <li className="hover:bg-gray-700">
            <Link href="/" className="block p-4" onClick={() => onLinkClick('Dashboard')}>
              Dashboard
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/tree-data" className="block p-4" onClick={() => onLinkClick('Tree Data')}>
              Data Tanaman
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/sales-data" className="block p-4" onClick={() => onLinkClick('Sales Data')}>
              Data Penjualan
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/contact" className="block p-4" onClick={() => onLinkClick('Contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
