import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { allProjects } from '../data/projects'

// Refined Mumbai peninsula SVG — viewBox 0 0 320 420
// North at top; peninsula runs south from Salsette island
const LAND = `
  M 120 10 C 130 8, 145 10, 152 18 C 158 24, 160 30, 158 38
  C 155 46, 148 50, 150 58 C 152 65, 162 68, 165 75
  C 168 83, 162 88, 158 95 C 153 103, 148 108, 148 116
  C 148 125, 154 132, 156 140 C 158 148, 155 155, 150 162
  C 144 170, 136 174, 132 182 C 127 191, 126 200, 122 208
  C 118 216, 112 220, 108 228 C 104 237, 104 246, 102 255
  C 100 264, 96 272, 90 279 C 84 287, 76 291, 72 298
  C 67 306, 65 314, 60 320 C 55 326, 48 330, 44 337
  C 40 344, 40 352, 42 359 C 44 366, 50 372, 52 379
  C 54 386, 52 392, 48 398 C 45 402, 40 405, 38 410
  C 75 416, 92 408, 98 400 C 104 391, 100 382, 104 374
  C 108 366, 118 362, 124 354 C 130 346, 130 337, 132 328
  C 134 319, 138 311, 140 302 C 142 293, 140 284, 142 275
  C 144 266, 148 258, 148 249 C 148 240, 144 232, 144 223
  C 144 214, 148 206, 150 197 C 152 188, 150 179, 148 170
  C 146 161, 142 153, 142 144 C 142 135, 146 127, 148 118
  C 150 109, 150 100, 148 91 C 146 82, 140 75, 138 66
  C 136 57, 138 48, 136 39 C 134 30, 128 23, 124 16 Z
`

// Thane creek / Navi Mumbai eastern shore
const THANE = `
  M 180 60 C 195 55, 215 60, 225 70 C 235 80, 238 95, 232 108
  C 226 121, 212 128, 202 138 C 192 148, 186 160, 180 170
  C 174 180, 168 188, 166 196 C 170 198, 178 194, 186 188
  C 196 181, 205 172, 214 163 C 224 154, 234 145, 240 134
  C 246 122, 248 108, 244 95 C 240 82, 230 70, 218 63
  C 206 55, 192 53, 180 60 Z
`

// Dombivli / Kalyan area
const DOMBIVLI = `
  M 230 30 C 240 25, 258 28, 265 38 C 272 48, 268 62, 260 70
  C 252 78, 240 80, 232 74 C 224 68, 220 56, 224 45 Z
`

const AREA_LABELS = [
  { label: 'Colaba', x: 75, y: 405, anchor: 'middle', size: 7 },
  { label: 'South Mumbai', x: 58, y: 375, anchor: 'end', size: 6.5 },
  { label: 'Worli', x: 40, y: 318, anchor: 'end', size: 6.5 },
  { label: 'BKC / Bandra', x: 38, y: 258, anchor: 'end', size: 6.5 },
  { label: 'Andheri / Juhu', x: 38, y: 185, anchor: 'end', size: 6.5 },
  { label: 'Malad', x: 44, y: 120, anchor: 'end', size: 6 },
  { label: 'Thane', x: 210, y: 150, anchor: 'start', size: 6.5 },
  { label: 'Dombivli', x: 248, y: 55, anchor: 'start', size: 6 },
]

// Scale project mapCoords (originally 0-100 x, 0-120 y) to new viewBox 320x420
const scaleCoord = (p) => ({
  x: (p.mapCoords.x / 100) * 320,
  y: (p.mapCoords.y / 120) * 420,
})

export default function MumbaiMap({ className = '' }) {
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()

  const mapProjects = allProjects.filter((p) => p.slug !== 'gardens')

  return (
    <div className={`relative ${className}`} style={{ background: 'transparent' }}>
      <svg
        viewBox="0 0 320 420"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Sea texture gradient */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#051018" />
            <stop offset="100%" stopColor="#040c14" />
          </linearGradient>

          {/* Land gradient */}
          <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141c28" />
            <stop offset="100%" stopColor="#0e1620" />
          </linearGradient>

          {/* Marker glow */}
          <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Subtle drop shadow for land */}
          <filter id="landShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#10b981" floodOpacity="0.08" />
          </filter>

          <style>{`
            @keyframes mapPulse {
              0%   { transform: scale(1); opacity: 0.8; }
              70%  { transform: scale(2.8); opacity: 0; }
              100% { transform: scale(1); opacity: 0; }
            }
            .map-pulse { animation: mapPulse 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
          `}</style>
        </defs>

        {/* Sea background */}
        <rect width="320" height="420" fill="url(#seaGrad)" rx="16" />

        {/* Subtle sea grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="420"
            stroke="rgba(16,185,129,0.04)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40}
            stroke="rgba(16,185,129,0.04)" strokeWidth="0.5" />
        ))}

        {/* Subtle wave lines — horizontal, sea texture */}
        {[80, 180, 280, 360].map((y) => (
          <path key={`wave${y}`}
            d={`M 0 ${y} Q 80 ${y - 4} 160 ${y} Q 240 ${y + 4} 320 ${y}`}
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" fill="none" />
        ))}

        {/* Dombivli */}
        <path d={DOMBIVLI} fill="url(#landGrad)" stroke="rgba(16,185,129,0.3)"
          strokeWidth="0.8" filter="url(#landShadow)" />

        {/* Thane / Navi Mumbai */}
        <path d={THANE} fill="url(#landGrad)" stroke="rgba(16,185,129,0.3)"
          strokeWidth="0.8" filter="url(#landShadow)" />

        {/* Main Mumbai peninsula */}
        <path d={LAND} fill="url(#landGrad)" stroke="rgba(16,185,129,0.45)"
          strokeWidth="1" filter="url(#landShadow)" />

        {/* Coastline shimmer — subtle highlight on western shore */}
        <path d={LAND} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

        {/* Area labels */}
        {AREA_LABELS.map((a) => (
          <text key={a.label} x={a.x} y={a.y}
            textAnchor={a.anchor}
            fontSize={a.size}
            fill="rgba(255,255,255,0.18)"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.5"
          >
            {a.label}
          </text>
        ))}

        {/* Compass rose — top right */}
        <g transform="translate(292, 28)">
          <circle cx="0" cy="0" r="12" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
          <text x="0" y="-6" textAnchor="middle" fontSize="6" fill="rgba(16,185,129,0.5)" fontFamily="Inter">N</text>
          <path d="M 0 -4 L 1.5 2 L 0 0 L -1.5 2 Z" fill="rgba(16,185,129,0.6)" />
          <path d="M 0 4 L 1.5 -2 L 0 0 L -1.5 -2 Z" fill="rgba(255,255,255,0.15)" />
        </g>

        {/* Property markers */}
        {mapProjects.map((p) => {
          const { x, y } = scaleCoord(p)
          const isHov = hovered === p.slug

          return (
            <g key={p.slug}
              className="cursor-pointer"
              onClick={() => navigate(`/real-estate/${p.devSlug}/${p.slug}`)}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring — only when hovered */}
              {isHov && (
                <circle cx={x} cy={y} r="7"
                  fill="none" stroke="#10b981" strokeWidth="1"
                  className="map-pulse"
                  opacity="0.7"
                />
              )}

              {/* Outer ring */}
              <circle cx={x} cy={y}
                r={isHov ? 6 : 4.5}
                fill={isHov ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.1)'}
                stroke="#10b981"
                strokeWidth={isHov ? 1.2 : 0.8}
                filter="url(#markerGlow)"
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Inner dot */}
              <circle cx={x} cy={y}
                r={isHov ? 2.8 : 2}
                fill="#10b981"
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Static label for hovered */}
              {isHov && (
                <text x={x} y={y - 9}
                  textAnchor="middle"
                  fontSize="6"
                  fill="#10b981"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                >
                  {p.name.replace(/^(Lodha|Raymond|K Raheja)\s+/i, '')}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip card — positioned relative to container */}
      <AnimatePresence>
        {hovered && (() => {
          const p = mapProjects.find((x) => x.slug === hovered)
          if (!p) return null
          const { x, y } = scaleCoord(p)
          // Convert SVG coords to % of container
          const leftPct = (x / 320) * 100
          const topPct = (y / 420) * 100

          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 pointer-events-none"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: 'translate(-50%, -125%)',
              }}
            >
              <div className="bg-[#0d1420] border border-emerald-500/35 rounded-2xl px-4 py-3 shadow-2xl whitespace-nowrap">
                <div className="text-white/30 text-xs mb-0.5">{p.devName}</div>
                <div className="text-emerald-400 text-sm font-semibold">{p.name}</div>
                <div className="text-white/40 text-xs mt-0.5">{p.location.split(',')[0]}</div>
                <div className={`text-xs mt-1.5 font-medium ${p.status === 'Ready Possession' ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {p.status.split(' — ')[0]}
                </div>
                <div className="text-white/20 text-xs mt-1">Click to explore →</div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center -mt-px">
                <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid rgba(16,185,129,0.35)' }} />
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
