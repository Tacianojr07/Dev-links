import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="rounded-md px-2 h-9 outline-none border-0 mb-3"
      {...props}
    />
  );
}
