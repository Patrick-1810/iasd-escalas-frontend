import React from "react";
import "./Header.scss";

export const Header: React.FC = () => {
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
          <span className="role-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            MEMBRO
          </span>
          <div className="profile-dropdown">
            <div className="avatar">J</div>
            <span className="username">João Membro</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>
    </header>
  );
};