import React from "react";
import {
  useGetAllUsersQuery,
  useGetAllSkillsQuery,
  useGetAllEducationQuery,
  useGetAllExperienceQuery,
  useGetAllProjectQuery,
} from "../../redux/apis/Apis";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Design Tokens — Light Purple Theme ───────────────────────────
const tokens = {
  bg: "#F5F3FF",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "#E4DAFF",
  primary: "#7C3AED",
  accent: "#9333EA",
  highlight: "#A855F7",
  textPrimary: "#1E0A3C",
  textMuted: "#6B5B8E",
  textDim: "#A899C0",
  bannerFrom: "#7C3AED",
  bannerTo: "#A855F7",
};

const COLORS = ["#7C3AED", "#9333EA", "#A855F7", "#C084FC", "#6D28D9"];

// ─── Styles ────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: tokens.bg,
    padding: "28px 32px",
    fontFamily: "'Inter', 'Space Grotesk', sans-serif",
    color: tokens.textPrimary,
    boxSizing: "border-box",
  },

  // Welcome Banner
  welcomeBanner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    padding: "32px 36px",
    marginBottom: 28,
    background: `linear-gradient(135deg, ${tokens.bannerFrom} 0%, ${tokens.bannerTo} 100%)`,
    boxShadow: "0 8px 32px rgba(124, 58, 237, 0.28)",
  },
  bannerMesh: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 340,
    height: "100%",
    background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 65%)",
    pointerEvents: "none",
  },
  bannerCircle: {
    position: "absolute",
    bottom: -40,
    left: "25%",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    pointerEvents: "none",
  },
  bannerCircle2: {
    position: "absolute",
    top: -30,
    right: "15%",
    width: 130,
    height: 130,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    pointerEvents: "none",
  },
  bannerEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.85)",
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 6,
    padding: "4px 10px",
    marginBottom: 14,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    color: "#FFFFFF",
    margin: "0 0 4px 0",
    letterSpacing: "-0.02em",
  },
  bannerMeta: {
    display: "flex",
    gap: 28,
    marginTop: 18,
    flexWrap: "wrap",
  },
  bannerMetaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  bannerMetaLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
  },
  bannerMetaValue: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255,255,255,0.9)",
  },
  roleBadge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tokens.primary,
    background: "#FFFFFF",
    borderRadius: 4,
    padding: "2px 9px",
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: tokens.textDim,
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    background: `linear-gradient(90deg, ${tokens.cardBorder}, transparent)`,
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 14,
    marginBottom: 28,
  },
  statCard: {
    position: "relative",
    background: tokens.card,
    border: `1px solid ${tokens.cardBorder}`,
    borderRadius: 14,
    padding: "20px 20px 18px",
    overflow: "hidden",
    cursor: "default",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
  },
  statTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: "14px 14px 0 0",
  },
  statBgBlob: {
    position: "absolute",
    bottom: -16,
    right: -16,
    width: 72,
    height: 72,
    borderRadius: "50%",
    opacity: 0.06,
    pointerEvents: "none",
  },
  statIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: tokens.textDim,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    color: tokens.textPrimary,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
  statSub: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: 500,
  },

  // Charts
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  chartCard: {
    background: tokens.card,
    border: `1px solid ${tokens.cardBorder}`,
    borderRadius: 14,
    padding: "24px 24px 20px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: tokens.textPrimary,
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "-0.01em",
  },
  chartBadge: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tokens.primary,
    background: "rgba(124,58,237,0.08)",
    border: "1px solid rgba(124,58,237,0.18)",
    borderRadius: 4,
    padding: "3px 8px",
  },

  // Legend
  legendWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    paddingLeft: 8,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  legendName: {
    flex: 1,
    fontSize: 12,
    color: tokens.textMuted,
  },
  legendVal: {
    fontSize: 13,
    fontWeight: 700,
    color: tokens.textPrimary,
    fontFamily: "'Space Grotesk', sans-serif",
  },
};

// ─── Responsive Styles ────────────────────────────────────────────
const responsiveStyles = {
  // Mobile styles (max-width: 768px)
  mobile: {
    root: {
      padding: "16px 12px",
    },
    welcomeBanner: {
      padding: "24px 20px",
      marginBottom: 20,
    },
    bannerTitle: {
      fontSize: 20,
    },
    bannerMeta: {
      gap: 16,
      marginTop: 14,
    },
    bannerMetaValue: {
      fontSize: 12,
    },
    statsGrid: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 10,
      marginBottom: 20,
    },
    statCard: {
      padding: "14px 14px 12px",
      borderRadius: 12,
    },
    statIconWrap: {
      width: 32,
      height: 32,
      marginBottom: 10,
    },
    statLabel: {
      fontSize: 9,
    },
    statNumber: {
      fontSize: 24,
    },
    statSub: {
      fontSize: 9,
    },
    chartsGrid: {
      gridTemplateColumns: "1fr",
      gap: 14,
    },
    chartCard: {
      padding: "16px 16px 14px",
      borderRadius: 12,
    },
    chartTitle: {
      fontSize: 14,
    },
    chartBadge: {
      fontSize: 9,
      padding: "2px 6px",
    },
    legendWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingLeft: 0,
      paddingTop: 10,
      gap: 6,
    },
    legendRow: {
      width: "45%",
      gap: 6,
    },
    legendDot: {
      width: 7,
      height: 7,
    },
    legendName: {
      fontSize: 11,
    },
    legendVal: {
      fontSize: 12,
    },
    sectionLabel: {
      fontSize: 10,
    },
    roleBadge: {
      fontSize: 10,
      padding: "2px 8px",
    },
    bannerEyebrow: {
      fontSize: 10,
      padding: "3px 8px",
      marginBottom: 12,
    },
  }
};

// ─── Custom Tooltip ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#FFFFFF",
        border: `1px solid ${tokens.cardBorder}`,
        borderRadius: 10,
        padding: "10px 16px",
        boxShadow: "0 8px 24px rgba(124,58,237,0.14)",
      }}>
        <p style={{ margin: 0, fontSize: 10, color: tokens.textDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: tokens.primary }}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// ─── Icons ─────────────────────────────────────────────────────────
const icons = {
  users: (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  skills: (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  education: (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  experience: (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  projects: (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
};

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, loading, isMobile }) => (
  <div
    style={{
      ...styles.statCard,
      ...(isMobile ? responsiveStyles.mobile.statCard : {}),
    }}
    onMouseEnter={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 12px 28px rgba(124,58,237,0.14)`;
      }
    }}
    onMouseLeave={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(124,58,237,0.06)";
      }
    }}
  >
    <div style={{ ...styles.statTopBar, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
    <div style={{ ...styles.statBgBlob, background: color }} />
    <div style={{ 
      ...styles.statIconWrap, 
      ...(isMobile ? responsiveStyles.mobile.statIconWrap : {}),
      background: `${color}14` 
    }}>
      {icon}
    </div>
    <div style={{ 
      ...styles.statLabel, 
      ...(isMobile ? responsiveStyles.mobile.statLabel : {}) 
    }}>
      {label}
    </div>
    <div style={{ 
      ...styles.statNumber, 
      ...(isMobile ? responsiveStyles.mobile.statNumber : {}) 
    }}>
      {loading ? "..." : value}
    </div>
    <div style={{ 
      ...styles.statSub, 
      ...(isMobile ? responsiveStyles.mobile.statSub : {}),
      color 
    }}>
      Total records
    </div>
  </div>
);

// ─── Dashboard ─────────────────────────────────────────────────────
const DashBoard = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Check if mobile
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all data using RTK Query hooks
  const {
    data: users,
    isLoading: usersLoading
  } = useGetAllUsersQuery();

  const {
    data: skills,
    isLoading: skillsLoading
  } = useGetAllSkillsQuery();

  const {
    data: education,
    isLoading: educationLoading
  } = useGetAllEducationQuery();

  const {
    data: experience,
    isLoading: experienceLoading
  } = useGetAllExperienceQuery();

  const {
    data: projects,
    isLoading: projectsLoading
  } = useGetAllProjectQuery();

  const usersCount = users?.users?.length || 0;
  const skillsCount = skills?.skills?.length || 0;
  const eduCount = education?.educations?.length || 0;
  const expCount = experience?.experiences?.length || 0;
  const projectCount = projects?.data?.length || 0;

  const isLoading = usersLoading || skillsLoading || educationLoading ||
    experienceLoading || projectsLoading;

  const chartData = [
    { name: "Users", value: usersCount },
    { name: "Skills", value: skillsCount },
    { name: "Education", value: eduCount },
    { name: "Experience", value: expCount },
    { name: "Projects", value: projectCount },
  ];

  const statCards = [
    {
      label: "Users",
      value: usersCount,
      icon: icons.users(COLORS[0]),
      color: COLORS[0],
      loading: usersLoading
    },
    {
      label: "Skills",
      value: skillsCount,
      icon: icons.skills(COLORS[1]),
      color: COLORS[1],
      loading: skillsLoading
    },
    {
      label: "Education",
      value: eduCount,
      icon: icons.education(COLORS[2]),
      color: COLORS[2],
      loading: educationLoading
    },
    {
      label: "Experience",
      value: expCount,
      icon: icons.experience(COLORS[3]),
      color: COLORS[3],
      loading: experienceLoading
    },
    {
      label: "Projects",
      value: projectCount,
      icon: icons.projects(COLORS[4]),
      color: COLORS[4],
      loading: projectsLoading
    },
  ];

  // Apply mobile styles conditionally
  const rootStyle = {
    ...styles.root,
    ...(isMobile ? responsiveStyles.mobile.root : {})
  };

  const welcomeBannerStyle = {
    ...styles.welcomeBanner,
    ...(isMobile ? responsiveStyles.mobile.welcomeBanner : {})
  };

  const bannerTitleStyle = {
    ...styles.bannerTitle,
    ...(isMobile ? responsiveStyles.mobile.bannerTitle : {})
  };

  const bannerMetaStyle = {
    ...styles.bannerMeta,
    ...(isMobile ? responsiveStyles.mobile.bannerMeta : {})
  };

  const bannerMetaValueStyle = {
    ...styles.bannerMetaValue,
    ...(isMobile ? responsiveStyles.mobile.bannerMetaValue : {})
  };

  const statsGridStyle = {
    ...styles.statsGrid,
    ...(isMobile ? responsiveStyles.mobile.statsGrid : {})
  };

  const chartsGridStyle = {
    ...styles.chartsGrid,
    ...(isMobile ? responsiveStyles.mobile.chartsGrid : {})
  };

  const chartCardStyle = {
    ...styles.chartCard,
    ...(isMobile ? responsiveStyles.mobile.chartCard : {})
  };

  const chartTitleStyle = {
    ...styles.chartTitle,
    ...(isMobile ? responsiveStyles.mobile.chartTitle : {})
  };

  const chartBadgeStyle = {
    ...styles.chartBadge,
    ...(isMobile ? responsiveStyles.mobile.chartBadge : {})
  };

  const sectionLabelStyle = {
    ...styles.sectionLabel,
    ...(isMobile ? responsiveStyles.mobile.sectionLabel : {})
  };

  const roleBadgeStyle = {
    ...styles.roleBadge,
    ...(isMobile ? responsiveStyles.mobile.roleBadge : {})
  };

  const bannerEyebrowStyle = {
    ...styles.bannerEyebrow,
    ...(isMobile ? responsiveStyles.mobile.bannerEyebrow : {})
  };

  const legendWrapStyle = {
    ...styles.legendWrap,
    ...(isMobile ? responsiveStyles.mobile.legendWrap : {})
  };

  const legendRowStyle = {
    ...styles.legendRow,
    ...(isMobile ? responsiveStyles.mobile.legendRow : {})
  };

  const legendDotStyle = {
    ...styles.legendDot,
    ...(isMobile ? responsiveStyles.mobile.legendDot : {})
  };

  const legendNameStyle = {
    ...styles.legendName,
    ...(isMobile ? responsiveStyles.mobile.legendName : {})
  };

  const legendValStyle = {
    ...styles.legendVal,
    ...(isMobile ? responsiveStyles.mobile.legendVal : {})
  };

  return (
    <div style={rootStyle}>

      {/* ── Welcome Banner ── */}
      <div style={welcomeBannerStyle}>
        <div style={styles.bannerMesh} />
        <div style={styles.bannerCircle} />
        <div style={styles.bannerCircle2} />
        <div style={bannerEyebrowStyle}>
          <span>●</span> Admin Dashboard
        </div>
        <h2 style={bannerTitleStyle}>
          Welcome back, {user?.name || "User"} 👋
        </h2>
        <div style={bannerMetaStyle}>
          <div style={styles.bannerMetaItem}>
            <span style={styles.bannerMetaLabel}>Email</span>
            <span style={bannerMetaValueStyle}>{user?.email || "—"}</span>
          </div>
          <div style={styles.bannerMetaItem}>
            <span style={styles.bannerMetaLabel}>Role</span>
            <span style={roleBadgeStyle}>{user?.role || "—"}</span>
          </div>
          <div style={styles.bannerMetaItem}>
            <span style={styles.bannerMetaLabel}>Status</span>
            <span style={{ ...bannerMetaValueStyle, color: "#86EFAC", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#86EFAC", display: "inline-block" }} />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* ── Section: Overview ── */}
      <div style={sectionLabelStyle}>
        Overview
        <div style={styles.sectionLine} />
      </div>

      {/* ── Stats Grid ── */}
      <div style={statsGridStyle}>
        {statCards.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            color={s.color}
            loading={s.loading}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* ── Section: Analytics ── */}
      <div style={{ ...sectionLabelStyle, marginTop: 4 }}>
        Analytics
        <div style={styles.sectionLine} />
      </div>

      {/* ── Charts ── */}
      <div style={chartsGridStyle}>

        {/* Bar Chart */}
        <div style={chartCardStyle}>
          <div style={styles.chartHeader}>
            <span style={chartTitleStyle}>Overview</span>
            <span style={chartBadgeStyle}>Bar Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={isMobile ? 220 : 260}>
            <BarChart data={chartData} barSize={isMobile ? 24 : 30}>
              <XAxis
                dataKey="name"
                tick={{ fill: tokens.textDim, fontSize: isMobile ? 9 : 11, fontFamily: "Inter" }}
                axisLine={{ stroke: tokens.cardBorder }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: tokens.textDim, fontSize: isMobile ? 9 : 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 'auto']}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124,58,237,0.05)" }} />
              <Bar dataKey="value" radius={[isMobile ? 4 : 6, isMobile ? 4 : 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div style={chartCardStyle}>
          <div style={styles.chartHeader}>
            <span style={chartTitleStyle}>Distribution</span>
            <span style={chartBadgeStyle}>Donut Chart</span>
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <ResponsiveContainer width={isMobile ? "100%" : "55%"} height={isMobile ? 200 : 260}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={isMobile ? 45 : 62}
                  outerRadius={isMobile ? 70 : 105}
                  paddingAngle={isMobile ? 2 : 3}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={legendWrapStyle}>
              {chartData.map((item, i) => (
                <div key={item.name} style={legendRowStyle}>
                  <div style={{ ...legendDotStyle, background: COLORS[i] }} />
                  <span style={legendNameStyle}>{item.name}</span>
                  <span style={legendValStyle}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashBoard;