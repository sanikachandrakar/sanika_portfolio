import React, { useState, useEffect, useCallback } from "react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const TOKEN_KEY = "admin_token";

// ── Helpers ───────────────────────────────────────────────────────────────────
function saveToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}
function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}
function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }
      const data = await res.json();
      saveToken(data.access_token);
      onLogin();
    } catch {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.loginBg}>
      {/* Background grid decoration */}
      <div style={styles.gridOverlay} />

      <div style={styles.loginCard}>
        {/* Logo / title */}
        <div style={styles.loginHeader}>
          <div style={styles.logoMark}>SC</div>
          <h1 style={styles.loginTitle}>Admin Portal</h1>
          <p style={styles.loginSubtitle}>Sanika Chandrakar · Portfolio</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} id="admin-login-form">
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="admin-password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: "44px" }}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeBtn}
                id="toggle-password-visibility"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox} role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            id="admin-login-submit"
            disabled={loading}
            style={loading ? { ...styles.loginBtn, opacity: 0.7 } : styles.loginBtn}
          >
            {loading ? (
              <span style={styles.spinnerWrap}>
                <span style={styles.spinner} />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/contacts`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) {
        clearToken();
        onLogout();
        return;
      }
      if (!res.ok) throw new Error("Failed to load contacts.");
      const data = await res.json();
      setContacts(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const q = search.toLowerCase();
    if (!q) {
      setFiltered(contacts);
      return;
    }
    setFiltered(
      contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.businessType.toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q)
      )
    );
  }, [search, contacts]);

  function handleLogout() {
    clearToken();
    onLogout();
  }

  const businessTypeColors = {
    startup: "#C9A96E",
    "e-commerce": "#8B7355",
    corporate: "#6E8BA9",
    personal: "#9B8EC9",
    other: "#7A9B8E",
  };

  function getBadgeColor(type) {
    return businessTypeColors[(type || "").toLowerCase()] || "#8B7355";
  }

  return (
    <div style={styles.dashboardBg}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>SC</div>
        <nav style={styles.sidebarNav}>
          <div style={styles.sidebarNavItem}>
            <span style={styles.sidebarIcon}>📨</span>
            <span>Contacts</span>
          </div>
        </nav>
        <div style={styles.sidebarFooter}>
          <button id="admin-logout-btn" onClick={handleLogout} style={styles.logoutBtn}>
            <span>⎋</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        {/* Header */}
        <div style={styles.dashHeader}>
          <div>
            <h2 style={styles.dashTitle}>Contact Submissions</h2>
            <p style={styles.dashSubtitle}>
              {loading ? "Loading…" : `${filtered.length} of ${contacts.length} entries`}
            </p>
          </div>
          <div style={styles.headerActions}>
            <button
              id="admin-refresh-btn"
              onClick={fetchContacts}
              style={styles.refreshBtn}
              title="Refresh"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            id="admin-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, business type, or message…"
            style={styles.searchInput}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={styles.clearSearch}
              id="clear-search-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        {loading && (
          <div style={styles.centerState}>
            <div style={{ ...styles.spinner, width: 36, height: 36, borderWidth: 3 }} />
            <p style={styles.stateText}>Fetching submissions…</p>
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorBox}>
            {error}{" "}
            <button onClick={fetchContacts} style={styles.retryBtn} id="retry-fetch-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={styles.centerState}>
            <div style={styles.emptyIcon}>📭</div>
            <p style={styles.stateText}>
              {search ? "No results match your search." : "No contact submissions yet."}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["#", "Name", "Email", "Phone", "Business Type", "Received", "Message"].map(
                    (h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => (
                  <React.Fragment key={c.id}>
                    <tr
                      style={{
                        ...styles.tr,
                        ...(expandedId === c.id ? styles.trExpanded : {}),
                      }}
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                      id={`contact-row-${c.id}`}
                    >
                      <td style={styles.tdNum}>{idx + 1}</td>
                      <td style={styles.tdName}>{c.name}</td>
                      <td style={styles.td}>
                        <a href={`mailto:${c.email}`} style={styles.emailLink}>
                          {c.email}
                        </a>
                      </td>
                      <td style={styles.td}>{c.phone || "—"}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            background: getBadgeColor(c.businessType) + "22",
                            color: getBadgeColor(c.businessType),
                            borderColor: getBadgeColor(c.businessType) + "55",
                          }}
                        >
                          {c.businessType}
                        </span>
                      </td>
                      <td style={styles.tdDate}>{formatDate(c.timestamp)}</td>
                      <td style={styles.tdMsg}>
                        <span style={styles.msgPreview}>
                          {expandedId === c.id ? "▲ collapse" : c.message.slice(0, 50) + (c.message.length > 50 ? "…" : "")}
                        </span>
                      </td>
                    </tr>
                    {expandedId === c.id && (
                      <tr style={styles.expandRow}>
                        <td colSpan={7} style={styles.expandTd}>
                          <div style={styles.expandContent}>
                            <p style={styles.expandLabel}>Full Message</p>
                            <p style={styles.expandText}>{c.message}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(!!getToken());
  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <LoginScreen onLogin={() => setAuthed(true)} />
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  /* Login */
  loginBg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0f08 0%, #2d1a0e 50%, #1a0f08 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    fontFamily: "'DM Sans', sans-serif",
  },
  gridOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  loginCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,110,0.1)",
    position: "relative",
    zIndex: 1,
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: "36px",
  },
  logoMark: {
    width: "56px",
    height: "56px",
    background: "linear-gradient(135deg, #C9A96E, #8B6914)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#1a0f08",
    boxShadow: "0 8px 24px rgba(201,169,110,0.3)",
  },
  loginTitle: {
    margin: "0 0 4px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#f5efe8",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.02em",
  },
  loginSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(201,169,110,0.7)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(201,169,110,0.8)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#f5efe8",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
  },
  errorBox: {
    background: "rgba(220,38,38,0.12)",
    border: "1px solid rgba(220,38,38,0.3)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#fca5a5",
    fontSize: "14px",
  },
  loginBtn: {
    background: "linear-gradient(135deg, #C9A96E, #8B6914)",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    color: "#1a0f08",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.2s",
    letterSpacing: "0.03em",
    marginTop: "4px",
    boxShadow: "0 8px 24px rgba(201,169,110,0.25)",
  },
  spinnerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(26,15,8,0.3)",
    borderTopColor: "#1a0f08",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },

  /* Dashboard */
  dashboardBg: {
    minHeight: "100vh",
    background: "#0f0a06",
    display: "flex",
    fontFamily: "'DM Sans', sans-serif",
  },
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    background: "rgba(201,169,110,0.04)",
    borderRight: "1px solid rgba(201,169,110,0.12)",
    display: "flex",
    flexDirection: "column",
    padding: "28px 0",
    position: "sticky",
    top: 0,
    flexShrink: 0,
  },
  sidebarLogo: {
    width: "44px",
    height: "44px",
    background: "linear-gradient(135deg, #C9A96E, #8B6914)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 32px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a0f08",
  },
  sidebarNav: {
    flex: 1,
    padding: "0 12px",
  },
  sidebarNavItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "rgba(201,169,110,0.12)",
    color: "#C9A96E",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "default",
  },
  sidebarIcon: {
    fontSize: "18px",
  },
  sidebarFooter: {
    padding: "0 16px",
  },
  logoutBtn: {
    width: "100%",
    background: "rgba(220,38,38,0.1)",
    border: "1px solid rgba(220,38,38,0.25)",
    borderRadius: "10px",
    padding: "11px",
    color: "#fca5a5",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
  mainContent: {
    flex: 1,
    padding: "36px 40px",
    overflowX: "auto",
  },
  dashHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "28px",
    gap: "16px",
    flexWrap: "wrap",
  },
  dashTitle: {
    margin: "0 0 4px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#f5efe8",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.01em",
  },
  dashSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(201,169,110,0.6)",
  },
  headerActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  refreshBtn: {
    background: "rgba(201,169,110,0.1)",
    border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: "8px",
    padding: "9px 18px",
    color: "#C9A96E",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
  searchWrap: {
    position: "relative",
    marginBottom: "24px",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,169,110,0.15)",
    borderRadius: "12px",
    padding: "13px 48px",
    color: "#f5efe8",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
  },
  clearSearch: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "rgba(201,169,110,0.6)",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
  },
  centerState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "16px",
  },
  stateText: {
    color: "rgba(245,239,232,0.4)",
    fontSize: "15px",
    margin: 0,
  },
  emptyIcon: {
    fontSize: "48px",
  },
  retryBtn: {
    background: "none",
    border: "none",
    color: "#C9A96E",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    padding: 0,
    marginLeft: "8px",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "underline",
  },
  tableWrap: {
    overflowX: "auto",
    borderRadius: "14px",
    border: "1px solid rgba(201,169,110,0.12)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },
  th: {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(201,169,110,0.7)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: "rgba(201,169,110,0.06)",
    borderBottom: "1px solid rgba(201,169,110,0.12)",
    whiteSpace: "nowrap",
  },
  tr: {
    cursor: "pointer",
    transition: "background 0.15s",
    borderBottom: "1px solid rgba(201,169,110,0.07)",
  },
  trExpanded: {
    background: "rgba(201,169,110,0.06)",
  },
  td: {
    padding: "14px 18px",
    fontSize: "14px",
    color: "#e8dfd4",
    verticalAlign: "middle",
  },
  tdNum: {
    padding: "14px 18px",
    fontSize: "13px",
    color: "rgba(201,169,110,0.5)",
    fontWeight: "600",
    verticalAlign: "middle",
    width: "40px",
  },
  tdName: {
    padding: "14px 18px",
    fontSize: "14px",
    color: "#f5efe8",
    fontWeight: "600",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  tdDate: {
    padding: "14px 18px",
    fontSize: "13px",
    color: "rgba(245,239,232,0.5)",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  tdMsg: {
    padding: "14px 18px",
    fontSize: "13px",
    color: "rgba(245,239,232,0.6)",
    verticalAlign: "middle",
    maxWidth: "220px",
  },
  msgPreview: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid",
    whiteSpace: "nowrap",
  },
  emailLink: {
    color: "#C9A96E",
    textDecoration: "none",
  },
  expandRow: {
    background: "rgba(201,169,110,0.03)",
  },
  expandTd: {
    padding: 0,
    borderBottom: "1px solid rgba(201,169,110,0.12)",
  },
  expandContent: {
    padding: "20px 24px 24px 60px",
    borderLeft: "3px solid rgba(201,169,110,0.4)",
    margin: "0 18px 0 48px",
    marginBottom: "16px",
  },
  expandLabel: {
    margin: "0 0 8px",
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(201,169,110,0.7)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  expandText: {
    margin: 0,
    fontSize: "14px",
    color: "#e8dfd4",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },
};

// Inject keyframes for spinner animation
const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  #admin-login-form input:focus { border-color: rgba(201,169,110,0.6) !important; }
  #admin-search:focus { border-color: rgba(201,169,110,0.35) !important; }
  tbody tr:hover { background: rgba(201,169,110,0.05) !important; }
`;
document.head.appendChild(styleTag);
