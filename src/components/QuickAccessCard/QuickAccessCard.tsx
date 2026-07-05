import type {
  ReactNode,
  ButtonHTMLAttributes,
} from "react";

import "./QuickAccessCard.scss";

interface QuickAccessCardProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "member" | "leader";
  icon: ReactNode;
  title: string;
}

export const QuickAccessCard = ({
  variant,
  icon,
  title,
  ...rest
}: QuickAccessCardProps) => {
  return (
    <button className={`qa-card ${variant}`} type="button" {...rest}>
      <div className="icon-wrapper">{icon}</div>
      <div className="text">
        <span>Entrar como</span>
        <strong>{title}</strong>
      </div>
    </button>
  );
};