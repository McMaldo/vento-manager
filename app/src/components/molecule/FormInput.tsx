import type { HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  value: string | number | readonly string[] | undefined;
  label?: string;
  index?: number;
  placeHolder: string;
  required?: boolean;
  onChange: (value: string) => void;
}
const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value = "",
  index,
  placeHolder,
  required = true,
  onChange,
}) => {
  return (
    <>
      {label ? (
        <label
          htmlFor={name}
          className="w-full text-font-light text-nowrap mt-4"
        >
          {label}:
        </label>
      ) : (
        ""
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        tabIndex={index}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeHolder}
        className="w-full px-4 py-2 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all"
        required={required}
      />
    </>
  );
};
export default FormInput;
