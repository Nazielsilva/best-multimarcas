import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Mascots({ isPasswordFocused }) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    const t = targetRef.current;
    const c = currentRef.current;
    c.x = lerp(c.x, t.x, 0.07);
    c.y = lerp(c.y, t.y, 0.07);
    setEyeOffset({ x: c.x, y: c.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  useEffect(() => {
    if (isPasswordFocused) targetRef.current = { x: 0, y: 0 };
  }, [isPasswordFocused]);

  // Olho simples que segue o mouse
  const Eye = ({ cx, cy, r = 5 }) => {
    const limit = r * 0.42;
    const px = isPasswordFocused ? cx : cx + Math.max(-limit, Math.min(limit, eyeOffset.x * r * 0.65));
    const py = isPasswordFocused ? cy : cy + Math.max(-limit, Math.min(limit, eyeOffset.y * r * 0.65));

    if (isPasswordFocused) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={r} fill="white" opacity="0.92" />
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy} Z`} fill="rgba(0,0,0,0.55)" />
          <path d={`M ${cx - r * 0.8} ${cy} Q ${cx} ${cy + r * 0.6} ${cx + r * 0.8} ${cy}`}
            stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      );
    }
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="white" opacity="0.92" />
        <circle cx={px} cy={py} r={r * 0.52} fill="#111" />
        <circle cx={px - r * 0.18} cy={py - r * 0.22} r={r * 0.18} fill="white" opacity="0.85" />
      </g>
    );
  };

  // Braço subindo para cobrir os olhos
  const CoverArm = ({ x, y, side = 'left', color, delay = 0 }) => {
    const d = side === 'left'
      ? `M ${x} ${y} C ${x - 10} ${y - 15}, ${x - 8} ${y - 28}, ${x - 4} ${y - 38}`
      : `M ${x} ${y} C ${x + 10} ${y - 15}, ${x + 8} ${y - 28}, ${x + 4} ${y - 38}`;
    const hx = side === 'left' ? x - 4 : x + 4;
    const hy = y - 40;
    return (
      <g style={{
        opacity: isPasswordFocused ? 1 : 0,
        transform: isPasswordFocused ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.35s ease ${delay}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}>
        <path d={d} stroke={color} strokeWidth="9" fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={7} fill={color} />
        {/* Dedos */}
        <circle cx={side === 'left' ? hx - 5 : hx + 5} cy={hy - 6} r={4} fill={color} />
        <circle cx={hx} cy={hy - 8} r={4} fill={color} />
        <circle cx={side === 'left' ? hx + 4 : hx - 4} cy={hy - 6} r={4} fill={color} />
      </g>
    );
  };

  return (
    <div className="w-full flex justify-center items-end mb-1" style={{ height: '160px' }}>
      <svg width="260" height="160" viewBox="0 0 260 160" className="overflow-visible">

        {/* ── MARROM (semicírculo grande, atrás à esquerda) ── */}
        <g>
          <ellipse cx={128} cy={160} rx={42} ry={4} fill="rgba(0,0,0,0.18)" />
          {/* Corpo: círculo cheio, parece um cogumelo/semicírculo pq a base some */}
          <circle cx={85} cy={122} r={44} fill="#7c3000" />
          <circle cx={85} cy={122} r={44} fill="#8B4513" />
          {/* Highlight */}
          <ellipse cx={72} cy={105} rx={14} ry={18} fill="white" opacity="0.06" />
          {/* Olhos — próximos um do outro, pequenos e fofos */}
          <Eye cx={75} cy={112} r={6} />
          <Eye cx={96} cy={112} r={6} />
          {/* Sorriso */}
          <path
            d={isPasswordFocused ? "M 73 127 Q 85 123 97 127" : "M 73 125 Q 85 135 97 125"}
            stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"
            style={{ transition: 'all 0.3s ease' }}
          />
          {/* Braços */}
          <CoverArm x={60} y={130} side="left" color="#6b3209" delay={80} />
          <CoverArm x={110} y={130} side="right" color="#6b3209" delay={80} />
        </g>

        {/* ── PRETO (retângulo alto, atrás do roxo) ── */}
        <g>
          {/* Corpo: rect escuro */}
          <rect x="135" y="40" width="52" height="120" rx="10" fill="#1a1a1a" />
          <rect x="140" y="46" width="18" height="50" rx="7" fill="white" opacity="0.04" />
          {/* Olhos pequenos */}
          <Eye cx={151} cy={78} r={5.5} />
          <Eye cx={171} cy={78} r={5.5} />
          {/* Boca minimalista */}
          <path
            d={isPasswordFocused ? "M 151 97 Q 161 94 171 97" : "M 151 95 Q 161 103 171 95"}
            stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"
            style={{ transition: 'all 0.3s ease' }}
          />
          {/* Braços */}
          <CoverArm x={140} y={105} side="left" color="#111" delay={40} />
          <CoverArm x={182} y={105} side="right" color="#111" delay={40} />
        </g>

        {/* ── ROXO (retângulo alto, na frente, levemente inclinado) ── */}
        <g transform="rotate(-3, 110, 80)">
          <rect x="85" y="18" width="58" height="122" rx="12" fill="#5b3f9e" />
          <rect x="92" y="25" width="20" height="55" rx="8" fill="white" opacity="0.07" />
          {/* Olhos */}
          <Eye cx={104} cy={60} r={6} />
          <Eye cx={125} cy={60} r={6} />
          {/* Boca */}
          <path
            d={isPasswordFocused ? "M 103 82 Q 114 78 125 82" : "M 103 80 Q 114 90 125 80"}
            stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"
            style={{ transition: 'all 0.3s ease' }}
          />
          {/* Braços */}
          <CoverArm x={90} y={108} side="left" color="#4c2e8a" delay={0} />
          <CoverArm x={138} y={108} side="right" color="#4c2e8a" delay={0} />
        </g>

        {/* ── MOSTARDA/OLIVE (pequeno oval, direita) ── */}
        <g>
          <ellipse cx={205} cy={155} rx={20} ry={4} fill="rgba(0,0,0,0.15)" />
          {/* Corpo: oval em pé */}
          <ellipse cx={205} cy={118} rx={22} ry={38} fill="#5a520a" />
          <ellipse cx={205} cy={118} rx={22} ry={38} fill="#6b6218" />
          <ellipse cx={198} cy={100} rx={7} ry={14} fill="white" opacity="0.06" />
          {/* Um olhinho só (de lado) */}
          <Eye cx={198} cy={110} r={5} />
          <Eye cx={214} cy={110} r={5} />
          {/* Bocão neutro */}
          <path
            d={isPasswordFocused ? "M 197 126 Q 205 123 213 126" : "M 197 124 Q 205 130 213 124"}
            stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"
            style={{ transition: 'all 0.3s ease' }}
          />
          {/* Braços */}
          <CoverArm x={190} y={130} side="left" color="#514c08" delay={120} />
          <CoverArm x={220} y={130} side="right" color="#514c08" delay={120} />
        </g>

      </svg>
    </div>
  );
}
