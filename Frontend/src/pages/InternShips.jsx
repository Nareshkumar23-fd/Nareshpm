import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ApartmentOutlined,
  RocketOutlined,
  ApiOutlined,
  CodeOutlined,
} from "@ant-design/icons";

const internships = [
  {
    company: "Beleaf Technologies",
    role: "MERN Stack Developer Trainee",
    type: "Blockchain / CRM Company",
    desc: "Worked on CRM systems and WhatsApp chatbot integrations in a blockchain-focused environment.",
    points: [
      "Built REST APIs for CRM modules",
      "WhatsApp chatbot workflow integration",
      "Improved backend performance",
      "Learned blockchain architecture basics",
    ],
    tech: ["MERN", "Node", "MongoDB", "JWT"],
  },
  {
    company: "Askeva",
    role: "MERN Stack Developer",
    type: "Product Based Company",
    desc: "Worked on scalable full-stack applications with strong focus on UI and backend integration.",
    points: [
      "Built CRUD full-stack apps",
      "Integrated React with REST APIs",
      "Authentication system implementation",
      "Improved UI responsiveness",
    ],
    tech: ["React", "Node", "Express", "Redux"],
  },
];

const InternShips = () => {
  const [active, setActive] = useState(0);
  const data = internships[active];

  return (
    <section
      id="internships"
      className="relative w-full min-h-screen bg-white dark:bg-[#0F0F14] py-20 overflow-hidden"
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <div className="text-center relative z-10 mb-14">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Experience
        </h2>
        <p className="text-gray-500 mt-3">
          Internship Command Center • Real-world Development
        </p>
      </div>

      {/* MAIN DASHBOARD */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 grid lg:grid-cols-12 gap-6">

        {/* LEFT TIMELINE */}
        <div className="lg:col-span-3 space-y-6">
          {internships.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                w-full text-left p-4 rounded-xl transition
                border
                ${
                  active === i
                    ? "bg-violet-600 text-white border-violet-400"
                    : "bg-white/5 text-gray-400 border-violet-500/20 hover:border-violet-400"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <ApartmentOutlined />
                <span className="text-sm font-medium">{item.company}</span>
              </div>
              <p className="text-xs mt-1 opacity-70">{item.role}</p>
            </button>
          ))}
        </div>

        {/* CENTER ACTIVE CARD */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 rounded-2xl p-8 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-violet-500/20"
        >
          <span className="text-xs text-violet-500 px-3 py-1 border border-violet-500/20 rounded-full">
            {data.type}
          </span>

          <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
            {data.company}
          </h3>

          <p className="text-violet-500 text-sm mt-1">{data.role}</p>

          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {data.desc}
          </p>

          <div className="mt-6 space-y-3">
            {data.points.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm text-gray-300">
                <RocketOutlined className="text-violet-500 mt-1" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-3 space-y-6">

          {/* TECH STACK */}
          <div className="p-5 rounded-xl bg-white/5 border border-violet-500/20">
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <CodeOutlined className="text-violet-500" />
              Tech Stack
            </h4>

            <div className="flex flex-wrap gap-2">
              {data.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* HIGHLIGHT BOX */}
          <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <h4 className="text-violet-400 font-semibold text-sm">
              Experience Highlight
            </h4>
            <p className="text-xs text-gray-400 mt-2">
              Real production-level exposure in MERN ecosystem with API design,
              authentication systems, and scalable backend workflows.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InternShips;