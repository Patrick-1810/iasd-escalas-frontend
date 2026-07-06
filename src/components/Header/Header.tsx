import React, { useState } from "react";
import "./Header.scss";

interface HeaderProps {
  currentRole: "membro" | "admin";
  onRoleChange: (role: "membro" | "admin") => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="container-center header-wrapper">
        <div className="brand-area">
          <div className="logo-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div className="brand-text">
            <h2>IASD Escalas</h2>
            <span>GESTÃO ECLESIÁSTICA</span>
          </div>
        </div>

        <nav className="nav-menu">
          <button className="nav-item active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            Dashboard
          </button>
        </nav>

        <div className="user-profile">
          {/* Badge dinâmica */}
          <span className={`role-badge ${currentRole === "admin" ? "admin-mode" : ""}`} style={{ backgroundColor: currentRole === "admin" ? "#2563eb" : "#f1f5f9", color: currentRole === "admin" ? "#ffffff" : "var(--text-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {currentRole === "admin" ? "ADMIN/LÍDER" : "MEMBRO"}
          </span>

          <div className="profile-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ position: "relative" }}>
            <div className="avatar">{currentRole === "admin" ? "P" : "J"}</div>
            <span className="username">{currentRole === "admin" ? "Pr. Daniel Ancião" : "João Membro"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            
            {/* Menu Dropdown*/}
            {isDropdownOpen && (
              <div className="dropdown-menu-wrapper" style={{ position: "absolute", top: "45px", right: 0, backgroundColor: "#ffffff", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "0.75rem", minWidth: "220px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 200 }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: "0.25rem 0.5rem 0.5rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>Conectado como</p>
                  <strong style={{ fontSize: "0.875rem", color: "var(--text-main)" }}>{currentRole === "admin" ? "Pr. Daniel Ancião" : "João Membro"}</strong>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>{currentRole === "admin" ? "lider@iasd.org" : "membro@iasd.org"}</p>
                </div>
                <hr style={{ border: "0", borderTop: "1px solid var(--border-color)", margin: "0.5rem 0" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", paddingLeft: "0.5rem", display: "block", marginBottom: "0.25rem" }}>TROCAR PERFIL (DEMO)</span>
                <button onClick={() => { onRoleChange("membro"); setIsDropdownOpen(false); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem", fontSize: "0.875rem", cursor: "pointer", color: currentRole === "membro" ? "var(--brand-primary)" : "var(--text-main)", fontWeight: currentRole === "membro" ? 700 : 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>Perﬁl Membro</button>
                <button onClick={() => { onRoleChange("admin"); setIsDropdownOpen(false); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0.5rem", fontSize: "0.875rem", cursor: "pointer", color: currentRole === "admin" ? "var(--brand-primary)" : "var(--text-main)", fontWeight: currentRole === "admin" ? 700 : 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>Perﬁl Líder/Ancião</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};