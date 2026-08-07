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
    c.x = lerp(c.x, t.x, 0.08);
    c.y = lerp(c.y, t.y, 0.08);
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

  const Eye = ({ cx, cy, isHidden, forceLookLeft }) => {
    const r = 5.5;
    const maxMove = r * 0.45;
    
    // Calcula a posição da pupila baseada no mouse
    let px = cx + Math.max(-maxMove, Math.min(maxMove, eyeOffset.x * r));
    let py = cy + Math.max(-maxMove, Math.min(maxMove, eyeOffset.y * r));

    // Se tiver que olhar para a esquerda (quando a mão cobre o amarelo)
    if (forceLookLeft) {
      px = cx - maxMove;
      py = cy + maxMove * 0.2;
    }

    return (
      <g style={{ opacity: isHidden ? 0 : 1, transition: 'opacity 0s' }}>
        <circle cx={cx} cy={cy} r={r} fill="white" />
        <circle cx={px} cy={py} r={r * 0.55} fill="#111" />
      </g>
    );
  };

  return (
    <div className="w-full flex justify-center items-end mb-6" style={{ height: '140px' }}>
      <svg width="240" height="140" viewBox="0 0 240 140" className="overflow-visible">
        
        {/* 1. Laranja Semicírculo (Atrás, Esquerda) */}
        {/* Quando clica na senha, ele desliza para a direita, se escondendo atrás do roxo */}
        <g 
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: isPasswordFocused ? 'translateX(35px)' : 'translateX(0)' }}
        >
          <path d="M 10 140 A 45 45 0 0 1 100 140 Z" fill="#f97316" />
          <Eye cx={45} cy={110} isHidden={isPasswordFocused} />
          <Eye cx={65} cy={110} isHidden={isPasswordFocused} />
        </g>

        {/* 2. Preto Retângulo (Atrás, Direita) */}
        {/* Inclinado por padrão. Quando clica na senha, afunda para baixo */}
        <g 
          className="transition-transform duration-500 ease-in-out"
          style={{
            transformOrigin: '150px 140px',
            transform: isPasswordFocused 
              ? 'translateY(60px) rotate(0deg)' 
              : 'translateY(0px) rotate(-12deg)'
          }}
        >
          <rect x="120" y="30" width="38" height="110" rx="4" fill="#27272a" />
          <Eye cx={131} cy={50} isHidden={isPasswordFocused} />
          <Eye cx={147} cy={50} isHidden={isPasswordFocused} />
        </g>

        {/* 3. Amarelo Blob/Feijão (Direita) */}
        {/* Quando clica na senha, um braço preto surge e cobre seus olhos, e ele olha de canto */}
        <g className="transition-transform duration-500">
          <path d="M 140 140 L 140 60 Q 140 30 170 30 Q 200 30 200 60 L 200 140 Z" fill="#eab308" />
          <Eye cx={160} cy={60} isHidden={false} forceLookLeft={isPasswordFocused} />
          <Eye cx={180} cy={60} isHidden={false} forceLookLeft={isPasswordFocused} />
          
          {/* Braço preto cobrindo os olhos */}
          <path 
            d="M 205 75 Q 170 90 150 55" 
            stroke="#27272a" 
            strokeWidth="12" 
            strokeLinecap="round" 
            fill="none"
            className="transition-all duration-500 ease-in-out"
            style={{
              opacity: isPasswordFocused ? 1 : 0,
              transformOrigin: '200px 75px',
              transform: isPasswordFocused ? 'rotate(0deg)' : 'rotate(40deg) translateY(30px)'
            }}
          />
        </g>

        {/* 4. Roxo Retângulo Alto (Frente, Esquerda) */}
        {/* Quando clica na senha, a parte de cima dobra/dobra pra baixo cobrindo os próprios olhos */}
        <g transform="translate(60, 5)">
          {/* Corpo (parte de baixo, estática) */}
          <path d="M 0 55 L 45 55 L 45 135 L 0 135 Z" fill="#7c3aed" />
          
          {/* Os olhos ficam exatamente na emenda */}
          <Eye cx={13} cy={70} isHidden={isPasswordFocused} />
          <Eye cx={32} cy={70} isHidden={isPasswordFocused} />
          
          {/* Aba (parte de cima, que dobra) */}
          <path 
            d="M 0 5 Q 0 0 5 0 L 40 0 Q 45 0 45 5 L 45 55 L 0 55 Z" 
            fill={isPasswordFocused ? "#6d28d9" : "#7c3aed"} // Fica mais escuro quando dobra pra simular sombra
            className="transition-all duration-500 ease-in-out"
            style={{
              transformOrigin: '22.5px 55px', // Eixo de rotação exatamente na base da aba
              transform: isPasswordFocused ? 'scaleY(-1) rotate(-8deg) translateY(-2px)' : 'scaleY(1) rotate(0deg) translateY(0px)'
            }}
          />
        </g>
        
      </svg>
    </div>
  );
}
