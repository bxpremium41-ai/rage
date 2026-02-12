import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface TextScrambleProps {
  text: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  speed = 0.04,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  className,
}) => {
  const [displayText, setDisplayText] = useState(text);

  const scramble = useCallback(() => {
    const targetText = text;
    const length = targetText.length;
    let frame = 0;
    
    const interval = setInterval(() => {
      let output = "";
      for (let i = 0; i < length; i++) {
        // Resolve characters from left to right
        if (i < Math.floor(frame)) {
           output += targetText[i];
        } else {
           // Show random characters for the rest
           output += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }
      
      setDisplayText(output);
      
      // Increment frame to reveal next character
      // Adjust this value to control how "fast" the reveal wave moves relative to the scramble
      frame += 1/2.5; 
      
      if (frame > length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [text, characterSet, speed]);

  useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [scramble]);

  return <span className={cn("inline-block whitespace-pre-wrap", className)}>{displayText}</span>;
};