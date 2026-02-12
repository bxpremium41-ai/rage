import React from "react";
import { cn } from "../../lib/utils";

interface LiquidTextProps {
  text: string;
  className?: string;
  id?: string;
}

export const LiquidText: React.FC<LiquidTextProps> = ({ text, className, id }) => {
  const uniqueId = React.useId().replace(/:/g, ""); 
  const filterId = `liquid-filter-${id || uniqueId}`;

  return (
    <div className="relative inline-block" key={text}>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="2"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                from="50"
                to="0"
                dur="1.2s"
                begin="0s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.2 0 0.2 1"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      
      <span
        className={cn(className, "block translate-z-0")}
        style={{ filter: `url(#${filterId})` }}
      >
        {text}
      </span>
    </div>
  );
};
