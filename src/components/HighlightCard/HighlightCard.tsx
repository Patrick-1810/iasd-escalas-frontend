import React from "react";
import "./HighlightCard.scss";

interface HighlightCardProps {
  type: "primary" | "surface";
  badgeText: string;
  title: string;
  subtitle: string;
  phone?: string;
  footerText?: string;
  icon: React.ReactNode;
  isAdmin?: boolean;
  onEdit?: () => void;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  type,
  badgeText,
  title,
  subtitle,
  phone,
  footerText,
  icon,
  isAdmin,
  onEdit
}) => {
  return (
    <div className={`highlight-card ${type}`}>
      <div className="card-top">
        <span className="card-badge">{badgeText}</span>
        <div className="card-actions">
          {isAdmin && onEdit && (
            <button
              onClick={onEdit}
              title="Editar destaque"
              className="edit-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          )}
          <div className="icon-wrapper">{icon}</div>
        </div>
      </div>
      
      <div className="card-content">
        <h3>{title}</h3>
        <p className="subtitle">{subtitle}</p>
        
        {phone && (
          <div className="phone-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{phone}</span>
          </div>
        )}
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