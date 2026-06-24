import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const interests = [
  "Building MERN Stack Applications 💻",
  "Designing Clean UI with React + Tailwind 🎨",
  "REST API Development & Backend Architecture ⚙️",
  "Authentication Systems (JWT, OAuth) 🔐",
  "Real-time Apps using Socket.io ⚡",
  "Database Design (MongoDB & SQL) 🗄️",
  "Deployment using Vercel & Render 🚀",
  "Writing Clean & Scalable Code 🧠",
];

const AOI = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = interests[index];

    const typing = setTimeout(() => {
      setText(current.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex === current.length) {
        setTimeout(() => {
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % interests.length);
          setText("");
        }, 1200);
      }
    }, 45);

    return () => clearTimeout(typing);
  }, [charIndex, index]);

  return (
    <section
      id="aoi"
      className="relative w-full min-h-screen bg-white dark:bg-[#0F0F14] py-24 overflow-hidden"
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 mb-12 px-6"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Areas of Interest
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Developer mindset • Skills • Focus areas
        </p>
      </motion.div>

      {/* GRID LAYOUT */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: STATIC GRID CARDS */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {interests.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-5 rounded-2xl
                bg-white/5 dark:bg-white/5
                border border-violet-500/10
                hover:border-violet-500/40
                hover:shadow-[0_0_25px_rgba(124,58,237,0.2)]
                transition duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">▹</span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: LIVE TYPING DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden border border-violet-500/20 bg-black/80 shadow-2xl"
          >
            {/* TOP BAR */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-violet-500/20">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>

              <p className="ml-4 text-xs text-gray-400">
                dev@naresh:~/focus
              </p>
            </div>

            {/* TERMINAL CONTENT */}
            <div className="p-6 md:p-8">
              <p className="text-violet-400 text-xs mb-3">
                active-focus --live
              </p>

              <p className="text-white text-lg md:text-xl font-mono min-h-[80px] leading-relaxed">
                {text}
                <span className="animate-pulse text-violet-500">|</span>
              </p>

              {/* MINI STATS */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <p className="text-violet-400 text-xs">Focus Areas</p>
                  <p className="text-white text-lg font-bold">8+</p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <p className="text-violet-400 text-xs">Stack</p>
                  <p className="text-white text-lg font-bold">MERN</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AOI;