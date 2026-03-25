export default function CircuitBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
        role="img"
        aria-label="Circuit board background pattern"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="20"
              x2="80"
              y2="20"
              stroke="rgba(0,212,184,0.04)"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="60"
              x2="80"
              y2="60"
              stroke="rgba(0,212,184,0.04)"
              strokeWidth="0.5"
            />
            {/* Vertical lines */}
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="80"
              stroke="rgba(0,212,184,0.04)"
              strokeWidth="0.5"
            />
            <line
              x1="60"
              y1="0"
              x2="60"
              y2="80"
              stroke="rgba(0,212,184,0.04)"
              strokeWidth="0.5"
            />
            {/* Main trace - thicker */}
            <line
              x1="0"
              y1="40"
              x2="80"
              y2="40"
              stroke="rgba(0,212,184,0.06)"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="80"
              stroke="rgba(0,212,184,0.06)"
              strokeWidth="1"
            />
            {/* Node dots at intersections */}
            <circle cx="20" cy="20" r="1.5" fill="rgba(0,212,184,0.10)" />
            <circle cx="60" cy="20" r="1.5" fill="rgba(0,212,184,0.10)" />
            <circle cx="20" cy="60" r="1.5" fill="rgba(0,212,184,0.10)" />
            <circle cx="60" cy="60" r="1.5" fill="rgba(0,212,184,0.10)" />
            {/* Main node */}
            <circle cx="40" cy="40" r="2.5" fill="rgba(0,212,184,0.14)" />
            <circle cx="40" cy="40" r="1" fill="rgba(0,212,184,0.22)" />
            {/* Cross intersections */}
            <circle cx="40" cy="20" r="1" fill="rgba(0,212,184,0.08)" />
            <circle cx="40" cy="60" r="1" fill="rgba(0,212,184,0.08)" />
            <circle cx="20" cy="40" r="1" fill="rgba(0,212,184,0.08)" />
            <circle cx="60" cy="40" r="1" fill="rgba(0,212,184,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}
