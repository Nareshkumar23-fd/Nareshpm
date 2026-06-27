import React, { useState } from "react";
import { Dropdown, Badge } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  ProfileOutlined,
  BellOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { HiMenuAlt2 } from "react-icons/hi";


const NavBar = ({
  collapsed,
  setCollapsed,
  setMobileOpen,
  isMobile,
}) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const userMenuItems = [
    { key: "1", icon: <ProfileOutlined />, label: "Profile" },
    { key: "2", icon: <SettingOutlined />, label: "Settings" },
    { key: "3", icon: <LogoutOutlined />, label: "Logout" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 h-16 px-4 flex items-center justify-between z-50 shadow-sm transition-all duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      style={{
        left: isMobile ? 0 : collapsed ? 80 : 250,
        width: isMobile
          ? "100%"
          : `calc(100% - ${collapsed ? 80 : 250}px)`,
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl"
            style={{ color: "#a855f7" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileOpen(true)}
            className="text-2xl"
            style={{ color: "#a855f7" }}
          >
            <HiMenuAlt2 />
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* THEME TOGGLE */}
        <button onClick={toggleTheme} className="text-xl cursor-pointer">
          {dark ? (
            <MoonOutlined style={{ color: "#a855f7" }} />
          ) : (
            <SunOutlined style={{ color: "#a855f7" }} />
          )}
        </button>

        {/* NOTIFICATION (PURPLE ONLY) */}
        {/* NOTIFICATION (WITH BADGE) */}
        <Badge
          count={5} // dummy count
          style={{
            backgroundColor: "#a855f7",
            color: "#fff",
            boxShadow: "none",
          }}
        >
          <div
            style={{
              color: "#a855f7",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            <BellOutlined />
          </div>
        </Badge>

        {/* USER ICON WITH LIGHT PURPLE BG + CIRCLE */}
        <div
          style={{
            backgroundColor: "#f3e8ff", // light purple
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <UserOutlined style={{ color: "#a855f7", fontSize: 18 }} />
          </Dropdown>
        </div>

        {/* LOGOUT */}
        <LogoutOutlined
          className="text-xl cursor-pointer"
          style={{ color: "#a855f7" }}
        />
      </div>
    </nav>
  );
};

export default NavBar;