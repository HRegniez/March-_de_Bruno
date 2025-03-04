"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

// Individual animated list item component
export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  // Animation configuration for each list item
  // Customize these values to adjust the animation behavior
  const animations = {
    // Starting state - item starts scaled down and invisible
    initial: { scale: 0, opacity: 0 },
    // Animated state - item scales up and becomes visible
    // originY: 0 makes the item scale from the top
    animate: { scale: 1, opacity: 1, originY: 0 },
    // Exit state - item scales down and fades out when removed
    exit: { scale: 0, opacity: 0 },
    // Spring animation settings
    // stiffness: higher = more "snappy" animation
    // damping: higher = less bouncy/oscillation
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  // delay: time in milliseconds between adding each new item
  delay?: number;
}

// Main AnimatedList component wrapped in React.memo for performance
export const AnimatedList = React.memo(
  ({ children, className, delay = 2000, ...props }: AnimatedListProps) => {
    // Tracks how many items are currently shown
    const [index, setIndex] = useState(0);
    
    // Memoize the children array to prevent unnecessary re-renders
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    // Effect to gradually add items to the list
    useEffect(() => {
      const timeout = setTimeout(() => {
        // Increment index, wrapping around to 0 if we reach the end
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length]);

    // Calculate which items should be visible
    // Items are shown in reverse order (newest first)
    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        {...props}
      >
        {/* AnimatePresence enables exit animations */}
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
