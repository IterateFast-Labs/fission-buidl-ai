// Typing.tsx
import React, { useEffect, useRef, useState } from "react";

interface TypingProps {
  text: React.ReactNode;
  delayPerChar?: number; // 초 단위
  className?: string;
  enableTypingEffect?: boolean;
}

function flattenText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(flattenText).join("");
  }

  if (React.isValidElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return flattenText((node.props as any).children);
  }

  return "";
}

export const Typing: React.FC<TypingProps> = ({
  enableTypingEffect = true,
  text,
  delayPerChar = 0.005,
  className,
}) => {
  const fullText = flattenText(text); // ReactNode → string
  const [visibleLength, setVisibleLength] = useState(
    enableTypingEffect ? 0 : fullText.length
  );
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enableTypingEffect) {
      setVisibleLength(fullText.length);
      return;
    }

    setVisibleLength(0);
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setVisibleLength(index);
      if (index >= fullText.length) {
        clearInterval(interval);
      }

      // 스크롤 처리
      requestAnimationFrame(() => {
        endRef.current?.scrollIntoView({ behavior: "instant" });
      });
    }, delayPerChar * 1000);

    return () => clearInterval(interval);
  }, [fullText, delayPerChar]);

  return (
    <div className={className}>
      {fullText.slice(0, visibleLength)}
      <div ref={endRef}></div>
    </div>
  );
};
