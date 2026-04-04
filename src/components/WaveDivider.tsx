import { motion } from 'framer-motion';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  className?: string;
  inverted?: boolean;
}

export default function WaveDivider({
  position = 'bottom',
  className = '',
  inverted = false,
}: WaveDividerProps) {
  const wrapperClass = position === 'top' ? 'wave-top' : 'wave-bottom';
  const transform = `${inverted ? 'scaleY(-1) ' : ''}scaleY(1.15)`;

  return (
    <div className={`wave-divider ${wrapperClass} ${className}`}>
      <motion.svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        className="wave-slow"
        style={{ transform }}
      >
        <defs>
          <linearGradient id={`waveGradientSlow-${position}-${className}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(17, 52, 94, 0.2)" />
            <stop offset="45%" stopColor="rgba(209, 166, 60, 0.34)" />
            <stop offset="100%" stopColor="rgba(169, 161, 154, 0.16)" />
          </linearGradient>
        </defs>
        <path
          d="M0,42 C140,20 220,100 360,94 C520,88 575,20 720,34 C860,47 924,118 1046,113 C1135,109 1185,88 1200,80 V160 H0 Z"
          fill={`url(#waveGradientSlow-${position}-${className})`}
          style={{ filter: 'drop-shadow(0 0 18px rgba(209, 166, 60, 0.12))' }}
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        className="wave-fast opacity-90"
        style={{ transform }}
      >
        <defs>
          <linearGradient id={`waveGradientFast-${position}-${className}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="35%" stopColor="rgba(209, 166, 60, 0.34)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
          </linearGradient>
        </defs>
        <path
          d="M0,72 C120,55 220,12 338,30 C480,52 540,128 692,124 C829,120 930,47 1045,39 C1114,34 1167,48 1200,57 V160 H0 Z"
          fill={`url(#waveGradientFast-${position}-${className})`}
          style={{ filter: 'drop-shadow(0 0 18px rgba(169, 161, 154, 0.14))' }}
        />
      </motion.svg>
    </div>
  );
}
