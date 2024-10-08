import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Banner from "./components/Banner";
import Login from "./Pages/Login"; 
import Register from "./Pages/Register";
import Subscribe from "./components/Subscribe";
import Banner2 from "./components/Banner2";
import Forum from "./Pages/Forum";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton"; // Import ScrollToTopButton

const App = () => {
  const location = useLocation();

  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Navbar />
      <Routes>
        {/* Halaman Home */}
        <Route path="/" element={
          <>
            <Hero />
            {/* Elemen target untuk scroll */}
            <div id="next-section" style={{ height: "1px", visibility: "hidden" }}></div>
            <Services />
            <Banner />
            <Subscribe />
            <Banner2 />
          </>
        } />
        
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} /> 

        {/* Halaman Forum */}
        <Route path="/forum" element={<Forum />} /> 
        
        {/* Halaman Registrasi */}
        <Route path="/register" element={<Register />} /> 
      </Routes>

      {/* Tampilkan Footer hanya di halaman Home */}
      {location.pathname === '/' && <Footer />} 

      {/* Tombol Scroll to Top */}
      <ScrollToTopButton /> {/* Letakkan di bagian paling bawah */}
    </main>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
