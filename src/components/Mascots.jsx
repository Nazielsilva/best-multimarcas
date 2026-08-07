import React, { useState, useEffect } from 'react';

export default function Mascots({ isPasswordFocused }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calcula a posição relativa do mouse na tela (-1 a 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Limite de movimento dos olhos
  const ex = isPasswordFocused ? 0 : mousePos.x * 3.5;
  const ey = isPasswordFocused ? 0 : mousePos.y * 3.5;

  // Função para desenhar os olhos
  const renderEyes = (cx, cy, spacing = 20, eyeColor = "white", pupilColor = "black") => {
    if (isPasswordFocused) {
      // Olhos fechados (como se estivessem espremidos/escondidos)
      return (
        <g>
          <path d={`M ${cx-6} ${cy} Q ${cx} ${cy-4} ${cx+6} ${cy}`} stroke={pupilColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d={`M ${cx+spacing-6} ${cy} Q ${cx+spacing} ${cy-4} ${cx+spacing+6} ${cy}`} stroke={pupilColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    }
    
    // Olhos abertos acompanhando o mouse
    return (
      <g>
        {/* Olho Esquerdo */}
        <circle cx={cx} cy={cy} r="6" fill={eyeColor} />
        <circle cx={cx + ex} cy={cy + ey} r="3" fill={pupilColor} />
        
        {/* Olho Direito */}
        <circle cx={cx + spacing} cy={cy} r="6" fill={eyeColor} />
        <circle cx={cx + spacing + ex} cy={cy + ey} r="3" fill={pupilColor} />
      </g>
    );
  };

  return (
    <div className="w-full flex justify-center items-end h-32 mb-6">
      <svg width="220" height="120" viewBox="0 0 220 120" className="overflow-visible">
        
        {/* Cara Roxo (Retângulo alto) */}
        <g className="transition-transform duration-300">
          <rect x="50" y="10" width="60" height="110" rx="8" fill="#7c3aed" />
          {renderEyes(70, 40, 20)}
        </g>

        {/* Cara Cinza Escuro (Retângulo torto) */}
        <g className="transition-transform duration-300 transform-gpu" style={{ transform: isPasswordFocused ? 'translateY(15px)' : 'translateY(0px)' }}>
          <path d="M 140 30 Q 140 20 150 20 L 180 20 Q 190 20 190 30 L 190 120 L 140 120 Z" fill="#27272a" />
          {renderEyes(155, 50, 20)}
        </g>

        {/* Cara Amarelo (Feijão) */}
        <g className="transition-transform duration-300 transform-gpu" style={{ transform: isPasswordFocused ? 'translateY(10px) translateX(5px)' : 'translateY(0px)' }}>
          <path d="M 115 50 Q 115 35 130 35 Q 145 35 145 50 L 145 120 L 115 120 Z" fill="#eab308" />
          {renderEyes(125, 60, 10)}
        </g>

        {/* Cara Laranja (Meio círculo) */}
        <g className="transition-transform duration-300 transform-gpu" style={{ transform: isPasswordFocused ? 'translateY(5px)' : 'translateY(0px)' }}>
          <path d="M 15 120 A 50 50 0 0 1 115 120 Z" fill="#f97316" />
          {renderEyes(55, 95, 20)}
        </g>
        
      </svg>
    </div>
  );
}
