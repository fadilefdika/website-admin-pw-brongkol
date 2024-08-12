import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Admin</div>
      <nav className="mt-4">
        <ul>
          <li className="hover:bg-gray-700">
            <Link href="/" className="block p-4">
              Dashboard
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/about" className="block p-4">
              Data Tanaman
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/services" className="block p-4">
              Data Penjualan
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link href="/contact" className="block p-4">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
