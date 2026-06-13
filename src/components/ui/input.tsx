import React from 'react';
import "@/styles/ui/input.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Input({
  className = '',
  icon,
  iconPosition = 'left',
  ref,
  ...props
}: InputProps) {
  const hasIcon = !!icon;
  const containerClass = `ui-input-container ${hasIcon ? `has-icon-${iconPosition}` : ''} ${className}`;

  return (
    <div className={containerClass}>
      {hasIcon && iconPosition === 'left' && (
        <span className="ui-input-icon left">{icon}</span>
      )}
      <input ref={ref} className="ui-input-field" {...props} />
      {hasIcon && iconPosition === 'right' && (
        <span className="ui-input-icon right">{icon}</span>
      )}
    </div>
  );
}

export default Input;
