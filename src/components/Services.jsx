import React from 'react';
import { CiMobile3 } from 'react-icons/ci';
import { FaHandshake, FaDollarSign, FaThumbsUp, FaUsers } from 'react-icons/fa'; 
import { MdOutlineAccessTime } from 'react-icons/md';
import { TbWorldWww } from 'react-icons/tb';
import { motion } from 'framer-motion';
const ServicesData = [
  {
    id: 1,
    title: "Berpengalaman di berbagai bidang kerja",
    link: "#",
    icon: <FaThumbsUp />,
    delay: 0.3,
  },
  {
    id: 2,
    title: "Memiliki Mitra dan Koneksi terpercaya",
    link: "#",
    icon: <FaHandshake />,
    delay: 0.4,
  },
  {
    id: 3,
    title: "Layanan bersifat Mobile dan Web Online",
    link: "#",
    icon: <CiMobile3 />,
    delay: 0.5,
  },
  {
    id: 4,
    title: "Mudah Diakses dan 24/7 tim support",
    link: "#",
    icon: <MdOutlineAccessTime />,
    delay: 0.6,
  },
  {
    id: 5,
    title: "Fitur Premium dengan harga terjangkau",
    link: "#",
    icon: <FaDollarSign />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Telah teruji oleh Keberhasilan Ribuan Klien",
    link: "#",
    icon: <FaUsers />,
    delay: 0.6,
  },
];

const SlideLeft = (delay) => {
    return {
        initial: {
            opacity:0,
            x:50,
        },
        animate: {
            opacity: 1,
            x:0,
            transition: {
                duration:0.8,
                delay:delay,
                ease:"easeInOut",
            },
        },
    }
}


const Services = () => {
    return (
      <section className="bg-white">
        <div className="container pb-14 pt-16">
          <h1 className="text-4xl font-bold text-left pb-10">Layanan WeCaRe</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {ServicesData.map((service) => (  // Ganti dengan 'service' yang konsisten
              <motion.div
                key={service.id}  // Gunakan id unik
                variants={SlideLeft(service.delay)}  // Ganti dengan service.delay
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-slate-300 rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
              >
                <div className="text-4xl mb-4">{service.icon}</div>  {/* Ganti dengan service.icon */}
                <h1 className="text-lg font-semibold text-center">{service.title}</h1>  {/* Ganti dengan service.title */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Services