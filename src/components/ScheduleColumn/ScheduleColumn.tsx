import React from "react";
import "./ScheduleColumn.scss";

interface DutyItem {
  id: string; 
  date: string;
  dayOfWeek: string;
  names: string[];
  description?: string;
}

interface ScheduleColumnProps {
  title: string;
  activeCount: number;
  icon: React.ReactNode;
  iconBgColor: string;
  duties: DutyItem[];
  isAdmin: boolean; 
  onAddClick?: () => void;
  onEditClick?: (duty: DutyItem) => void;
  onDeleteClick?: (duty: DutyItem) => void;
}

export const ScheduleColumn: React.FC<ScheduleColumnProps> = ({
  title,
  activeCount,
  icon,
  iconBgColor,
  duties,
  isAdmin,
  onAddClick,
  onEditClick,
  onDeleteClick
}) => {
  return (
    <div className="schedule-column">
      <div className="column-header" style={{ justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div className="icon-container" style={{ backgroundColor: iconBgColor }}>
            {icon}
          </div>
          <div className="header-meta">
            <h3>{title}</h3>
            <span>{activeCount} escala(s) ativa(s)</span>
          </div>
        </div>
        {isAdmin && (
          <button onClick={onAddClick} style={{ background: "none", border: "none", color: "var(--brand-primary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        )}
      </div>

      <div className="duties-list">
        {duties.map((duty, index) => (
          <div className="duty-card" key={index} style={{ position: "relative" }}>
            <div className="badge-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span className="date-badge">{duty.date}</span>
                <span className="day-badge">{duty.dayOfWeek}</span>
              </div>
              
              {/* Botões de ação para Administradores */}
              {isAdmin && (
                <div className="action-buttons" style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => onEditClick?.(duty)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button onClick={() => onDeleteClick?.(duty)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="members-assigned">
              {duty.names.map((name, idx) => (
                <div className="member-row" key={idx}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>{name}</span>
                </div>
              ))}
            </div>

            {duty.description && (
              <div className="duty-description">
                <p>{duty.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};