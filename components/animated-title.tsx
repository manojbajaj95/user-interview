//AnimatedTitle.js
"use client";

import { useEffect } from "react";
import {
  useAnimation,
  motion,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typography } from "./ui/typography";

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

function CursorBlinker() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block h-5 w-[1px] translate-y-1 bg-slate-900"
    />
  );
}

export function AnimatedTitle() {
  const baseText = "Change the way you do";
  const count = useMotionValue(0);
  const texts = ["Interviews", "Surveys", "Feedback", "Research"];
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      duration: 1,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <Typography variant="h1" aria-label={baseText} role="heading">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </Typography>
  );
}

export function RedoAnimText() {
  const textIndex = useMotionValue(0);
  const texts = ["Interviews", "Surveys", "Feedback", "Research"];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    latest ? baseText.get().slice(0, latest) : "..."
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography variant="h1" role="heading">
      <motion.span className="inline">{displayText}</motion.span>
    </Typography>
  );
}
