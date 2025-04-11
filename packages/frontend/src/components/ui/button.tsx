import { cva, VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'cursor-pointer',
    'font-bold',
    'relative',
    'inline-flex',
    'items-center',
    'gap-2',
    'justify-center',
  ],
  {
    variants: {
      variant: {
        default:
          'text-white hover:bg-white hover:text-primary border-2 border-primary bg-primary after:block after:contents-[""] after:block after:absolute after:border-2 after:border-white after:inset-px hover:after:border-primary disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-600 disabled:hover:after:border-white disabled:cursor-not-allowed',
      },
      size: {
        default: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ButtonVariants,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  ref,
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={buttonVariants({
        variant,
        size,
        className,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
