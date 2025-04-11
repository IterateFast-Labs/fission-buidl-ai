import { cn } from "@/lib/tailwind-util";

export interface BoxProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Box(props: BoxProps) {
  const Element = props.as || "div";

  return (
    <Element
      ref={props.ref}
      className={cn([
        "relative p-4 border-[6px] border-double border-primary/60 bg-material-light",
        props.className,
      ])}
    >
      {props.label && (
        <div className="px-3 w-fit absolute -top-4 left-2 text-base h-6 flex justify-center items-center bg-primary text-white">
          {props.label}
        </div>
      )}
      {props.children}
    </Element>
  );
}
