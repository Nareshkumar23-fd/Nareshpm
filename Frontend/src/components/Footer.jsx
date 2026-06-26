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
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ToolOutlined,
  MobileOutlined,
  SafetyOutlined,
  GlobalOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

const techStack = [
  { name: "React.js", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-emerald-500" },
  { name: "Express.js", icon: "🚀", color: "from-gray-400 to-gray-600" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-emerald-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-500 to-blue-600" },
  { name: "Socket.io", icon: "🔌", color: "from-gray-500 to-gray-700" },
  { name: "JavaScript", icon: "🟡", color: "from-yellow-400 to-yellow-600" },
  { name: "TypeScript", icon: "🔵", color: "from-blue-500 to-blue-700" },
  { name: "Redux", icon: "🔄", color: "from-purple-500 to-pink-500" },
  { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-900" },
  { name: "Docker", icon: "🐳", color: "from-blue-400 to-blue-600" },
  { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500" },
];

const quickLinks = [
  { name: "Home", href: "#home", icon: <HomeOutlined /> },
  { name: "Skills", href: "#skills", icon: <CodeOutlined /> },
  { name: "Projects", href: "#projects", icon: <AppstoreOutlined /> },
  { name: "Education", href: "#education", icon: <BookOutlined /> },
  { name: "AOI", href: "#aoi", icon: <AreaChartOutlined /> },
  { name: "Internships", href: "#internships", icon: <RocketOutlined /> },
  { name: "ContactME", href: "#contactme", icon: <ContactsOutlined /> },
];

const expertise = [
  { name: "Frontend Development", icon: <MobileOutlined />, desc: "React, Next.js, Tailwind" },
  { name: "Backend Development", icon: <DatabaseOutlined />, desc: "Node.js, Express, APIs" },
  { name: "Database Management", icon: <CloudOutlined />, desc: "MongoDB, SQL, Firebase" },
  { name: "DevOps & Tools", icon: <ToolOutlined />, desc: "Docker, AWS, Git" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-[#0F0F14] border-t border-violet-500/10">

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(124,58,237,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124,58,237,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "moveGrid 15s linear infinite",
          }}
        />
      </div>

      <style>
        {`
          @keyframes moveGrid {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
        `}
      </style>

      {/* CONTENT */}
      <div className="relative z-10 w-full  mx-auto px-6 md:px-12 lg:px-20 py-16">

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">

          {/* BRAND SECTION */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                  Naresh
                </span>
                <span className="text-violet-500">.dev</span>
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                MERN Stack Developer passionate about building scalable,
                real-time applications with modern UI/UX and robust backend architecture.
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all duration-300">
                      <span className="text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                        <span className="text-violet-500">{item.icon}</span>
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition flex items-center gap-2 group"
                  >
                    <span className="text-violet-400 opacity-0 group-hover:opacity-100 transition">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* TECH STACK */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 8).map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <span className="
                    text-xs px-3 py-1.5 rounded-full
                    bg-gradient-to-r bg-violet-500/10
                    border border-violet-500/20
                    text-violet-600 dark:text-violet-400
                    hover:bg-violet-500/20 hover:border-violet-500/40
                    hover:scale-105 transition-all duration-300
                    flex items-center gap-1.5
                  ">
                    <span>{tech.icon}</span>
                    {tech.name}
                  </span>
                </motion.span>
              ))}
            </div>
            <div className="mt-3">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                + {techStack.length - 8} more technologies
              </span>
            </div>
          </div>

          {/* CONTACT & SOCIAL */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Connect
            </h3>

            {/* Email */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                <MailOutlined />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                <a
                  href="mailto:nareshmurugadass71@gmail.com"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-violet-500 transition"
                >
                  nareshmurugadass71@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                <GlobalOutlined />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Location</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Madurai, Tamil Nadu</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <GithubOutlined />, url: "https://github.com/naresh-dev", label: "GitHub" },
                { icon: <LinkedinOutlined />, url: "https://linkedin.com/in/naresh-dev", label: "LinkedIn" },
                { icon: <TwitterOutlined />, url: "https://twitter.com/naresh-dev", label: "Twitter" },
                { icon: <InstagramOutlined />, url: "https://instagram.com/naresh-dev", label: "Instagram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-violet-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} <span className="text-violet-500 font-medium">Naresh.dev</span> — All rights reserved
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <span>Built with ❤️ using</span>
            <span className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-500">React</span>
              <span className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-500">Tailwind</span>
              <span className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-500">Framer</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;