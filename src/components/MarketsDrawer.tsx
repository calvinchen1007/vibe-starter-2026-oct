import React from 'react';
import { X, TrendingUp, TrendingDown, Sun, Cloud, DollarSign } from 'lucide-react';

interface MarketsDrawerProps {
  onClose: () => void;
}

const INDICES = [
  { name: 'S&P 500', value: '5,304.72', change: '+22.41', pct: '+0.42%', up: true },
  { name: 'Nasdaq Composite', value: '16,832.62', change: '+99.26', pct: '+0.59%', up: true },
  { name: 'Dow Jones', value: '39,671.04', change: '-201.95', pct: '-0.51%', up: false },
  { name: '10-Yr US Treasury', value: '4.43%', change: '+0.02', pct: '+0.45%', up: true },
  { name: 'Crude Oil (WTI)', value: '$77.57', change: '-1.09', pct: '-1.39%', up: false },
  { name: 'Gold (Oz)', value: '$2,352.40', change: '-26.30', pct: '-1.11%', up: false },
  { name: 'EUR / USD', value: '1.0821', change: '-0.0035', pct: '-0.32%', up: false },
];

export const MarketsDrawer: React.FC<MarketsDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white border-l border-[#121212] shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e2e2] bg-[#f9f9f9]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h3 className="font-masthead font-bold text-lg text-[#121212]">Markets & Weather</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Weather card */}
          <div className="p-4 border border-[#e2e2e2] bg-[#fdfdfd] space-y-2">
            <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
              New York, NY Forecast
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-amber-500" />
                <div>
                  <div className="text-3xl font-serif font-bold text-[#121212]">68°F</div>
                  <div className="text-xs font-serif text-[#5e5e5e]">Partly Cloudy • Humidity 48%</div>
                </div>
              </div>
              <div className="text-right text-xs font-mono">
                <div>High: 74°F</div>
                <div className="text-[#5e5e5e]">Low: 56°F</div>
              </div>
            </div>
          </div>

          {/* Indices table */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-[#121212] pb-1">
              <span className="font-label-section text-xs uppercase font-bold text-[#121212]">
                Key Financial Indices
              </span>
              <span className="font-caption text-[11px] text-[#5e5e5e]">Delayed 15m</span>
            </div>

            <div className="divide-y divide-[#e2e2e2]">
              {INDICES.map((idx) => (
                <div key={idx.name} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#121212] block">{idx.name}</span>
                    <span className="font-mono text-xs text-[#5e5e5e]">{idx.value}</span>
                  </div>
                  <div className={`font-mono text-right ${idx.up ? 'text-emerald-700' : 'text-rose-700'}`}>
                    <div className="font-semibold">{idx.pct}</div>
                    <div className="text-[11px]">{idx.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e2e2e2] bg-[#f9f9f9] text-center text-xs font-caption text-[#5e5e5e]">
          The New York Times DealBook & Markets Desk
        </div>
      </div>
    </div>
  );
};
