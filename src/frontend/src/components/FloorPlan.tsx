export default function FloorPlan() {
  const width = 380;
  const height = 240;
  const margin = 48;
  const roomW = width - margin * 2;
  const roomH = height - margin * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Floor Plan — 2D Layout
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-sm rounded-lg border border-border bg-white shadow-card"
        aria-label="Floor plan showing 19 by 11 foot shop dimensions"
        role="img"
      >
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#e8eaf0"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          x={margin}
          y={margin}
          width={roomW}
          height={roomH}
          fill="url(#grid)"
        />

        {/* Room outline */}
        <rect
          x={margin}
          y={margin}
          width={roomW}
          height={roomH}
          fill="oklch(0.95 0.015 265 / 0.15)"
          stroke="oklch(0.22 0.06 265)"
          strokeWidth="3"
          rx="2"
        />

        {/* Door indicator (bottom left) */}
        <path
          d={`M ${margin} ${margin + roomH - 30} L ${margin + 30} ${margin + roomH - 30}`}
          stroke="oklch(0.22 0.06 265)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M ${margin} ${margin + roomH - 30} A 30 30 0 0 1 ${margin + 30} ${margin + roomH}`}
          stroke="oklch(0.72 0.16 65)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
        />

        {/* Window indicator (top wall) */}
        <line
          x1={margin + roomW * 0.3}
          y1={margin}
          x2={margin + roomW * 0.7}
          y2={margin}
          stroke="oklch(0.62 0.18 200)"
          strokeWidth="4"
        />
        <line
          x1={margin + roomW * 0.3}
          y1={margin}
          x2={margin + roomW * 0.7}
          y2={margin}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Width dimension label (bottom) */}
        {/* Arrow left */}
        <line
          x1={margin}
          y1={height - 14}
          x2={margin + roomW}
          y2={height - 14}
          stroke="oklch(0.22 0.06 265)"
          strokeWidth="1.5"
        />
        <polygon
          points={`${margin},${height - 14} ${margin + 7},${height - 18} ${margin + 7},${height - 10}`}
          fill="oklch(0.22 0.06 265)"
        />
        <polygon
          points={`${margin + roomW},${height - 14} ${margin + roomW - 7},${height - 18} ${margin + roomW - 7},${height - 10}`}
          fill="oklch(0.22 0.06 265)"
        />
        <text
          x={width / 2}
          y={height - 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="oklch(0.22 0.06 265)"
          fontFamily="Cabinet Grotesk, sans-serif"
        >
          19 ft
        </text>

        {/* Height dimension label (right) */}
        <line
          x1={width - 14}
          y1={margin}
          x2={width - 14}
          y2={margin + roomH}
          stroke="oklch(0.22 0.06 265)"
          strokeWidth="1.5"
        />
        <polygon
          points={`${width - 14},${margin} ${width - 18},${margin + 7} ${width - 10},${margin + 7}`}
          fill="oklch(0.22 0.06 265)"
        />
        <polygon
          points={`${width - 14},${margin + roomH} ${width - 18},${margin + roomH - 7} ${width - 10},${margin + roomH - 7}`}
          fill="oklch(0.22 0.06 265)"
        />
        <text
          x={width - 4}
          y={height / 2 + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="oklch(0.22 0.06 265)"
          fontFamily="Cabinet Grotesk, sans-serif"
          transform={`rotate(-90, ${width - 4}, ${height / 2})`}
        >
          11 ft
        </text>

        {/* Center label */}
        <text
          x={margin + roomW / 2}
          y={margin + roomH / 2 - 6}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="oklch(0.22 0.06 265 / 0.7)"
          fontFamily="Cabinet Grotesk, sans-serif"
        >
          209 sq ft
        </text>
        <text
          x={margin + roomW / 2}
          y={margin + roomH / 2 + 12}
          textAnchor="middle"
          fontSize="10"
          fill="oklch(0.52 0.02 265)"
          fontFamily="Cabinet Grotesk, sans-serif"
        >
          Commercial Space
        </text>

        {/* Legend */}
        <line
          x1={margin + 4}
          y1={margin + roomH - 15}
          x2={margin + 18}
          y2={margin + roomH - 15}
          stroke="oklch(0.62 0.18 200)"
          strokeWidth="3"
        />
        <text
          x={margin + 22}
          y={margin + roomH - 11}
          fontSize="8"
          fill="oklch(0.52 0.02 265)"
          fontFamily="Cabinet Grotesk, sans-serif"
        >
          Window
        </text>

        <path
          d={`M ${margin + 60} ${margin + roomH - 19} L ${margin + 74} ${margin + roomH - 19}`}
          stroke="oklch(0.22 0.06 265)"
          strokeWidth="2"
          fill="none"
        />
        <text
          x={margin + 78}
          y={margin + roomH - 11}
          fontSize="8"
          fill="oklch(0.52 0.02 265)"
          fontFamily="Cabinet Grotesk, sans-serif"
        >
          Door
        </text>
      </svg>
    </div>
  );
}
