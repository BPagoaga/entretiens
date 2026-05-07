import { useId, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'email' | 'password';
  label?: string;
  error?: string;
}

export function Input({ label, type = 'email', error, className = '', id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const handleKeyPress = () => {
    // do something
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        {...props}
        className={[
          'rounded-md border px-3 py-2 text-sm outline-none transition-colors',
          'border-gray-300 bg-white text-gray-900 placeholder-gray-400',
          'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onChange={handleKeyPress}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
