type Props = {
  className?: string
}

export function Portrait({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 220 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* distant horizon */}
      <g opacity="0.3">
        <path d="M0 122 Q 44 110 84 118 T 220 116" />
        <path d="M0 140 Q 60 128 124 138 T 220 142" />
      </g>

      {/* hair — base shape */}
      <path
        d="M74 52 Q 80 26 102 24 Q 126 24 134 44 Q 138 58 132 72 Q 128 60 120 56 Q 104 52 92 60 Q 82 64 78 76 Q 72 64 74 52 Z"
        fill="currentColor"
      />
      {/* hair strands / texture */}
      <path d="M88 36 L 94 30" opacity="0.6" strokeWidth="1" />
      <path d="M104 28 L 108 22" opacity="0.6" strokeWidth="1" />
      <path d="M118 32 L 124 28" opacity="0.6" strokeWidth="1" />
      {/* hairline tuft */}
      <path d="M86 56 Q 92 60 100 58" opacity="0.7" strokeWidth="1" />

      {/* face */}
      <ellipse cx="102" cy="68" rx="18" ry="22" />

      {/* ears */}
      <path d="M84 70 Q 81 74 84 80" opacity="0.7" />
      <path d="M120 70 Q 123 74 120 80" opacity="0.7" />

      {/* eyebrows */}
      <path d="M89 62 L 99 61" />
      <path d="M105 61 L 115 62" />

      {/* glasses */}
      <g>
        <rect x="86" y="63" width="14" height="11" rx="2.5" />
        <rect x="104" y="63" width="14" height="11" rx="2.5" />
        <path d="M100 68 L 104 68" />
        <path d="M86 66 L 80 67" />
        <path d="M118 66 L 122 67" />
      </g>

      {/* eyes (behind glasses) */}
      <path d="M91 69 L 95 69" opacity="0.8" />
      <path d="M109 69 L 113 69" opacity="0.8" />

      {/* nose */}
      <path d="M102 74 L 100 81 L 103 82" opacity="0.55" />

      {/* mouth — slight smile */}
      <path d="M97 88 Q 102 90 107 88" />

      {/* beard — goatee + mustache outline */}
      <path d="M91 82 Q 96 96 102 98 Q 108 96 113 82" />
      <path d="M99 84 Q 102 85 105 84" opacity="0.55" />
      {/* light stubble */}
      <path d="M93 86 L 94 88" opacity="0.4" strokeWidth="0.8" />
      <path d="M97 90 L 98 92" opacity="0.4" strokeWidth="0.8" />
      <path d="M106 90 L 107 92" opacity="0.4" strokeWidth="0.8" />
      <path d="M110 86 L 111 88" opacity="0.4" strokeWidth="0.8" />

      {/* neck */}
      <path d="M96 90 L 95 112" />
      <path d="M108 90 L 109 112" />

      {/* shirt collar */}
      <path d="M82 118 Q 90 120 96 124 L 102 140 L 108 124 Q 114 120 122 118" />

      {/* shoulders */}
      <path d="M58 130 Q 78 118 96 122" />
      <path d="M108 122 Q 126 118 146 130" />

      {/* torso sides */}
      <path d="M56 132 Q 54 212 58 270 Q 60 282 64 290" />
      <path d="M148 132 Q 150 212 146 270 Q 144 282 140 290" />

      {/* button placket */}
      <path d="M102 140 L 102 290" opacity="0.45" strokeDasharray="2 5" />
      {/* button dots */}
      <circle cx="102" cy="160" r="1.2" opacity="0.7" />
      <circle cx="102" cy="195" r="1.2" opacity="0.7" />
      <circle cx="102" cy="230" r="1.2" opacity="0.7" />
      <circle cx="102" cy="265" r="1.2" opacity="0.7" />

      {/* chest pocket — </> badge */}
      <g opacity="0.7">
        <rect x="68" y="158" width="22" height="18" rx="1" strokeWidth="1" />
        <path
          d="M73 164 L 70 167 L 73 170 M 85 164 L 88 167 L 85 170 M 80 162 L 76 172"
          strokeWidth="1"
        />
      </g>

      {/* belt */}
      <path d="M60 292 L 142 292" />
      <path d="M60 298 L 142 298" />
      <rect x="98" y="292" width="8" height="6" />

      {/* left arm — hand in pocket (viewer's left) */}
      <path d="M58 134 Q 46 200 52 254 Q 56 276 68 294" />
      {/* rolled cuff */}
      <path d="M48 250 Q 54 250 60 250" opacity="0.7" strokeWidth="1" />
      <path d="M48 256 Q 54 256 60 256" opacity="0.7" strokeWidth="1" />
      {/* watch */}
      <g opacity="0.85">
        <rect x="50" y="266" width="12" height="9" rx="1.5" strokeWidth="1.1" />
        <path d="M56 270 L 56 272 L 58 272" strokeWidth="0.9" />
      </g>
      {/* pocket opening */}
      <path d="M70 304 Q 84 314 96 314" opacity="0.5" />

      {/* right arm — holding laptop */}
      <path d="M148 134 Q 156 200 150 254 Q 148 282 142 312" />
      {/* rolled cuff */}
      <path d="M146 252 Q 152 252 158 252" opacity="0.7" strokeWidth="1" />
      <path d="M146 258 Q 152 258 158 258" opacity="0.7" strokeWidth="1" />
      <path d="M140 314 Q 140 340 136 358" />
      {/* hand */}
      <path d="M126 358 Q 134 364 144 360" />

      {/* laptop held at side */}
      <g>
        <rect x="112" y="352" width="50" height="76" rx="3" />
        {/* webcam dot */}
        <circle cx="137" cy="358" r="0.8" opacity="0.6" />
        {/* screen bezel */}
        <rect
          x="116"
          y="362"
          width="42"
          height="58"
          rx="1"
          opacity="0.55"
          strokeWidth="0.9"
        />
        {/* code lines */}
        <g opacity="0.55" strokeWidth="0.9">
          <path d="M120 370 L 138 370" />
          <path d="M120 376 L 150 376" />
          <path d="M124 382 L 146 382" />
          <path d="M120 388 L 142 388" />
          <path d="M124 394 L 154 394" />
          <path d="M120 400 L 136 400" />
          <path d="M124 406 L 148 406" />
          <path d="M120 412 L 140 412" />
        </g>
        {/* prompt caret */}
        <path d="M120 418 L 124 418" strokeWidth="1" />
      </g>

      {/* pants — center seam */}
      <path d="M102 300 L 100 514" opacity="0.5" />
      {/* outer legs */}
      <path d="M64 302 L 76 514" />
      <path d="M140 302 L 130 514" />
      {/* inner legs */}
      <path d="M94 306 L 88 514" />
      <path d="M110 306 L 114 514" />
      {/* knee creases */}
      <path d="M82 400 Q 86 402 90 400" opacity="0.35" strokeWidth="1" />
      <path d="M120 400 Q 124 402 128 400" opacity="0.35" strokeWidth="1" />

      {/* shoes */}
      <path d="M68 514 Q 80 518 92 510" />
      <path d="M110 510 Q 124 518 136 514" />

      {/* floating dev motif — semicolon */}
      <g opacity="0.55" className="text-ember">
        <circle cx="186" cy="240" r="2" fill="currentColor" stroke="none" />
        <path
          d="M184 248 Q 186 252 184 256"
          strokeWidth="1.4"
          stroke="currentColor"
          fill="none"
        />
      </g>

      {/* floating dev motif — curly braces */}
      <g opacity="0.45" strokeWidth="1.2">
        <path d="M18 200 Q 12 206 14 214 Q 16 220 12 224 Q 16 228 14 234 Q 12 242 18 248" />
        <path d="M30 200 Q 36 206 34 214 Q 32 220 36 224 Q 32 228 34 234 Q 36 242 30 248" />
      </g>
    </svg>
  )
}
