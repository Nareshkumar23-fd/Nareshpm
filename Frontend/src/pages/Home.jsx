import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex flex-col
        bg-white dark:bg-[#0F0F14]
        pt-24
        px-6 md:px-12 lg:px-20 xl:px-8
      "
    >
      {/* MAIN CONTENT */}
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center flex-1">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-violet-600 font-medium text-lg">
            Hello, I'm
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Naresh Murugadass
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-violet-600">
            MERN Full Stack Developer
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg max-w-xl">
            “I don’t just build websites — I build scalable systems, clean UI
            experiences, and production-ready full-stack applications.”
          </p>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap pt-2">
            <a
              href="#projects"
              className="
                px-6 py-3 rounded-full
                bg-gradient-to-r from-violet-600 to-purple-500
                text-white font-medium
                shadow-lg shadow-violet-500/30
                hover:scale-105 transition
              "
            >
              🚀 View Work
            </a>

            <a
              href="#contactme"
              className="
                px-6 py-3 rounded-full
                border border-violet-500
                text-violet-600 dark:text-violet-300
                hover:bg-violet-600 hover:text-white
                transition
              "
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          {/* Glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-violet-600 to-purple-500 blur-3xl opacity-20 rounded-3xl"></div>

          {/* IMAGE */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-violet-500/20">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900"
              alt="developer"
              className="w-full h-[450px] object-cover"
            />

            <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md p-5 text-white">
              <h3 className="text-lg font-semibold">
                Building Scalable Web Applications
              </h3>
              <p className="text-sm text-gray-200">
                MERN Stack • Clean UI • High Performance
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MARQUEE (OUTSIDE GRID - FIXED) */}
      <div className="w-full mt-12 overflow-hidden border-t border-violet-500/20 bg-white/40 dark:bg-[#0F0F14]/60 backdrop-blur-xl">

        <div className="flex animate-marquee whitespace-nowrap py-4">

          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
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
            <span
              key={i}
              className="
                mx-6 text-sm md:text-base
                font-medium
                text-violet-600 dark:text-violet-400
                tracking-wide
              "
            >
              ⚡ {item}
            </span>
          ))}

          {/* duplicate */}
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
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
            <span
              key={"dup" + i}
              className="
                mx-6 text-sm md:text-base
                font-medium
                text-violet-600 dark:text-violet-400
                tracking-wide
              "
            >
              ⚡ {item}
            </span>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Home;