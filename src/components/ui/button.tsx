import React from 'react';
import "@/styles/ui/button.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}

export function Button({ children, className = '', ref, ...props }: ButtonProps) {
  return (
    <button ref={ref} className={`ui-button ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonText({ children }: { children: React.ReactNode }) {
  return <span className="ui-button-text">{children}</span>;
}

export function ButtonIcon({ children }: { children: React.ReactNode }) {
  return <span className="ui-button-icon">{children}</span>;
}

export function ButtonSpinner() {
  return (
    <div className="ui-button-spinner-wrapper">
      <span className="ui-button-spinner" />
    </div>
  );
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;
Button.Spinner = ButtonSpinner;
