import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
      {children}
    </button>
  );
};
