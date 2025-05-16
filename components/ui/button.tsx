import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'blue' | 'orange' | 'purple'; // Optional: nếu bạn muốn hỗ trợ các variant khác nhau
};

export const Button: React.FC<ButtonProps> = ({ children, className, variant, ...props }) => {
  // Tạo lớp cơ bản cho nút
  let baseClasses = "base-button";

  // Thêm các lớp dựa trên variant nếu có
  if (variant) {
    baseClasses += ` btn-${variant}`;
  }

  // Kết hợp lớp cơ bản với lớp tùy chỉnh từ props
  const combinedClassName = `${baseClasses} ${className || ""}`.trim();

  return (
    <button {...props} className={combinedClassName}>
      {children}
    </button>
  );
};