import React from "react";

export type IButton = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const VARIANT = {
  primary: "bg-green-500 hover:bg-green-600 ring-green-400",
  danger: "bg-red-500 hover:bg-red-600 ring-red-400",
};

export const Button: React.FC<IButton> = ({
  className = "",
  children,
  variant = "primary",
  ...rest
}) => {
  const dynamicClasses = VARIANT[variant];
  return (
    <button
      className={`py-2 px-4 ${dynamicClasses} rounded focus:outline-none ring-opacity-75  focus:ring text-white text-lg ${className}`}
      {...rest}
      data-testid="btn"
    >
      {children}
    </button>
  );
};
