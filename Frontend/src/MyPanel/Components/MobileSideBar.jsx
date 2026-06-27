import { Drawer } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
    DashboardOutlined,
    UserOutlined,
    AppstoreOutlined,
    FolderOpenOutlined,
    MailOutlined,
    SettingOutlined,
    LogoutOutlined,
    BellOutlined,
    StarOutlined,
} from "@ant-design/icons";

const MobileSideBar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        transition: "0.2s",
    };

    const hoverStyle = {
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        color: "#a855f7",
    };

    const menu = [
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/admin/dashboard" },
        { label: "Projects", icon: <AppstoreOutlined />, path: "/admin/projects" },
        { label: "Experience", icon: <FolderOpenOutlined />, path: "/admin/experience" },
        { label: "Notifications", icon: <BellOutlined />, path: "/admin/notifications" },
        { label: "Tech Skills", icon: <SettingOutlined />, path: "/admin/tech-skills" },
        { label: "Contact", icon: <MailOutlined />, path: "/admin/contact" },
        { label: "Education", icon: <StarOutlined />, path: "/admin/education" },
        { label: "Settings", icon: <SettingOutlined />, path: "/admin/settings" },

    ];

    return (
        <Drawer
            placement="left"
            open={open}
            onClose={onClose}
            closable={false}
            width={260}
            bodyStyle={{ padding: 0 }}
        >
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

                {/* LOGO */}
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 600,
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <span style={{ color: "#a855f7" }}>N</span>
                    <span style={{ color: "#000" }}>areshPM</span>
                </div>

                {/* MENU */}
                <div style={{ flex: 1, padding: 8 }}>

                    {menu.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <div
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                                style={{
                                    ...menuItemStyle,
                                    backgroundColor: isActive ? "#a855f7" : "transparent",
                                    color: isActive ? "#fff" : "inherit",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
                                        e.currentTarget.style.color = "#a855f7";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = isActive
                                        ? "#a855f7"
                                        : "transparent";

                                    e.currentTarget.style.color = isActive ? "#fff" : "inherit";
                                }}
                            >
                                {/* ICON */}
                                <span
                                    style={{
                                        color: isActive ? "#fff" : "#a855f7",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {item.icon}
                                </span>

                                {/* LABEL */}
                                {item.label}
                            </div>
                        );
                    })}
                </div>

                {/* LOGOUT */}
                <div
                    style={{
                        borderTop: "1px solid #eee",
                        padding: 12,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            color: "#a855f7",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        <LogoutOutlined />
                        Logout
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default MobileSideBar;