import { FC } from 'react';
import logoSrc from '@/assets/logo.png';

export const Logo: FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <img
    src={logoSrc}
    alt="Ichizu Ramen Bar"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);
