import React from 'react';
import { X, BookOpen, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface TodaysPaperModalProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const sections = [
    { code: 'A', name: 'The Front Page & National News', count: '18 pages' },
    { code: 'B', name: 'Business & Technology', count: '12 pages' },
    { code: 'C', name: 'Arts & Cultural Digest', count: '10 pages' },
    { code: 'D', name: 'Opinion & Editorial Board', count: '6 pages' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#121212] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e2e2] bg-[#f9f9f9]">
          <div>
            <h3 className="font-masthead font-bold text-xl text-[#121212]">Today’s Paper</h3>
            <span className="font-caption text-xs text-[#5e5e5e]">
              Wednesday, May 24, 2024 • New York Print Edition • Vol. CLXXIII, No. 60,164
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Index */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sections.map((sec) => (
              <div
                key={sec.code}
                className="p-3 border border-[#121212] bg-[#fdfdfd] space-y-1 hover:bg-[#faf0ea] transition-colors cursor-pointer"
              >
                <div className="text-2xl font-masthead font-bold text-[#121212]">Section {sec.code}</div>
                <div className="font-serif text-xs font-semibold text-[#1a1c1c]">{sec.name}</div>
                <div className="font-mono text-[10px] text-[#5e5e5e]">{sec.count}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-label-section text-xs uppercase font-bold tracking-widest text-[#121212] border-b-2 border-[#121212] pb-1 mb-3">
              Front Page Articles In Print Order
            </h4>
            <div className="divide-y divide-[#e2e2e2]">
              {articles.map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onClose();
                    onSelectArticle(art);
                  }}
                  className="py-2.5 flex items-start justify-between gap-4 cursor-pointer group hover:bg-[#faf0ea]/50 px-2 -mx-2 transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#5e5e5e] w-6 shrink-0">
                      A{idx + 1}
                    </span>
                    <div>
                      <h5 className="font-masthead font-semibold text-sm text-[#121212] group-hover:underline">
                        {art.title}
                      </h5>
                      <span className="text-[11px] font-caption text-[#5e5e5e]">
                        {art.author} • {art.section}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#121212] shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e2e2e2] bg-[#f9f9f9] text-center text-xs font-caption text-[#5e5e5e]">
          Delivered daily to doorsteps and screens across the globe
        </div>
      </div>
    </div>
  );
};
