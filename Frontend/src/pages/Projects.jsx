import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GithubOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const projects = [
  {
    title: "Spicy Fried Chicken Landing Page",
    type: "Frontend UI",
    desc: "Modern responsive restaurant landing page built using pure HTML & CSS with mobile-first design.",
    points: [
      "Responsive mobile-first design",
      "Clean UI layout with modern spacing",
      "SEO friendly structure",
    ],
    tech: ["HTML", "CSS"],
    github:
      "https://github.com/Nareshkumar23-fd/Spicy-fried-chicken-landing-using-HTML-and-CSS-only-with-responsive",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "MERN ThinkBoard",
    type: "Full Stack CRUD App",
    desc: "Task management system with complete CRUD operations using MERN stack architecture.",
    points: [
      "Create / Read / Update / Delete operations",
      "REST API architecture",
      "MongoDB database integration",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Nareshkumar23-fd/MERN-ThinkBoard",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "MERN Ecommerce Cart System",
    type: "Ecommerce Full Stack",
    desc: "Full-featured ecommerce cart system with product listing and cart management.",
    points: [
      "Cart management system",
      "Product listing module",
      "State management implementation",
    ],
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com/Nareshkumar23-fd/Ecommerce-Cart-Site",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "MERN Chat Application",
    type: "Realtime Web App",
    desc: "Real-time chat application using Socket.io for instant messaging and communication.",
    points: [
      "Real-time messaging using Socket.io",
      "Instant communication system",
      "Scalable backend architecture",
    ],
    tech: ["React", "Socket.io", "Node.js", "Express"],
    github: "https://github.com/Nareshkumar23-fd/MERN-CHAT-APPLICATION",
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "MERN Authentication System",
    type: "Backend Security",
    desc: "Secure authentication system with JWT, bcrypt and protected routes.",
    points: [
      "JWT authentication system",
      "Password encryption using bcrypt",
      "Protected routes implementation",
    ],
    tech: ["Node.js", "JWT", "MongoDB", "Express"],
    github:
      "https://github.com/Nareshkumar23-fd/MERN-AUTHENTICATION-SYSTEM",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },

  // (Optional: add more from your portfolio)
  {
    title: "Portfolio Website",
    type: "Frontend + UI/UX",
    desc: "Modern developer portfolio built with React, Tailwind CSS and Framer Motion.",
    points: [
      "Animated UI using Framer Motion",
      "Dark/Light theme support",
      "Responsive design system",
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "#",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
];

const ITEMS_PER_PAGE = 2;

const Projects = () => {
  const [page, setPage] = useState(0);

  const start = page * ITEMS_PER_PAGE;
  const selectedProjects = projects.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <section
      id="projects"
      className="relative w-full bg-white dark:bg-[#0F0F14] py-20 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <div className="text-center mb-12 relative z-10 px-6">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <p className="text-gray-500 mt-3">
          Paginated showcase • Clean UI • Real-world builds
        </p>
      </div>

      {/* PROJECT LIST */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 space-y-10">

        {selectedProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-violet-500/20 shadow-lg"
          >

            {/* LEFT SIDE */}
            <div className="p-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex flex-col justify-between">

              <div>

                <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
                  {p.type}
                </span>

                <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                  {p.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {p.desc}
                </p>

                {/* POINTS */}
                <div className="mt-5 space-y-2">
                  {p.points.map((pt, idx) => (
                    <p
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircleOutlined className="text-violet-500 mt-1" />
                      {pt}
                    </p>
                  ))}
                </div>

                {/* TECH */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-violet-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={p.github}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 text-violet-600 dark:text-violet-300 font-medium hover:gap-3 transition"
              >
                View Code <ArrowRightOutlined />
              </a>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative h-72 md:h-auto">
              <img
                src={p.img}
                className="w-full h-full object-cover scale-110 hover:scale-125 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            </div>

          </motion.div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-12 gap-3 relative z-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`
              w-10 h-10 rounded-full border transition
              ${page === i
                ? "bg-violet-600 text-white"
                : "text-violet-500 border-violet-400/30 hover:bg-violet-500/10"
              }
            `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Projects;