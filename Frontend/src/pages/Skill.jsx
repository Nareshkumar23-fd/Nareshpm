import React from "react";
import { motion } from "framer-motion";
import {
  Html5Outlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
  CodeOutlined,
  ApiOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

const skills = [
  { name: "HTML5", percent: 95, icon: <Html5Outlined /> },
  { name: "CSS3", percent: 92, icon: <BgColorsOutlined /> },
  { name: "Tailwind CSS", percent: 94, icon: <ThunderboltOutlined /> },
  { name: "Bootstrap", percent: 85, icon: <DashboardOutlined /> },

  { name: "JavaScript", percent: 93, icon: <CodeOutlined /> },
  { name: "TypeScript", percent: 78, icon: <CodeOutlined /> },

  { name: "React JS", percent: 90, icon: <ApiOutlined /> },

  { name: "Node JS", percent: 82, icon: <ApiOutlined /> },
  { name: "Express JS", percent: 80, icon: <ApiOutlined /> },

  { name: "MongoDB", percent: 85, icon: <DatabaseOutlined /> },
  { name: "SQL", percent: 75, icon: <DatabaseOutlined /> },

  // ✅ NEW ADDITION
  { name: "Postman (API Testing)", percent: 88, icon: <ApiOutlined /> },

  { name: "Vercel / Render", percent: 88, icon: <DeploymentUnitOutlined /> },
];

const Skill = () => {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen bg-white dark:bg-[#0F0F14] px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
    >
      {/* BACKGROUND GLOW GRID */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Technical Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          MERN Stack • Scalable UI • Production Ready Engineering
        </p>
      </motion.div>

      {/* GRID */}
      <div className="relative z-10 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl backdrop-blur-xl
            bg-white/10 dark:bg-white/5
            border border-violet-500/20
            shadow-lg hover:shadow-violet-500/30
            hover:scale-[1.04] transition duration-300"
          >
            {/* TOP */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl text-violet-500">
                {skill.icon}
              </div>

              <div className="flex justify-between w-full items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>

                <span className="text-sm font-medium text-violet-500">
                  {skill.percent}%
                </span>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-gray-300/20 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 shadow-[0_0_12px_#7c3aed]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skill;