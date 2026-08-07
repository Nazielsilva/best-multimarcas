import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Mascots({ isPasswordFocused }) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    const target = targetRef.current;
    const current = currentRef.current;
    current.x = lerp(current.x, target.x, 0.08);
    current.y = lerp(current.y, target.y, 0.08);
    setEyeOffset({ x: current.x, y: current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  useEffect(() => {
    if (isPasswordFocused) targetRef.current = { x: 0, y: 0 };
  }, [isPasswordFocused]);

  // Olho individual com pupila que segue o mouse
  const Eye = ({ cx, cy, r = 7 }) => {
    const maxMove = r * 0.45;
    const px = isPasswordFocused ? cx : cx + Math.max(-maxMove, Math.min(maxMove, eyeOffset.x * r * 0.7));
    const py = isPasswordFocused ? cy : cy + Math.max(-maxMove, Math.min(maxMove, eyeOffset.y * r * 0.7));

    if (isPasswordFocused) {
      return (
        <g>
          {/* Olho fechado - linha curva */}
          <circle cx={cx} cy={cy} r={r} fill="white" opacity="0.95" />
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy} Z`}
            fill="#555"
          />
          <path
            d={`M ${cx - r * 0.85} ${cy} Q ${cx} ${cy + r * 0.55} ${cx + r * 0.85} ${cy}`}
            stroke="#444"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    }

    return (
      <g>
        {/* Esclerótica */}
        <circle cx={cx} cy={cy} r={r} fill="white" opacity="0.97" />
        {/* Íris escura */}
        <circle cx={px} cy={py} r={r * 0.55} fill="#1c1c2e" />
        {/* Reflexo principal */}
        <circle cx={px - r * 0.18} cy={py - r * 0.22} r={r * 0.18} fill="white" opacity="0.9" />
        {/* Reflexo secundário */}
        <circle cx={px + r * 0.12} cy={py + r * 0.1} r={r * 0.08} fill="white" opacity="0.5" />
      </g>
    );
  };

  // Braço genérico que sobe para cobrir os olhos
  const Arm = ({ x, y, flip = false, delay = 0, color }) => {
    const show = isPasswordFocused;
    const scaleX = flip ? -1 : 1;
    return (
      <g
        style={{
          opacity: show ? 1 : 0,
          transform: show ? `scaleX(${scaleX}) translateY(0px)` : `scaleX(${scaleX}) translateY(22px)`,
          transition: `opacity 0.3s ease ${delay}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
          transformOrigin: `${x}px ${y}px`,
        }}
      >
        {/* Braço */}
        <path
          d={`M ${x} ${y} Q ${x - 12} ${y - 20} ${x - 6} ${y - 38}`}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        {/* Mão */}
        <circle cx={x - 6} cy={y - 40} r={8} fill={color} />
        {/* Dedo 1 */}
        <ellipse cx={x - 12} cy={y - 47} rx={4} ry={5} fill={color} transform={`rotate(-15, ${x - 12}, ${y - 47})`} />
        {/* Dedo 2 */}
        <ellipse cx={x - 3} cy={y - 49} rx={4} ry={5} fill={color} />
        {/* Dedo 3 */}
        <ellipse cx={x + 5} cy={y - 46} rx={4} ry={4.5} fill={color} transform={`rotate(10, ${x + 5}, ${y - 46})`} />
      </g>
    );
  };

  return (
    <div className="w-full flex justify-center items-end mb-2" style={{ height: '130px' }}>
      <svg
        width="320"
        height="130"
        viewBox="0 0 320 130"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.12))' }}
      >

        {/* ── MONSTRO 1 (Esquerda) – Retângulo alto roxo ── */}
        <g>
          {/* Sombra */}
          <ellipse cx={60} cy={128} rx={32} ry={5} fill="rgba(0,0,0,0.1)" />
          {/* Corpo: retângulo alto com cantos arredondados */}
          <rect x="25" y="15" width="70" height="115" rx="14" fill="#7c3aed" />
          {/* Highlight */}
          <rect x="32" y="20" width="28" height="60" rx="10" fill="white" opacity="0.07" />
          {/* Olhos */}
          <Eye cx={48} cy={52} r={9} />
          <Eye cx={72} cy={52} r={9} />
          {/* Sorriso / frownzinho */}
          <path
            d={isPasswordFocused ? "M 48 78 Q 60 74 72 78" : "M 48 76 Q 60 86 72 76"}
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            style={{ transition: 'd 0.3s ease' }}
          />
          {/* Braços cobrindo olhos */}
          <Arm x={35} y={90} flip={false} delay={0} color="#6d28d9" />
          <Arm x={85} y={90} flip={true} delay={0} color="#6d28d9" />
        </g>

        {/* ── MONSTRO 2 (Centro) – Oval/feijão amarelo ── */}
        <g>
          {/* Chifre */}
          <path d="M 160 14 L 154 0 L 167 11 Z" fill="#d97706" />
          {/* Sombra */}
          <ellipse cx={160} cy={128} rx={28} ry={5} fill="rgba(0,0,0,0.1)" />
          {/* Corpo: oval mais alto que largo */}
          <ellipse cx={160} cy={78} rx={36} ry={55} fill="#f59e0b" />
          {/* Highlight */}
          <ellipse cx={149} cy={50} rx={12} ry={22} fill="white" opacity="0.1" />
          {/* Olhos */}
          <Eye cx={147} cy={66} r={8} />
          <Eye cx={173} cy={66} r={8} />
          {/* Sorriso */}
          <path
            d={isPasswordFocused ? "M 148 88 Q 160 84 172 88" : "M 148 86 Q 160 96 172 86"}
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            style={{ transition: 'd 0.3s ease' }}
          />
          {/* Braços */}
          <Arm x={131} y={96} flip={false} delay={50} color="#d97706" />
          <Arm x={189} y={96} flip={true} delay={50} color="#d97706" />
        </g>

        {/* ── MONSTRO 3 (Direita) – Quadrado/cubo vermelho ── */}
        <g>
          {/* Chifrinhos */}
          <path d="M 242 18 L 237 3 L 249 15 Z" fill="#b91c1c" />
          <path d="M{270} 20 L 265 5 L 277 17 Z" fill="#b91c1c" />
          {/* Sombra */}
          <ellipse cx={262} cy={128} rx={34} ry={5} fill="rgba(0,0,0,0.1)" />
          {/* Corpo: rect mais quadrado com cantos bem arredondados */}
          <rect x="228" y="20" width="68" height="110" rx="20" fill="#dc2626" />
          {/* Highlight */}
          <rect x="235" y="26" width="24" height="52" rx="10" fill="white" opacity="0.07" />
          {/* Olhos */}
          <Eye cx={250} cy={62} r={9.5} />
          <Eye cx={276} cy={62} r={9.5} />
          {/* Sorriso com dentinhos */}
          {!isPasswordFocused ? (
            <g>
              <path d="M 249 85 Q 263 97 277 85" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
              <rect x="255" y="85" width="5" height="5" rx="1.5" fill="white" opacity="0.55" />
              <rect x="262" y="85" width="5" height="5" rx="1.5" fill="white" opacity="0.55" />
              <rect x="269" y="85" width="5" height="5" rx="1.5" fill="white" opacity="0.55" />
            </g>
          ) : (
            <path d="M 250 87 Q 263 82 276 87" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" style={{ transition: 'all 0.3s ease' }} />
          )}
          {/* Braços */}
          <Arm x={238} y={96} flip={false} delay={100} color="#b91c1c" />
          <Arm x={290} y={96} flip={true} delay={100} color="#b91c1c" />
        </g>

      </svg>
    </div>
  );
}
