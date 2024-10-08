import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation dan useNavigate


const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Forum",
    path: "/forum"
  },
];

const Navbar = () => {
  const location = useLocation(); // Cek URL saat ini
  const navigate = useNavigate(); // Navigasi untuk redirect
  const [loggedInUser, setLoggedInUser] = useState(null); // State untuk menyimpan data user yang login
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk mengontrol menu mobile

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Hapus data user dari localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
    setLoggedInUser(null); // Reset state user
    navigate('/login'); // Redirect ke halaman login
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  useEffect(() => {
    // Ambil data user dari localStorage saat komponen pertama kali di-render
    const userData = JSON.parse(localStorage.getItem('userData')); // Ambil dari userData
    if (userData) {
      setLoggedInUser(userData); // Jika ada user yang login, simpan ke state
    }
  }, [location.pathname]); // Tambahkan location.pathname sebagai dependensi untuk update ketika halaman berubah

  // Jangan tampilkan navbar jika user berada di halaman login atau register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav>
      <div className="container py-10 flex justify-between items-center">
        {/* logo section */}
        <div>
          <h1 className="font-bold text-2xl">Women Career Return</h1>
        </div>

        {/* Desktop menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="inline-block py-2 px-3 hover:text-secondary relative group"
                >
                  <div className="w-2 h-2 bg-secondary absolute mt-2 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </Link>
              </li>
            ))}

            {/* Cek apakah user sudah login */}
            {loggedInUser ? (
              // Jika sudah login, tampilkan "Welcome, username" dengan dropdown
              <li className="relative group">
                <button className="primary-btn">
                  Welcome, {loggedInUser.nama}
                </button>
                <ul className="absolute hidden group-hover:block bg-white shadow-md rounded-md py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button onClick={handleLogout} className="w-full text-left">Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              // Jika belum login, tampilkan tombol "Sign in"
              <li>
                <Link to="/login" className="primary-btn">Sign in</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Hamburger section */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-4xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu section */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col items-center gap-3 bg-white py-4">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="inline-block py-2 px-3 hover:text-secondary"
                  onClick={() => setIsMenuOpen(false)} // Tutup menu setelah link diklik
                >
                  {menu.title}
                </Link>
              </li>
            ))}

            {/* Cek apakah user sudah login */}
            {loggedInUser ? (
              <li>
                <button onClick={handleLogout} className="primary-btn">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="primary-btn">Sign in</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
