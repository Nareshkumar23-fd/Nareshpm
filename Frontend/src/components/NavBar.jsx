import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import {
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
  LoginOutlined,
  HomeOutlined,
  CodeOutlined,
  AppstoreOutlined,
  BookOutlined,
  MailOutlined,
  AreaChartOutlined,
  WechatWorkFilled,
} from "@ant-design/icons";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: <HomeOutlined /> },
    { name: "Skills", href: "#skills", icon: <CodeOutlined /> },
    { name: "Projects", href: "#projects", icon: <AppstoreOutlined /> },
    { name: "Education", href: "#education", icon: <BookOutlined /> },
    { name: "Interships", href: "#internships", icon: <WechatWorkFilled /> },
    { name: "AOI", href: "#aoi", icon: <AreaChartOutlined /> },
    { name: "Contact", href: "#contactme", icon: <MailOutlined /> },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const drawerBg = darkMode
    ? "rgba(15,15,20,0.98)"
    : "rgba(255,255,255,0.98)";

  const textColor = darkMode ? "text-gray-200" : "text-gray-800";

  return (
    <>
      {/* NAVBAR */}
      <nav className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl
        bg-white/70 dark:bg-[#0F0F14]/90
        border-b border-gray-200/40 dark:border-violet-500/20
      ">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 h-20 flex items-center justify-between">

          {/* LOGO */}
          <a href="#home">
            <h1 className="text-3xl font-bold tracking-wide">
              <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                N
              </span>
              aresh
            </h1>
          </a>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10 lg:gap-14">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="
                    relative font-medium
                    text-gray-700 dark:text-gray-300
                    hover:text-violet-600 dark:hover:text-violet-400
                    transition
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-0 after:bg-violet-500
                    hover:after:w-full after:transition-all
                  "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="
                w-11 h-11 rounded-full
                bg-violet-100 dark:bg-violet-900/20
                flex items-center justify-center
                text-violet-700 dark:text-violet-300
                hover:scale-110 transition
              "
            >
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
            </button>

            {/* LOGIN */}
            <button className="
              px-5 py-2.5 rounded-full
              bg-gradient-to-r from-violet-600 to-purple-500
              text-white font-medium
              shadow-lg shadow-violet-500/20
              hover:scale-105 transition
              flex items-center gap-2
            ">
              <LoginOutlined />
              Login
            </button>
          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-violet-600"
          >
            <MenuOutlined />
          </button>
        </div>
      </nav>

      {/* DRAWER */}
      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        width={280}
        closeIcon={false}
        styles={{
          header: {
            background: drawerBg,
            borderBottom: "1px solid rgba(124,58,237,.15)",
          },
          body: {
            background: drawerBg,
          },
        }}
      >
        {/* LINKS */}
        <div className="flex flex-col gap-6">

          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3
                text-lg font-medium
                ${textColor}
                hover:text-violet-500
                hover:translate-x-2
                transition
              `}
            >
              {item.icon}
              {item.name}
            </a>
          ))}

          {/* THEME + LOGIN */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-6">

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-violet-500"
            >
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="
              mt-6 w-full
              flex items-center justify-center gap-2
              py-3 rounded-xl
              bg-gradient-to-r from-violet-600 to-purple-500
              text-white font-medium
            ">
              <LoginOutlined />
              Login
            </button>

          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;