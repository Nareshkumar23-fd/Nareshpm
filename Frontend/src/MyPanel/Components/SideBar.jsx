import React from "react";
import { Layout, Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  NotificationOutlined,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { useLogoutMutation } from "../../redux/apis/Apis.js";
import { message } from "antd";

const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const [logout, { isLoading }] = useLogoutMutation();

  const selectedKey = location.pathname;

  const menuItems = [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/projects", icon: <AppstoreOutlined />, label: "Projects" },
    { key: "/admin/experience", icon: <FolderOpenOutlined />, label: "Experience" },
    { key: "/admin/tech-skills", icon: <SettingOutlined />, label: "Tech Skills" },
    { key: "/admin/contact", icon: <MailOutlined />, label: "Contact" },
    { key: "/admin/education", icon: <StarOutlined />, label: "Education" },
    { key: "/admin/notifications", icon: <NotificationOutlined />, label: "Notifications" },

    {
      key: "/admin/users",
      icon: <UserAddOutlined />,
      label: "User Management",
    },


    { key: "/admin/settings", icon: <SettingOutlined />, label: "Settings" },
  ];


  const handleLogout = async () => {
    try {
      await logout().unwrap();

      localStorage.removeItem("user");
      navigate("/");
      message.success("Logout successfully!")
    } catch (error) {
      message.error("Logout failed");
    }
  };

  return (
    <Sider
      className="hidden md:flex custom-sidebar"
      collapsed={collapsed}
      trigger={null}
      width={250}
      collapsedWidth={80}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        borderRight: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex flex-col h-full w-full">

        {/* LOGO (NORMAL TEXT ONLY) */}
        <h1
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            borderBottom: "1px solid #f0f0f0",
            fontWeight: 400,
          }}
        >
          {collapsed ? (
            <span style={{ color: "#a855f7" }}>N</span>
          ) : (
            <>
              <span style={{ color: "#a855f7" }}>N</span>
              <span style={{ color: "#000" }}>areshPM</span>
            </>
          )}
        </h1>

        {/* MENU */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={(item) => navigate(item.key)}
            className="custom-menu"
          />
        </div>

        {/* LOGOUT */}
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #f0f0f0",
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            loading={isLoading}
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{
              width: "100%",
              background: "#a855f7",
              color: "#fff",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              fontWeight: 600,
            }}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>

      {/* 🔥 MENU ONLY SEMIBOLD */}
      <style jsx>{`
        .custom-menu .ant-menu-item {
          font-weight: 600; /* only menu items semibold */
        }

        .custom-menu .ant-menu-item-selected {
          background-color: #a855f7 !important;
          color: #fff !important;
          border-radius: 8px;
          font-weight: 600;
        }

        .custom-menu .ant-menu-item-selected .anticon {
          color: #fff !important;
        }

        .custom-menu .ant-menu-item:hover {
          background-color: rgba(168, 85, 247, 0.1);
        }
      `}</style>
    </Sider>
  );
};

export default SideBar;