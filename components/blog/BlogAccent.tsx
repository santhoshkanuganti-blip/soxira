const CATEGORY_COLOR: Record<string, string> = {
  AI: '#8B5CF6',
  MSMEs: '#0EA5E9',
  Distribution: '#06B6D4',
  Manufacturing: '#10B981',
  Finance: '#EAB308',
  Insurance: '#EC4899',
  'Data Engineering': '#14B8A6',
  VitaranAI: '#D946EF',
};

export default function BlogAccent({ category }: { category?: string | null }) {
  const color = CATEGORY_COLOR[category ?? ''] ?? '#8B5CF6';

  return (
    <div className="relative h-[72px] overflow-hidden bg-[#07070f]">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${color}30 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      {/* Top glow bloom */}
      <div
        className="absolute -top-8 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: `${color}50` }}
      />
      {/* Glowing scan line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)` }}
      />
      {/* Corner brackets — top left */}
      <div
        className="absolute left-3 top-2.5 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px]"
        style={{ borderColor: `${color}80` }}
      />
      {/* Corner brackets — top right */}
      <div
        className="absolute right-3 top-2.5 h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px]"
        style={{ borderColor: `${color}80` }}
      />
    </div>
  );
}
