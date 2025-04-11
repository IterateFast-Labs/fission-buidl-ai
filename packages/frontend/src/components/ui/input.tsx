import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={[
        "block bg-white/50 border-2 border-primary px-2 py-1.5 active:ring-0",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
