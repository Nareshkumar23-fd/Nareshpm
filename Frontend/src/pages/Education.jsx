import React from "react";
import { motion } from "framer-motion";
import { BookOutlined, TrophyOutlined, ReadOutlined } from "@ant-design/icons";

const education = [
  {
    title: "Bachelor of Computer Science (B.Sc CS)",
    institute: "NMS SVN College, Madurai",
    score: "70%",
    icon: <TrophyOutlined />,
    desc: "Graduated with strong foundation in programming, DSA, and web development.",
  },
  {
    title: "HSC (12th - Computer Science)",
    institute: "St Britto Higher Secondary School, Madurai",
    score: "63%",
    icon: <ReadOutlined />,
    desc: "Focused on Computer Science, Mathematics and logical programming basics.",
  },
  {
    title: "SSLC (10th Standard)",
    institute: "St Britto Matriculation School, Madurai",
    score: "67%",
    icon: <BookOutlined />,
    desc: "Completed foundational education with strong academic performance.",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="relative w-full min-h-screen bg-white dark:bg-[#0F0F14] py-24 overflow-hidden"
    >
      {/* 🌌 BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10 px-6"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Academic Journey & Qualifications
        </p>
      </motion.div>

      {/* FULL WIDTH TIMELINE WRAPPER */}
      <div className="relative w-full px-6 md:px-12 lg:px-20">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-gradient-to-b from-violet-500 via-purple-500 to-transparent shadow-[0_0_25px_#7c3aed]" />

        <div className="space-y-20">

          {education.map((item, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center w-full`}
              >

                {/* DOT */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-violet-500 shadow-[0_0_20px_#7c3aed] z-[-10] md:z-20" />

                {/* CARD CONTAINER */}
                <div className={`w-full flex ${isLeft ? "justify-start" : "justify-end"}`}>

                  <div
                    className={`
                      w-full md:w-[42%]
                      p-6 md:p-7
                      rounded-2xl
                      bg-white/70 dark:bg-white/5
                      backdrop-blur-xl
                      border border-violet-500/20
                      shadow-lg hover:shadow-violet-500/30
                      hover:scale-[1.02] transition duration-300
                    `}
                  >

                    {/* TOP */}
                    <div className="flex items-center justify-between mb-3">

                      <div className="flex items-center gap-3">
                        <span className="text-violet-500 text-xl">
                          {item.icon}
                        </span>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>

                      <span className="text-violet-500 font-semibold text-sm">
                        {item.score}
                      </span>
                    </div>

                    {/* INSTITUTE */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.institute}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Education;