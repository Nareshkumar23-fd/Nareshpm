import React from "react";
import { motion } from "framer-motion";
import { assets } from "../Assets/assets";

const Home = () => {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex flex-col
        bg-white dark:bg-[#0F0F14]
        overflow-hidden
      "
    >
      {/* ===== FULL SCREEN BACKGROUND ===== */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={assets.npm}
            alt="background"
            className="w-full h-[900px] sm:h-[740px] md:min-h-screen xl:h-[940px] lg:h-[840px] object-cover pt-10"
          />
        </motion.div>

        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/100 via-black/10 to-black/100" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-transparent to-transparent" />

        {/* Animated Light Orbs */}
        <motion.div
          animate={{
            x: ["0%", "15%", "0%"],
            y: ["0%", "-10%", "0%"],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: ["0%", "-10%", "0%"],
            y: ["0%", "15%", "0%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20"
        />
      </div>

      {/* ===== FLOATING PARTICLES ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
            animate={{
              y: [Math.random() * window.innerHeight, -100],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: "100%",
            }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 flex-1 flex flex-col justify-center min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 xl:px-8 pt-30 lg:pt-45 pb-8">
        <div className="max-w-7xl w-full mx-auto">

          {/* ===== LEFT ALIGNED CONTENT ===== */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl space-y-3"
          >
            {/* Simple Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-violet-300/80 text-lg font-light tracking-widest uppercase"
            >
              Hello, I'm
            </motion.p>

            {/* Name - Clean & Bold */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="space-y-1"
            >
              <motion.h1
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%]"
              >
                NareshPM
              </motion.h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-white">
                Murugadass
              </h1>
            </motion.div>

            {/* Role - Clean Badge Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90">
                MERN Full Stack Developer
              </h2>
            </motion.div>

            {/* Quote - Clean & Elegant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative max-w-2xl"
            >

              <p className="text-gray-300/90 text-base sm:text-lg leading-relaxed">
                <span className="text-violet-400 text-2xl">"</span>
                I don't just build websites — I build scalable systems, clean UI
                experiences, and production-ready full-stack applications.
                <span className="text-violet-400 text-2xl">"</span>
              </p>

            </motion.div>

            {/* CTA Buttons - Clean Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/25"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
                <span className="relative flex items-center gap-2">
                  View Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                href="#contactme"
                className="px-8 py-3.5 rounded-full border-2 border-violet-400/40 text-white font-semibold backdrop-blur-sm hover:border-violet-400/80 transition-all"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* ===== TECH STACK MARQUEE - SIMPLE & CLEAN ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="w-full mt-12 overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-sm py-3"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First Set */}
          {[
            "Node.js",
            "Express.js",
            "MongoDB",
            "Socket.io",
            "Node Cron",
            "REST API",
            "Postman",
            "Git & GitHub",
            "Deploy",
            "Clean Code",
          ].map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, color: "#a78bfa" }}
              className="
                  mx-8 text-sm md:text-base
                  font-medium
                  text-gray-400 hover:text-violet-300
                  tracking-wider
                  cursor-default
                  transition-all
                "
            >
              {item}
            </motion.span>
          ))}

          {/* Duplicate for seamless loop */}
          {[
            "Node.js",
            "Express.js",
            "MongoDB",
            "Socket.io",
            "Node Cron",
            "REST API",
            "Postman",
            "Git & GitHub",
            "Deploy",
            "Clean Code",
          ].map((item, i) => (
            <motion.span
              key={"dup" + i}
              whileHover={{ scale: 1.1, color: "#a78bfa" }}
              className="
                  mx-8 text-sm md:text-base
                  font-medium
                  text-gray-400 hover:text-violet-300
                  tracking-wider
                  cursor-default
                  transition-all
                "
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Home;