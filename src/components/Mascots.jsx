import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Mascots({ isPasswordFocused }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = useCallback(() => {
    const c = current.current;
    const t = target.current;
    c.x = lerp(c.x, t.x, 0.06);
    c.y = lerp(c.y, t.y, 0.06);
    setOffset({ x: c.x, y: c.y });
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  useEffect(() => {
    if (isPasswordFocused) target.current = { x: 0, y: 0 };
  }, [isPasswordFocused]);

  const pw = isPasswordFocused;

  // Olho simplíssimo: bolinha branca com ponto preto que se move
  const Dot = ({ x, y, s = 3.5 }) => {
    const move = s * 0.8;
    const px = pw ? x : x + Math.max(-move, Math.min(move, offset.x * s * 1.2));
    const py = pw ? y : y + Math.max(-move, Math.min(move, offset.y * s * 1.2));
    if (pw) {
      // Olho fechado — traço horizontal
      return (
        <line
          x1={x - s} y1={y} x2={x + s} y2={y}
          stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85"
        />
      );
    }
    return (
      <g>
        <circle cx={px} cy={py} r={s} fill="white" />
        <circle cx={px} cy={py} r={s * 0.4} fill="#111" />
      </g>
    );
  };

  return (
    <div className="w-full flex justify-center items-end mb-3" style={{ height: '150px' }}>
      <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible">

        {/* ── 1. MARROM – semicírculo grande (esquerda, fundo) ── */}
        <path
          d="M 10 150 A 55 55 0 0 1 120 150 Z"
          fill="#A0522D"
        />
        <Dot x={52} y={118} s={3.5} />
        <Dot x={72} y={118} s={3.5} />
        {/* boca */}
        <path
          d={pw ? "M 55 130 L 68 130" : "M 55 128 Q 62 135 68 128"}
          stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.75"
          style={{ transition: 'all 0.25s ease' }}
        />

        {/* ── 2. ROXO – retângulo alto (centro-esquerda) ── */}
        <rect x="70" y="20" width="50" height="130" rx="10" fill="#3B2D80" />
        <Dot x={86} y={62} s={3.5} />
        <Dot x={106} y={62} s={3.5} />
        <path
          d={pw ? "M 89 78 L 104 78" : "M 89 76 Q 96 84 104 76"}
          stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"
          style={{ transition: 'all 0.25s ease' }}
        />

        {/* ── 3. PRETO – retângulo médio (centro-direita) ── */}
        <rect x="122" y="42" width="42" height="108" rx="8" fill="#1C1C1C" />
        <Dot x={135} y={78} s={3} />
        <Dot x={152} y={78} s={3} />
        <path
          d={pw ? "M 137 92 L 150 92" : "M 137 90 Q 143 97 150 90"}
          stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"
          style={{ transition: 'all 0.25s ease' }}
        />

        {/* ── 4. MOSTARDA – capsula/domo pequeno (direita) ── */}
        <rect x="166" y="72" width="40" height="78" rx="18" fill="#7B6C1A" />
        <Dot x={179} y={100} s={3} />
        <Dot x={195} y={100} s={3} />
        <path
          d={pw ? "M 182 112 L 193 112" : "M 182 110 Q 187 117 193 110"}
          stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"
          style={{ transition: 'all 0.25s ease' }}
        />

      </svg>
    </div>
  );
}
