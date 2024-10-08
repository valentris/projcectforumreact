import React from "react";
import { motion } from "framer-motion"; // Tambahkan ini
import { FaInstagram, FaWhatsapp, FaYoutube, FaUserAlt, FaComments, FaCalculator, FaBriefcase, FaMicrophone } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="py-28 bg-slate-200">
      <motion.div 
        initial={{ opacity:0, y:50 }}
        whileInView={{ opacity:1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          {/* First Section: Women Career Return */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Women Career Return</h1>
            <p className="text-dark2">
              WeCare hadir untuk memberdayakan wanita yang ingin kembali berkarir setelah jeda. Kami membantu Anda mengenali potensi, mengembangkan keterampilan, dan menemukan peluang karir baru. Tujuan kami adalah memudahkan Anda untuk kembali bekerja, tanpa batasan usia atau status.
            </p>
          </div>

          {/* Second Section: Fitur Andalan */}
          <div className="grid grid-cols2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Fitur Andalan</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200 flex items-center space-x-2">
                    <FaUserAlt /> <span>Test Kepribadian</span>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200 flex items-center space-x-2">
                    <FaComments /> <span>Forum Diskusi</span>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200 flex items-center space-x-2">
                    <FaCalculator /> <span>Kalkulator Keuangan</span>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200 flex items-center space-x-2">
                    <FaBriefcase /> <span>Lowongan Kerja & CV Generator</span>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200 flex items-center space-x-2">
                    <FaMicrophone /> <span>Simulasi Wawancara</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third Section: Keunggulan WeCare */}
          <div className="grid grid-cols2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Keunggulan WeCare</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Berpengalaman di berbagai bidang kerja
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Memiliki Mitra dan Koneksi Terpercaya
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Layanan Mobile dan Web Online
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Mudah Diakses dan Dukungan 24/7
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Fitur Premium dengan Harga Terjangkau
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Teruji oleh Keberhasilan Ribuan Klien
                  </li>
                </ul>
              </div>
            </div>

            {/* Section: Temukan Kami */}
            <div className="space-y-4 max-w-[300px]">
              <h1 className="text-xl font-bold">Copyright&copy;2024 - By Valentris</h1>
              <ul className="flex space-x-4">
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaWhatsapp />
                </li>
                <li>
                  <FaYoutube />
                </li>
                <li>
                  <TbWorldWww />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
