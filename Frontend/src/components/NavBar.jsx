// components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

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
  UserOutlined,
  DownOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

import { assets } from "../Assets/assets";
import SignIn from "./SignIn"; // Import the SignIn component

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

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

  // Resume download function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = assets.resume;
    link.download = "Nareshpm.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // User profile click handler
  const handleUserClick = () => {
    setIsSignInOpen(true);
  };

  const drawerBg = darkMode
    ? "rgba(15,15,20,0.98)"
    : "rgba(255,255,255,0.98)";

  return (
    <>
      {/* NAVBAR */}
      <nav className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl
        bg-white dark:bg-[#0F0F14]/90
        border-b border-gray-200/40 dark:border-violet-500/20
      ">
        <div className="w-full px-6 md:px-8 lg:px-5 xl:px-10 h-17 flex items-center justify-between">

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
          <ul className=" nav-menu items-center gap-10 lg:gap-10 xl:gap-10 md:gap-10 sm:gap-2">
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
          <div className="desktop-actions items-center gap-4">
            {/* USER ICON BUTTON */}
            <button
              onClick={handleUserClick}
              className="
                w-11 h-11 rounded-full
                bg-violet-100 dark:bg-violet-900/20
                flex items-center justify-center
                text-violet-700 dark:text-violet-300
                hover:scale-110 transition
                hover:bg-violet-200 dark:hover:bg-violet-900/40
              "
              aria-label="User profile"
            >
              <UserOutlined className="text-lg" />
            </button>

            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="
                w-11 h-11 rounded-full
                bg-violet-100 dark:bg-violet-900/20
                flex items-center justify-center
                text-violet-700 dark:text-violet-300
                hover:scale-110 transition
                hover:bg-violet-200 dark:hover:bg-violet-900/40
              "
            >
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
            </button>

            {/* DOWNLOAD RESUME BUTTON */}
            <button
              onClick={downloadResume}
              className="
                px-5 py-2.5 rounded-full
                bg-gradient-to-r from-violet-600 to-purple-500
                text-white font-medium
                shadow-lg shadow-violet-500/20
                hover:scale-105 transition
                flex items-center gap-2
              "
            >
              <ArrowDownOutlined />
              Download CV
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mobile-menu-btn text-2xl text-violet-600"
          >
            <HiOutlineMenuAlt3 />
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
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="
                    menu-drawer
                    flex items-center gap-3
                    text-lg font-medium
                    text-violet-600
                    hover:text-violet-700
                    hover:translate-x-2
                    transition
                    relative
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-0
                    after:bg-violet-600
                    hover:after:w-full
                    after:transition-all
                  "
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
            {/* User profile in drawer */}
            <button
              onClick={() => {
                handleUserClick();
                setOpen(false);
              }}
              className="flex font-semibold items-center gap-3 text-violet-500 w-full hover:text-violet-700 transition"
            >
              <UserOutlined />
              SIGN IN
            </button>

            {/* Theme toggle in drawer */}
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="flex font-semibold items-center gap-3 text-violet-500 w-full mt-3 hover:text-violet-700 transition"
            >
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
              {darkMode ? "LIGHT MODE" : "DARK MODE"}
            </button>

            {/* Download button in drawer */}
            <button
              onClick={() => {
                downloadResume();
                setOpen(false);
              }}
              className="
                mt-6 w-full
                flex items-center justify-center gap-2
                py-3 rounded-xl
                bg-gradient-to-r from-violet-600 to-purple-500
                text-white font-medium
                hover:scale-105 transition
              "
            >
              <ArrowDownOutlined />
              Download CV
            </button>
          </div>
        </div>
      </Drawer>

      {/* Sign In Modal */}
      <SignIn 
        open={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </>
  );
};

export default NavBar;