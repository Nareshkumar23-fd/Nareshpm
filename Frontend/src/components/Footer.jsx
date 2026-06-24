import React from "react";
import { motion } from "framer-motion";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  HomeOutlined,
  CodeOutlined,
  AppstoreOutlined,
  BookOutlined,
  RocketOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const techStack = [
  "React",
  "Node",
  "Express",
  "MongoDB",
  "Tailwind",
  "Socket.io",
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-[#0F0F14]">

      {/* 🌌 MOVING CHECKER GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-25 animate-pulse">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(124,58,237,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124,58,237,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
            animation: "moveGrid 12s linear infinite",
          }}
        />
      </div>

      {/* SOFT GLOW LAYER */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent" />

      {/* KEYFRAME STYLE */}
      <style>
        {`
          @keyframes moveGrid {
            0% { transform: translateY(0px); }
            100% { transform: translateY(42px); }
          }
        `}
      </style>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Naresh<span className="text-violet-500">.dev</span>
            </h2>

            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              MERN Stack Developer building scalable systems with modern UI,
              real-time features, and production-grade backend architecture.
            </p>
          </div>

          {/* PAGES */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5 uppercase tracking-wider">
              Pages
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">

              <li><a href="#home" className="hover:text-violet-500 flex items-center gap-2"><HomeOutlined /> Home</a></li>
              <li><a href="#skills" className="hover:text-violet-500 flex items-center gap-2"><CodeOutlined /> Skills</a></li>
              <li><a href="#projects" className="hover:text-violet-500 flex items-center gap-2"><AppstoreOutlined /> Projects</a></li>
              <li><a href="#education" className="hover:text-violet-500 flex items-center gap-2"><BookOutlined /> Education</a></li>
              <li><a href="#aoi" className="hover:text-violet-500 flex items-center gap-2"><AreaChartOutlined /> AOI</a></li>
              <li><a href="#internships" className="hover:text-violet-500 flex items-center gap-2"><RocketOutlined /> Internships</a></li>
              <li><a href="#contactme" className="hover:text-violet-500 flex items-center gap-2"><MailOutlined /> Contact</a></li>

            </ul>
          </div>

          {/* TECH STACK (ANIMATED ONE BY ONE) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5 uppercase tracking-wider">
              Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="text-xs px-3 py-1 rounded-full
                  bg-violet-500/10 text-violet-500
                  border border-violet-500/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5 uppercase tracking-wider">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">

              <p className="flex items-center gap-2">
                <MailOutlined className="text-violet-500" />
                nareshmurugadass71@gmail.com
              </p>

              <p>📍 Madurai, Tamil Nadu</p>

              <div className="flex gap-5 text-xl mt-4 text-gray-700 dark:text-gray-300">

                <a href="https://github.com" className="hover:text-violet-500 transition">
                  <GithubOutlined />
                </a>

                <a href="https://linkedin.com" className="hover:text-violet-500 transition">
                  <LinkedinOutlined />
                </a>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t border-violet-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Naresh.dev — All rights reserved
          </p>

          <p className="text-sm text-gray-500">
            Built with React • Tailwind • Framer Motion
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;