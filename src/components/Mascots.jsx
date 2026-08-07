import React, { useState, useEffect, useRef, useCallback } from 'react';

// Monster component individual para isolar a lógica de cada personagem
function Monster({ cx, cy, bodyPath, bodyFill, accentFill, eyeL, eyeR, eyeRadius = 7, isPasswordFocused, eyeOffset, size = 1 }) {
  const pupilOffset = isPasswordFocused ? { x: 0, y: 0 } : eyeOffset;

  const renderEye = (ex, ey, r) => {
    const px = Math.max(ex - (r * 0.45), Math.min(ex + (r * 0.45), ex + pupilOffset.x * r * 0.55));
    const py = Math.max(ey - (r * 0.45), Math.min(ey + (r * 0.45), ey + pupilOffset.y * r * 0.55));
    return (
      <g>
        {/* Iris */}
        <circle cx={ex} cy={ey} r={r} fill="white" />
        {/* Sombra interna sutil */}
        <circle cx={ex} cy={ey + r * 0.1} r={r * 0.9} fill="white" opacity="0.5" />
        {/* Pupila */}
        <circle cx={px} cy={py} r={r * 0.52} fill="#1a1a2e" />
        {/* Reflexo de luz */}
        <circle cx={px - r * 0.18} cy={py - r * 0.22} r={r * 0.17} fill="white" opacity="0.9" />
        <circle cx={px + r * 0.15} cy={py + r * 0.12} r={r * 0.09} fill="white" opacity="0.6" />
      </g>
    );
  };

  const renderClosedEye = (ex, ey, r) => (
    <g>
      <circle cx={ex} cy={ey} r={r} fill="white" />
      {/* Pálpebra descendo */}
      <path
        d={`M ${ex - r} ${ey} A ${r} ${r} 0 0 0 ${ex + r} ${ey} Z`}
        fill={bodyFill}
        style={{ transition: 'all 0.3s ease' }}
      />
      {/* Cílio */}
      <path d={`M ${ex - r * 0.8} ${ey} Q ${ex} ${ey + r * 0.3} ${ex + r * 0.8} ${ey}`} stroke={bodyFill} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );

  return (
    <g>
      {/* Sombra do corpo */}
      <ellipse cx={cx} cy={cy + 5} rx={30 * size} ry={6 * size} fill="rgba(0,0,0,0.12)" />
      {/* Corpo */}
      <path d={bodyPath} fill={bodyFill} />
      {/* Destaque no corpo */}
      <path d={bodyPath} fill={`url(#grad-${cx})`} opacity="0.3" />

      {/* Olhos */}
      {isPasswordFocused
        ? <>{renderClosedEye(eyeL.x, eyeL.y, eyeRadius)}{renderClosedEye(eyeR.x, eyeR.y, eyeRadius)}</>
        : <>{renderEye(eyeL.x, eyeL.y, eyeRadius)}{renderEye(eyeR.x, eyeR.y, eyeRadius)}</>
      }
    </g>
  );
}

export default function Mascots({ isPasswordFocused }) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Smooth lerp para suavizar o movimento dos olhos
  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    const target = targetRef.current;
    const current = currentRef.current;
    const t = 0.08;

    current.x = lerp(current.x, target.x, t);
    current.y = lerp(current.y, target.y, t);

    setEyeOffset({ x: current.x, y: current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1);
      const y = ((e.clientY / window.innerHeight) * 2 - 1);
      targetRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Quando senha está focada, os olhos voltam ao centro suavemente
  useEffect(() => {
    if (isPasswordFocused) targetRef.current = { x: 0, y: 0 };
  }, [isPasswordFocused]);

  return (
    <div className="w-full flex justify-center items-end mb-2" style={{ height: '140px' }}>
      <svg
        width="300"
        height="140"
        viewBox="0 0 300 140"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.08))' }}
      >
        <defs>
          {/* Gradientes para highlight */}
          <radialGradient id="grad-60" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad-150" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad-240" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── MONSTRO 1 (Esquerda) – Gordo roxo ── */}
        <g style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {/* Orelhas/antenas */}
          <ellipse cx={30} cy={32} rx={7} ry={5} fill="#6d28d9" transform="rotate(-25, 30, 32)" />
          <ellipse cx={88} cy={35} rx={7} ry={5} fill="#6d28d9" transform="rotate(25, 88, 35)" />
          {/* Corpo blob */}
          <path
            d="M 60 20 C 20 20, 15 50, 15 75 C 15 110, 30 130, 60 132 C 90 130, 105 110, 105 75 C 105 50, 100 20, 60 20 Z"
            fill="#7c3aed"
          />
          <path
            d="M 60 20 C 20 20, 15 50, 15 75 C 15 110, 30 130, 60 132 C 90 130, 105 110, 105 75 C 105 50, 100 20, 60 20 Z"
            fill="url(#grad-60)"
          />
          {/* Olho Esquerdo */}
          <g>
            {isPasswordFocused ? (
              <>
                <circle cx={45} cy={68} r={9} fill="white" />
                <path d={`M 36 68 A 9 9 0 0 0 54 68 Z`} fill="#7c3aed" />
                <path d={`M 37.5 68 Q 45 74 52.5 68`} stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx={45} cy={68} r={9} fill="white" />
                <circle cx={Math.max(39, Math.min(51, 45 + eyeOffset.x * 5))} cy={Math.max(62, Math.min(74, 68 + eyeOffset.y * 5))} r={4.7} fill="#1a1a2e" />
                <circle cx={Math.max(39, Math.min(51, 45 + eyeOffset.x * 5)) - 1.5} cy={Math.max(62, Math.min(74, 68 + eyeOffset.y * 5)) - 2} r={1.6} fill="white" opacity="0.9" />
              </>
            )}
          </g>
          {/* Olho Direito */}
          <g>
            {isPasswordFocused ? (
              <>
                <circle cx={75} cy={68} r={9} fill="white" />
                <path d={`M 66 68 A 9 9 0 0 0 84 68 Z`} fill="#7c3aed" />
                <path d={`M 67.5 68 Q 75 74 82.5 68`} stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx={75} cy={68} r={9} fill="white" />
                <circle cx={Math.max(69, Math.min(81, 75 + eyeOffset.x * 5))} cy={Math.max(62, Math.min(74, 68 + eyeOffset.y * 5))} r={4.7} fill="#1a1a2e" />
                <circle cx={Math.max(69, Math.min(81, 75 + eyeOffset.x * 5)) - 1.5} cy={Math.max(62, Math.min(74, 68 + eyeOffset.y * 5)) - 2} r={1.6} fill="white" opacity="0.9" />
              </>
            )}
          </g>
          {/* Sorriso */}
          <path d={isPasswordFocused ? "M 50 92 Q 60 90 70 92" : "M 50 92 Q 60 102 70 92"} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" style={{ transition: 'all 0.3s ease' }} />
          {/* Bracinho cobrindo (quando senha) */}
          <g style={{ opacity: isPasswordFocused ? 1 : 0, transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', transform: isPasswordFocused ? 'translateY(0)' : 'translateY(25px)', transformOrigin: '60px 100px' }}>
            <path d="M 25 90 Q 15 70, 30 55 Q 32 52, 38 56 Q 25 70, 33 88 Z" fill="#6d28d9" />
            <path d="M 95 90 Q 105 70, 90 55 Q 88 52, 82 56 Q 95 70, 87 88 Z" fill="#6d28d9" />
            {/* Mãozinhas */}
            <ellipse cx={34} cy={53} rx={6} ry={5} fill="#7c3aed" transform="rotate(-20, 34, 53)" />
            <ellipse cx={86} cy={53} rx={6} ry={5} fill="#7c3aed" transform="rotate(20, 86, 53)" />
          </g>
        </g>

        {/* ── MONSTRO 2 (Centro) – Alto amarelo ── */}
        <g style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {/* Chifre */}
          <path d="M 148 15 L 143 0 L 155 12 Z" fill="#d97706" />
          {/* Corpo blob alto */}
          <path
            d="M 150 18 C 128 18, 122 42, 122 70 C 122 108, 132 135, 150 136 C 168 135, 178 108, 178 70 C 178 42, 172 18, 150 18 Z"
            fill="#f59e0b"
          />
          <path
            d="M 150 18 C 128 18, 122 42, 122 70 C 122 108, 132 135, 150 136 C 168 135, 178 108, 178 70 C 178 42, 172 18, 150 18 Z"
            fill="url(#grad-150)"
          />
          {/* Olho Esquerdo */}
          {isPasswordFocused ? (
            <>
              <circle cx={139} cy={65} r={8} fill="white" />
              <path d={`M 131 65 A 8 8 0 0 0 147 65 Z`} fill="#f59e0b" />
              <path d={`M 132.5 65 Q 139 71 145.5 65`} stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx={139} cy={65} r={8} fill="white" />
              <circle cx={Math.max(133, Math.min(145, 139 + eyeOffset.x * 4.5))} cy={Math.max(59, Math.min(71, 65 + eyeOffset.y * 4.5))} r={4.2} fill="#1a1a2e" />
              <circle cx={Math.max(133, Math.min(145, 139 + eyeOffset.x * 4.5)) - 1.3} cy={Math.max(59, Math.min(71, 65 + eyeOffset.y * 4.5)) - 1.8} r={1.4} fill="white" opacity="0.9" />
            </>
          )}
          {/* Olho Direito */}
          {isPasswordFocused ? (
            <>
              <circle cx={161} cy={65} r={8} fill="white" />
              <path d={`M 153 65 A 8 8 0 0 0 169 65 Z`} fill="#f59e0b" />
              <path d={`M 154.5 65 Q 161 71 167.5 65`} stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx={161} cy={65} r={8} fill="white" />
              <circle cx={Math.max(155, Math.min(167, 161 + eyeOffset.x * 4.5))} cy={Math.max(59, Math.min(71, 65 + eyeOffset.y * 4.5))} r={4.2} fill="#1a1a2e" />
              <circle cx={Math.max(155, Math.min(167, 161 + eyeOffset.x * 4.5)) - 1.3} cy={Math.max(59, Math.min(71, 65 + eyeOffset.y * 4.5)) - 1.8} r={1.4} fill="white" opacity="0.9" />
            </>
          )}
          {/* Sorriso */}
          <path d={isPasswordFocused ? "M 141 86 Q 150 84 159 86" : "M 141 86 Q 150 96 159 86"} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" style={{ transition: 'all 0.3s ease' }} />
          {/* Bracinho cobrindo (quando senha) */}
          <g style={{ opacity: isPasswordFocused ? 1 : 0, transition: 'opacity 0.3s ease 0.05s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.05s', transform: isPasswordFocused ? 'translateY(0)' : 'translateY(25px)', transformOrigin: '150px 100px' }}>
            <path d="M 128 82 Q 118 62, 133 48 Q 135 45, 141 49 Q 127 62, 136 80 Z" fill="#d97706" />
            <path d="M 172 82 Q 182 62, 167 48 Q 165 45, 159 49 Q 173 62, 164 80 Z" fill="#d97706" />
            <ellipse cx={137} cy={46} rx={6} ry={5} fill="#f59e0b" transform="rotate(-20, 137, 46)" />
            <ellipse cx={163} cy={46} rx={6} ry={5} fill="#f59e0b" transform="rotate(20, 163, 46)" />
          </g>
        </g>

        {/* ── MONSTRO 3 (Direita) – Redondo vermelho ── */}
        <g style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {/* Chifrinhos */}
          <path d="M 227 30 L 222 15 L 234 27 Z" fill="#b91c1c" />
          <path d="M 257 30 L 252 15 L 264 27 Z" fill="#b91c1c" />
          {/* Corpo blob */}
          <path
            d="M 242 28 C 213 28, 200 52, 200 78 C 200 112, 218 138, 242 139 C 266 138, 284 112, 284 78 C 284 52, 271 28, 242 28 Z"
            fill="#dc2626"
          />
          <path
            d="M 242 28 C 213 28, 200 52, 200 78 C 200 112, 218 138, 242 139 C 266 138, 284 112, 284 78 C 284 52, 271 28, 242 28 Z"
            fill="url(#grad-240)"
          />
          {/* Olho Esquerdo */}
          {isPasswordFocused ? (
            <>
              <circle cx={228} cy={75} r={9.5} fill="white" />
              <path d={`M 218.5 75 A 9.5 9.5 0 0 0 237.5 75 Z`} fill="#dc2626" />
              <path d={`M 220 75 Q 228 82 236 75`} stroke="#dc2626" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx={228} cy={75} r={9.5} fill="white" />
              <circle cx={Math.max(221, Math.min(235, 228 + eyeOffset.x * 5.5))} cy={Math.max(68, Math.min(82, 75 + eyeOffset.y * 5.5))} r={5} fill="#1a1a2e" />
              <circle cx={Math.max(221, Math.min(235, 228 + eyeOffset.x * 5.5)) - 1.6} cy={Math.max(68, Math.min(82, 75 + eyeOffset.y * 5.5)) - 2.2} r={1.8} fill="white" opacity="0.9" />
            </>
          )}
          {/* Olho Direito */}
          {isPasswordFocused ? (
            <>
              <circle cx={256} cy={75} r={9.5} fill="white" />
              <path d={`M 246.5 75 A 9.5 9.5 0 0 0 265.5 75 Z`} fill="#dc2626" />
              <path d={`M 248 75 Q 256 82 264 75`} stroke="#dc2626" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx={256} cy={75} r={9.5} fill="white" />
              <circle cx={Math.max(249, Math.min(263, 256 + eyeOffset.x * 5.5))} cy={Math.max(68, Math.min(82, 75 + eyeOffset.y * 5.5))} r={5} fill="#1a1a2e" />
              <circle cx={Math.max(249, Math.min(263, 256 + eyeOffset.x * 5.5)) - 1.6} cy={Math.max(68, Math.min(82, 75 + eyeOffset.y * 5.5)) - 2.2} r={1.8} fill="white" opacity="0.9" />
            </>
          )}
          {/* Sorrisão com dentinhos */}
          {!isPasswordFocused ? (
            <g>
              <path d="M 228 97 Q 242 110 256 97" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
              <rect x="234" y="97" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="241" y="97" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="248" y="97" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            </g>
          ) : (
            <path d="M 231 98 Q 242 94 253 98" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" style={{ transition: 'all 0.3s ease' }} />
          )}
          {/* Bracinho cobrindo */}
          <g style={{ opacity: isPasswordFocused ? 1 : 0, transition: 'opacity 0.3s ease 0.1s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s', transform: isPasswordFocused ? 'translateY(0)' : 'translateY(28px)', transformOrigin: '242px 110px' }}>
            <path d="M 207 95 Q 195 72, 212 55 Q 215 51, 221 56 Q 207 73, 217 93 Z" fill="#b91c1c" />
            <path d="M 277 95 Q 289 72, 272 55 Q 269 51, 263 56 Q 277 73, 267 93 Z" fill="#b91c1c" />
            <ellipse cx={218} cy={53} rx={7} ry={6} fill="#dc2626" transform="rotate(-20, 218, 53)" />
            <ellipse cx={266} cy={53} rx={7} ry={6} fill="#dc2626" transform="rotate(20, 266, 53)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
