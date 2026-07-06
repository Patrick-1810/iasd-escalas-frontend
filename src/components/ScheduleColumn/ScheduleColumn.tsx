import React from "react";
import "./ScheduleColumn.scss";

interface DutyItem {
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
}

export const ScheduleColumn: React.FC<ScheduleColumnProps> = ({
  title,
  activeCount,
  icon,
  iconBgColor,
  duties
}) => {
  return (
    <div className="schedule-column">
      <div className="column-header">
        <div className="icon-container" style={{ backgroundColor: iconBgColor }}>
          {icon}
        </div>
        <div className="header-meta">
          <h3>{title}</h3>
          <span>{activeCount} escala(s) ativa(s)</span>
        </div>
      </div>

      <div className="duties-list">
        {duties.map((duty, index) => (
          <div className="duty-card" key={index}>
            <div className="badge-row">
              <span className="date-badge">{duty.date}</span>
              <span className="day-badge">{duty.dayOfWeek}</span>
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