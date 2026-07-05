import type { InputHTMLAttributes } from "react";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Input({ label, id, ...rest }: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </div>
  );
}