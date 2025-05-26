import React from "react";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  requiresAuth: boolean;
  isAuthenticated: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  link,
  icon,
  bgColor,
  textColor,
  requiresAuth,
  isAuthenticated,
}) => {
  const unavailable = requiresAuth && !isAuthenticated;

  return (
    <a
      href={unavailable ? "#" : link}
      className={`group block relative overflow-hidden rounded-2xl p-8 bg-white border border-gray-100 shadow-sm transition-all duration-300 
        ${!unavailable ? "hover:shadow-md hover:-translate-y-1" : "opacity-80 cursor-not-allowed"}`}
    >
      <div
        className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        <div
          className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl ${bgColor} ${textColor}`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>

        {unavailable ? (
          <p className="mt-4 text-sm text-red-600 font-medium">Connectez-vous pour y accéder</p>
        ) : (
          <div
            className={`mt-4 inline-flex items-center ${textColor} font-medium group-hover:${textColor.replace(
              "600",
              "700"
            )} transition-colors duration-300`}
          >
            En savoir plus
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )}
      </div>
    </a>
  );
};

export default FeatureCard;