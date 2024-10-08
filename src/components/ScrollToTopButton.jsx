import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Gunakan useLocation untuk mengecek path

  // Fungsi untuk mendeteksi scroll dan menampilkan tombol
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Tampilkan tombol hanya jika di halaman home (/)
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-primary transition duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
