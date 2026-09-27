import { ReactNode } from 'react';
import * as m from 'framer-motion/m';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
  fullWidth?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  duration = 0.8,
  fullWidth = false,
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <m.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={fullWidth ? `w-full${className ? ` ${className}` : ''}` : className}
    >
      {children}
    </m.div>
  );
}
