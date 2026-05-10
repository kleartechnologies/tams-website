'use client';

import { goToSignup } from '@/lib/navigation';


const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  dark?: boolean;
  planKey?: 'GROWTH' | 'PRO';
}

export default function PricingCard({
  title,
  price,
  period = '/ month',
  description,
  features,
  cta,
  highlight = false,
  dark = false,
  planKey,
}: PricingCardProps) {
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 28,
    border: dark ? 'none' : highlight ? '2px solid #3b82f6' : '1px solid #e5e7eb',
    background: dark
      ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
      : '#ffffff',
    boxShadow: highlight ? '0 8px 32px rgba(59,130,246,0.18)' : dark ? '0 8px 32px rgba(0,0,0,0.22)' : '0 1px 4px rgba(0,0,0,0.06)',
  };

  const ink   = dark ? '#ffffff'  : '#111827';
  const muted = dark ? '#94a3b8'  : '#6b7280';
  const line  = dark ? '#1e3a5f'  : '#f3f4f6';

  const checkBg    = dark ? 'rgba(52,211,153,0.15)' : '#dcfce7';
  const checkColor = dark ? '#34d399' : '#16a34a';

  const btnStyle: React.CSSProperties = dark
    ? { background: '#ffffff', color: '#0f172a', border: 'none' }
    : highlight
    ? { background: '#2563eb', color: '#ffffff', border: 'none' }
    : { background: '#f3f4f6', color: '#374151', border: 'none' };

  return (
    <div style={cardStyle}>

      {/* Badge */}
      {highlight && (
        <span style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: '#2563eb', color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap',
        }}>
          MOST POPULAR
        </span>
      )}

      {/* Plan name */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, color: ink, marginBottom: 4 }}>{title}</h3>
        <p style={{ fontSize: 13, color: muted }}>{description}</p>
      </div>

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
        {price === '0' ? (
          <span style={{ fontSize: 38, fontWeight: 700, color: ink, lineHeight: 1 }}>Free</span>
        ) : (
          <>
            <span style={{ fontSize: 14, fontWeight: 500, color: muted }}>RM</span>
            <span style={{ fontSize: 38, fontWeight: 700, color: ink, lineHeight: 1 }}>{price}</span>
            <span style={{ fontSize: 13, color: muted }}>{period}</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: line, marginBottom: 20 }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {features.map((f, i) => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{
              flexShrink: 0, marginTop: 1,
              width: 18, height: 18, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: checkBg, color: checkColor,
            }}>
              <CheckIcon />
            </span>
            <span style={{ fontSize: 13.5, color: i === 0 ? ink : muted, fontWeight: i === 0 ? 600 : 400 }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — pinned to bottom */}
      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <button
          type="button"
          onClick={() => goToSignup(planKey)}
          style={{
            ...btnStyle,
            width: '100%',
            padding: '11px 0',
            borderRadius: 10,
            fontSize: 13.5,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {cta}
        </button>
      </div>

    </div>
  );
}
