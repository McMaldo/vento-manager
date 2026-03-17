import type { FC } from "react";

const Input: FC<{
  label?: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-font-light font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        className="w-full px-4 py-2 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
export default Input;
