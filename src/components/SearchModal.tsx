import React, { useState } from 'react';
import { Search, X, Calendar, ArrowRight, Tag } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const sections = ['All', 'World', 'Business', 'Opinion', 'Cooking', 'Lifestyle', 'Sports', 'Well'];

  const filteredArticles = articles.filter((a) => {
    const matchesSection = selectedSection === 'All' || a.section.toLowerCase() === selectedSection.toLowerCase();
    const matchesQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.author.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesSection && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-12">
      <div className="relative w-full max-w-2xl bg-white border border-[#121212] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5e5e5e] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search The New York Times archive, articles, columnists..."
            autoFocus
            className="flex-1 font-serif text-base text-[#121212] placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#5e5e5e] hover:text-[#121212]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 border border-[#121212] text-xs font-label-section uppercase font-bold hover:bg-neutral-100"
          >
            Esc
          </button>
        </div>

        {/* Section Filters */}
        <div className="px-4 py-2 border-b border-[#e2e2e2] bg-[#f9f9f9] flex items-center gap-1.5 overflow-x-auto text-xs font-label-section uppercase">
          <span className="text-[#5e5e5e] text-[10px] mr-1">Section:</span>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-0.5 whitespace-nowrap transition-colors ${
                selectedSection === sec
                  ? 'bg-[#121212] text-white font-bold'
                  : 'text-[#5e5e5e] hover:text-[#121212]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#e2e2e2]">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-sm font-serif text-[#5e5e5e]">
              No articles matched your search query "{query}".
            </div>
          ) : (
            filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onClose();
                  onSelectArticle(art);
                }}
                className="py-3 first:pt-0 cursor-pointer group hover:bg-[#faf0ea]/50 transition-colors px-2 -mx-2"
              >
                <div className="flex items-center gap-2 text-[11px] font-label-section uppercase tracking-wider text-[#5e5e5e]">
                  <span className="font-bold text-[#121212]">{art.section}</span>
                  <span>•</span>
                  <span>{art.author}</span>
                  <span>•</span>
                  <span>{art.timeAgo}</span>
                </div>
                <h3 className="font-masthead font-bold text-base leading-snug text-[#121212] group-hover:underline mt-1">
                  {art.title}
                </h3>
                <p className="font-serif text-xs text-[#5e5e5e] line-clamp-2 mt-1">
                  {art.subtitle}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#e2e2e2] bg-[#f9f9f9] flex items-center justify-between text-xs font-caption text-[#5e5e5e]">
          <span>{filteredArticles.length} matching stories</span>
          <span>Indexed archive from 1851 to Present</span>
        </div>
      </div>
    </div>
  );
};
