"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";

interface Segment {
  text: string;
  className?: string;
  br?: boolean; // Forced line break after this segment
}

interface TypewriterHeadingProps {
  segments?: Segment[] | string;
  text?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
  once?: boolean;
}

export const TypewriterHeading = ({ 
  segments, 
  text,
  className = "", 
  as: Component = "h3",
  delay = 0,
  once = true 
}: TypewriterHeadingProps) => {
  const { isIntroDone } = useNavbarLogoRef();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once });

  // Convert string or text prop to segments for consistency
  const finalSegments = text ? [{ text }] : 
                       (typeof segments === "string" ? [{ text: segments }] : segments || []);

  const containerVariants: any = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1, // Reverse typing when hiding
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Slightly slower, more readable typing
        delayChildren: delay + 0.1,
      },
    }
  };

  const childVariants: any = {
    hidden: { 
      opacity: 0, 
      x: -2,
      transition: {
        duration: 0.1
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
  };

  return (
    <Component ref={ref} className={`${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        {finalSegments.map((segment: Segment, sIndex: number) => (
          <React.Fragment key={sIndex}>
            <span className={segment.className}>
              {segment.text.split(" ").map((word: string, wIndex: number, wordsArray: string[]) => (
                <span key={`${sIndex}-${wIndex}`} className="inline-block whitespace-nowrap">
                  {word.split("").map((char: string, cIndex: number) => (
                    <motion.span
                      key={`${sIndex}-${wIndex}-${cIndex}`}
                      variants={childVariants}
                      className="inline-block will-change-[opacity,transform]"
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Add back the space after the word, unless it's the last word in segment */}
                  {wIndex < wordsArray.length - 1 && (
                    <motion.span
                      key={`${sIndex}-${wIndex}-space`}
                      variants={childVariants}
                      className="inline-block"
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </span>
              ))}
            </span>
            {segment.br && <br />}
          </React.Fragment>
        ))}
      </motion.span>
    </Component>
  );
};
