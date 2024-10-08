import React from 'react'
import BannerPic from "../assets/BannerPic.png"
import { GrUserExpert } from 'react-icons/gr'
import { FaBookReader } from 'react-icons/fa'
import { FadeUp } from './Hero'
import { motion } from 'framer-motion'
import { MdOutlineAccessTime } from 'react-icons/md'


const Banner = () => {
  return (<section>
    <div className="container py-14 md:py24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0"> 
      {/* Banner Image */}
      <div className="flex justify-center items-center">
        <motion.img
         initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{duration: 0.5, ease:"easeInOut"}}
         src={BannerPic} 
              alt=""
              className="w-[350px] md:max-w-[450px]
              object-cover drop-shadow"/>
      </div>
      {/* Banner Text */}
      <div className="flex flex-col justify-center">
        <div className="text-center md:text-left space-y-12">
          <motion.h1 
          initial={{ opacity:0,scale:0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{duration: 0.5}}
          className="text-3xl md:text-4xl font-bold !leading-snug">WeCare adalah Website yang dibangun untuk membantu para wanita yang telah mengalami jeda karir, 
        dan mengalami kesulitan dalam menemukan pekerjaan.</motion.h1>
          <div className="flex flex-col gap-6">
          <motion.div 
          variants={FadeUp(0.2)}
          initial="initial"
          whileInView={"animate"}
          viewport={{ once:true }}
          className="flex items-center gap-4 p-6 bg-slate-300 rounded-2xl hover:bg-white duration-300 hover:shadow-2xl">
          <FaBookReader className="text-2xl"/>
          <p className="text-lg">20.000 clients</p>
          </motion.div>
          <motion.div 
          variants={FadeUp(0.2)}
          initial="initial"
          whileInView={"animate"}
          viewport={{ once:true }}
          className="flex items-center gap-4 p-6 bg-slate-300 rounded-2xl hover:bg-white duration-300 hover:shadow-2xl">
          <GrUserExpert className="text-2xl"/>
          <p className="text-lg">berpengalaman dari lahir</p>
          </motion.div>
          <motion.div 
          variants={FadeUp(0.2)}
          initial="initial"
          whileInView={"animate"}
          viewport={{ once:true }}
          className="flex items-center gap-4 p-6 bg-slate-300 rounded-2xl hover:bg-white duration-300 hover:shadow-2xl">
          <MdOutlineAccessTime className="text-2xl"/>
          <p className="text-lg">Akses sepanjang masa</p>
          </motion.div>
          </div> 
        </div>  
      </div>
    </div>
  </section>
    
  )
}

export default Banner