import React from "react";
import "./HighlightCard.scss";

interface HighlightCardProps {
  type: "primary" | "surface";
  badgeText: string;
  title: string;
  subtitle: string;
  phone: string;
  footerText?: string;
  icon: React.ReactNode;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  type,
  badgeText,
  title,
  subtitle,
  phone,
  footerText,
  icon
}) => {
  return (
    <div className={`highlight-card ${type}`}>
      <div className="card-top">
        <span className="card-badge">{badgeText}</span>
        <div className="icon-wrapper">{icon}</div>
      </div>
      
      <div className="card-content">
        <h3>{title}</h3>
        <p className="subtitle">{subtitle}</p>
        
        <div className="phone-line">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>{phone}</span>
        </div>
      </div>

      {footerText && (
        <div className="card-footer">
          <span className="status-dot"></span>
          <span>{footerText}</span>
        </div>
      )}
    </div>
  );
};