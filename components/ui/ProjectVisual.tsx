import type { Project } from "@/types";

/**
 * Abstract black/red diagrams used when a project screenshot hasn't been
 * added yet. They illustrate the idea — they are not fake product UI.
 */
export function ProjectVisual({ visual, onRed = false }: { visual: Project["visual"]; onRed?: boolean }) {
  const red = onRed ? "#000000" : "#E00000";
  const dim = onRed ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.14)";
  const mid = onRed ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.55)";
  const bg = onRed ? "transparent" : "#0a0a0a";

  return (
    <svg viewBox="0 0 1200 675" className="h-full w-full" role="img" aria-label="Diagram of the project idea" preserveAspectRatio="xMidYMid slice">
      <rect width="1200" height="675" fill={bg} />
      <g stroke={dim} strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="675" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 112.5} x2="1200" y2={i * 112.5} />
        ))}
      </g>
      {visual === "signal" && <Signal red={red} mid={mid} />}
      {visual === "rag" && <Rag red={red} mid={mid} />}
      {visual === "aml" && <Aml red={red} mid={mid} />}
      {visual === "chain" && <Chain red={red} mid={mid} />}
    </svg>
  );
}

function trendPath(y0: number, amp: number, drift: number, seed: number) {
  let d = "";
  for (let x = 0; x <= 1200; x += 20) {
    const y = y0 - amp * Math.sin((x + seed) / 95) - drift * (x / 1200) + 6 * Math.sin(x / 13 + seed);
    d += `${x === 0 ? "M" : " L"}${x} ${Math.round(y)}`;
  }
  return d;
}

/** ICU Sentinel: vital trends, a crossed-out unreliable reading, and the quality gate. */
function Signal({ red, mid }: { red: string; mid: string }) {
  const POOR = new Set([15, 16, 17]);
  const label = { fill: mid, fontFamily: "Poppins, sans-serif", fontSize: 18, letterSpacing: 3 } as const;
  return (
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <text x="40" y="80" {...label}>HEART RATE</text>
      <path d={trendPath(230, 45, 70, 0)} stroke={red} strokeWidth="4" data-draw />
      <text x="40" y="330" {...label}>SpO2</text>
      <path d={trendPath(420, 18, 0, 40)} stroke={mid} strokeWidth="3" data-draw />
      {/* artifact: implausible SpO2 jumps from a loose probe, crossed out */}
      <path d="M700 420 L715 330 L730 500 L745 300 L760 480 L775 410" stroke={mid} strokeWidth="2" strokeDasharray="5 6" />
      <line x1="690" y1="300" x2="785" y2="505" stroke={red} strokeWidth="3" />
      <line x1="785" y1="300" x2="690" y2="505" stroke={red} strokeWidth="3" />
      <text x="800" y="318" fill={red} fontFamily="Bebas Neue, sans-serif" fontSize="30" letterSpacing="2">UNRELIABLE SIGNAL</text>
      <text x="800" y="348" {...label} fontSize={15}>RAISES A DEVICE ALERT</text>
      <text x="40" y="560" {...label}>SIGNAL QUALITY</text>
      {Array.from({ length: 24 }, (_, i) => {
        const poor = POOR.has(i);
        return (
          <g key={i}>
            <rect x={40 + i * 46} y="580" width="38" height="26" fill={poor ? "none" : red} stroke={red} strokeWidth="1.5" opacity={poor ? 1 : 0.85} />
            {poor && <path d={`M${44 + i * 46} 584 L${74 + i * 46} 602 M${74 + i * 46} 584 L${44 + i * 46} 602`} stroke={red} strokeWidth="1.5" />}
          </g>
        );
      })}
    </g>
  );
}

function Rag({ red, mid }: { red: string; mid: string }) {
  const pts = Array.from({ length: 64 }, (_, i) => ({ x: 640 + (i % 8) * 64, y: 110 + Math.floor(i / 8) * 64 }));
  const hits = new Set([10, 19, 27, 28, 36]);
  return (
    <g>
      <rect x="70" y="290" width="260" height="96" fill="none" stroke={mid} strokeWidth="2" />
      <text x="96" y="348" fill={mid} fontFamily="Bebas Neue, sans-serif" fontSize="40" letterSpacing="2">QUERY</text>
      {[...hits].map((h) => (
        <path key={h} d={`M330 338 C 480 338, 520 ${pts[h].y}, ${pts[h].x} ${pts[h].y}`} fill="none" stroke={red} strokeWidth="2.5" data-draw />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={hits.has(i) ? 11 : 5} fill={hits.has(i) ? red : mid} opacity={hits.has(i) ? 1 : 0.45} />
      ))}
      <text x="640" y="598" fill={mid} fontFamily="Poppins, sans-serif" fontSize="18" letterSpacing="3">VECTOR INDEX</text>
    </g>
  );
}

function Aml({ red, mid }: { red: string; mid: string }) {
  const rows = [0.62, 0.3, 0.84, 0.45, 0.22, 0.97, 0.38, 0.55, 0.71, 0.28];
  return (
    <g>
      {rows.map((v, i) => {
        const flagged = v > 0.8;
        return (
          <g key={i} transform={`translate(80 ${70 + i * 56})`}>
            <rect width="1040" height="40" fill="none" stroke={flagged ? red : mid} strokeOpacity={flagged ? 1 : 0.35} />
            <rect x="0" y="0" width={v * 700} height="40" fill={flagged ? red : mid} opacity={flagged ? 0.9 : 0.25} data-grow />
            {flagged && <text x="1020" y="28" textAnchor="end" fill={red} fontFamily="Bebas Neue, sans-serif" fontSize="26" letterSpacing="2">ALERT</text>}
          </g>
        );
      })}
    </g>
  );
}

function Chain({ red, mid }: { red: string; mid: string }) {
  const blocks = [0, 1, 2, 3, 4];
  const nodes = [
    [180, 520], [330, 590], [470, 500], [620, 600], [780, 520], [930, 590], [1060, 500],
  ];
  return (
    <g fill="none">
      {blocks.map((b) => (
        <g key={b}>
          <rect x={90 + b * 220} y="140" width="160" height="160" stroke={b === 2 ? red : mid} strokeWidth={b === 2 ? 4 : 2} fill={b === 2 ? red : "none"} fillOpacity="0.12" />
          {b < 4 && <line x1={250 + b * 220} y1="220" x2={310 + b * 220} y2="220" stroke={mid} strokeWidth="2" />}
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          {i < nodes.length - 1 && <line x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} stroke={mid} strokeOpacity="0.5" />}
          <circle cx={x} cy={y} r={i === 3 ? 14 : 8} fill={i === 3 ? red : mid} />
        </g>
      ))}
      <path d="M630 300 C 630 420, 620 480, 620 586" stroke={red} strokeWidth="3" strokeDasharray="10 8" data-draw />
    </g>
  );
}
