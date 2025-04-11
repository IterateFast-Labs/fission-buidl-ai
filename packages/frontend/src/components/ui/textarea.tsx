import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

export default function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={[
        'block bg-white/50 border-2 border-primary p-4 active:ring-0',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
