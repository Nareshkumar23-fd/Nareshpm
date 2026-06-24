import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const ContactMe = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent 🚀");
  };

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-[#0F0F14] overflow-hidden" id="contactme">

      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <div className="text-center relative z-10 pt-20 px-6">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
          Contact Me
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Clean Developer Contact Dashboard 🚀
        </p>
      </div>

      {/* GRID */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 mt-14 grid lg:grid-cols-2 gap-10">

        {/* 🔥 LEFT PANEL (FIXED VISIBILITY) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="p-8 rounded-2xl
          bg-[#0d1117]
          border border-[#30363d]
          shadow-2xl"
        >
          <h3 className="text-white text-2xl font-semibold mb-6">
            Developer Profile
          </h3>

          <div className="space-y-5 text-gray-300 text-sm">

            <div className="flex items-center gap-3">
              <EnvironmentOutlined className="text-violet-500 text-lg" />
              <span>Madurai, Tamil Nadu</span>
            </div>

            <div className="flex items-center gap-3">
              <MailOutlined className="text-violet-500 text-lg" />
              <span className="break-all">
                nareshmurugadass71@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <PhoneOutlined className="text-violet-500 text-lg" />
              <span>7904553714</span>
            </div>

            <div className="flex items-center gap-3">
              <GithubOutlined className="text-violet-500 text-lg" />
              <span>github.com/Nareshkumar23-fd</span>
            </div>

            <div className="flex items-center gap-3">
              <LinkedinOutlined className="text-violet-500 text-lg" />
              <span>linkedin.com/in/nareshpm</span>
            </div>
          </div>

          {/* CODE STYLE BOX */}
          <div className="mt-8 p-4 rounded-xl bg-black border border-[#30363d] font-mono text-xs text-green-400">
            <p>const role = "MERN Developer";</p>
            <p>const focus = "Clean Architecture";</p>
            <p>const status = "Open to Work 🚀";</p>
            <p className="text-violet-400 animate-pulse">
              // ready for collaboration
            </p>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl"
        >

          {/* TOP BAR */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            <p className="ml-4 text-xs text-gray-400">
              contact-form.jsx
            </p>
          </div>

          {/* FORM BODY */}
          <div className="p-8 bg-[#0d1117] space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-[#161b22] text-white border border-[#30363d] focus:border-violet-500 outline-none"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#161b22] text-white border border-[#30363d] focus:border-violet-500 outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg bg-[#161b22] text-white border border-[#30363d] focus:border-violet-500 outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-white font-medium hover:scale-[1.02] transition shadow-lg shadow-violet-500/30"
            >
              Send Message 🚀
            </button>
          </div>
        </motion.form>

      </div>
    </section>
  );
};

export default ContactMe;