import React from 'react';
import { FaBell } from 'react-icons/fa';
import BgImage from "../assets/BgImage.png";  // Tetap gunakan import
import { motion } from 'framer-motion';

const bgStyle = {
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const Subscribe = () => {
  return (
    <section className="bg-slate-300 min-h-screen" style={bgStyle}>
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container w-full py-24 md:py-48">
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{opacity:1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center">
                
                <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
                    <h1 className="text-4xl font-bold !leading-snug">
                        500K+ Wanita yang telah mendapatkan pekerjaan yang sesuai
                    </h1>
                    <p className ="text-center text-xl font-bold"> Inilah Potret para wanita yang telah berhasil mewujudkan impiannya.</p>
                    <a href="#" className="primary-btn !mt-8 inline-flex items-center gap-4 group"> Subscribe yukk
                        <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200"/>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    </section>
  );
};

export default Subscribe;
