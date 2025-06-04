import type { ReactNode, MouseEventHandler } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>; // <-- ajouter onClick ici
}

export const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow p-4 ${className}`}
      onClick={onClick} // <-- le transmettre ici
      style={{ cursor: onClick ? "pointer" : "default" }} // pointeur main si cliquable
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};