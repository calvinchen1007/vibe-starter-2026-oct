import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ReadingListDrawerProps {
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const ReadingListDrawer: React.FC<ReadingListDrawerProps> = ({
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white border-l border-[#121212] shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e2e2] bg-[#f9f9f9]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-700 fill-amber-700" />
            <h3 className="font-masthead font-bold text-lg text-[#121212]">Reading List</h3>
            <span className="font-mono text-xs text-[#5e5e5e]">({savedArticles.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-neutral-300 mx-auto" />
              <p className="font-serif text-sm text-[#5e5e5e]">Your reading list is empty.</p>
              <p className="font-caption text-xs text-neutral-400">
                Tap the bookmark icon on any article to save it for later reading offline or on desktop.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3 border border-[#e2e2e2] bg-[#fdfdfd] hover:border-[#121212] transition-colors group relative"
              >
                <div className="flex justify-between items-start">
                  <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                    {art.section}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark(art.id);
                    }}
                    className="text-neutral-400 hover:text-red-700 p-0.5"
                    title="Remove from saved list"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4
                  onClick={() => {
                    onClose();
                    onSelectArticle(art);
                  }}
                  className="font-masthead font-bold text-sm leading-snug text-[#121212] group-hover:underline cursor-pointer mt-1"
                >
                  {art.title}
                </h4>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-[11px] font-caption text-[#5e5e5e]">
                  <span>{art.readTime}</span>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectArticle(art);
                    }}
                    className="font-bold text-[#121212] uppercase tracking-wider flex items-center hover:underline"
                  >
                    Read <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e2e2e2] bg-[#f9f9f9] text-center text-xs font-caption text-[#5e5e5e]">
          Saved stories are stored locally on your device
        </div>
      </div>
    </div>
  );
};
