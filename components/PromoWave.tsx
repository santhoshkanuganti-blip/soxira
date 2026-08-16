export default function PromoWave({ side, className = '' }: { side: 'left' | 'right'; className?: string }) {
  const fadeDirection = side === 'left' ? 'to right' : 'to left';
  const maskImage = `linear-gradient(${fadeDirection}, black 45%, transparent 95%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, var(--color-accent-bright) 1.5px, transparent 1.5px)',
        backgroundSize: '11px 11px',
        backgroundPosition: side === 'left' ? '0 0' : '100% 0',
        WebkitMaskImage: maskImage,
        maskImage,
        opacity: 0.6,
      }}
    />
  );
}
