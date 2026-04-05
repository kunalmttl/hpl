"use client";
import { motion } from "framer-motion";

const CX = 300, CY = 235;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const NODES = [
  polar(0,   125), polar(30,  108), polar(60,  128),
  polar(90,  115), polar(120, 122), polar(150, 105),
  polar(180, 128), polar(210, 112), polar(240, 125),
  polar(270, 108), polar(300, 122), polar(330, 115),
];

const ringPath =
  NODES.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(" ") + " Z";

interface Props { isActive?: boolean; }

export function HeroNetworkMap({ isActive = true }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <svg
        viewBox="0 0 600 470"
        className="w-[640px] h-[500px] opacity-[0.13]"
        style={{ maxWidth: "100%" }}
      >
        {/* Ripple rings from center hub */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ripple-${i}`}
            cx={CX} cy={CY}
            fill="none"
            stroke="#0F766E"
            strokeWidth={1}
            initial={{ r: 16, opacity: 0.7 }}
            animate={isActive ? { r: [16, 160], opacity: [0.7, 0] } : {}}
            transition={{ duration: 3.5, delay: i * 1.1, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Spoke lines: center → node */}
        {NODES.map((node, i) => (
          <motion.path
            key={`spoke-${i}`}
            d={`M ${CX} ${CY} L ${node.x.toFixed(1)} ${node.y.toFixed(1)}`}
            stroke="#0F766E"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.07, ease: "easeOut" }}
          />
        ))}

        {/* Outer connecting ring — dashed */}
        <motion.path
          d={ringPath}
          stroke="#0F766E"
          strokeWidth={0.8}
          strokeDasharray="5 5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 2.2, delay: 1.3, ease: "easeOut" }}
        />

        {/* Data flow dots traveling along spokes */}
        {NODES.map((node, i) => (
          <motion.circle
            key={`dot-${i}`}
            r={2.5}
            fill="#0F766E"
            initial={{ cx: CX, cy: CY, opacity: 0 }}
            animate={isActive ? {
              cx: [CX, node.x],
              cy: [CY, node.y],
              opacity: [0, 1, 0],
            } : {}}
            transition={{
              duration: 1.3,
              delay: 1.2 + i * 0.28,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer satellite nodes — pulsing */}
        {NODES.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x} cy={node.y}
            fill="#0F766E"
            initial={{ r: 0, opacity: 0 }}
            animate={isActive ? { r: [3.5, 5, 3.5], opacity: 1 } : {}}
            transition={{
              r: { duration: 2.5, delay: 1.0 + i * 0.09, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.3, delay: 1.0 + i * 0.09 },
            }}
          />
        ))}

        {/* Central hub node */}
        <motion.circle
          cx={CX} cy={CY} r={10}
          fill="#0F766E"
          initial={{ r: 0 }}
          animate={isActive ? { r: 10 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
        />

        {/* Hub inner glow ring */}
        <motion.circle
          cx={CX} cy={CY}
          fill="none" stroke="#0F766E" strokeWidth={2}
          initial={{ r: 0, opacity: 0 }}
          animate={isActive ? { r: 18, opacity: [0, 0.5, 0.2] } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
