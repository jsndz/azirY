import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
