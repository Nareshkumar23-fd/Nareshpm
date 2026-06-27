import React, { useState } from "react";
import { Layout, Grid } from "antd";
import { Outlet } from "react-router-dom";

import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import MobileSideBar from "../Components/MobileSideBar";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* Desktop Sidebar (ONLY DESKTOP) */}
      {!isMobile && <SideBar collapsed={collapsed} />}

      {/* Mobile Drawer Sidebar */}
      <MobileSideBar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* RIGHT SIDE WRAPPER */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 250,
          transition: "all 0.2s ease",
        }}
      >

        {/* NAVBAR */}
        <NavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          isMobile={isMobile}
        />

        {/* CONTENT */}
        <Content
          style={{
            marginTop: 64,
            padding: isMobile ? 12 : 24,
            background: "#fff",
            minHeight: "calc(100vh - 64px)",
            borderRadius: isMobile ? 0 : 10,
          }}
        >
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
};

export default DashboardLayout;