import React from 'react';
import { X, Clock, ShieldAlert, ArrowRight, Share2, Check } from 'lucide-react';
import { Article } from '../types';

interface LiveUpdatesDrawerProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  leadArticle: Article;
}

interface UpdateItem {
  id: string;
  time: string;
  title: string;
  body: string;
  author: string;
  location: string;
}

const UPDATES: UpdateItem[] = [
  {
    id: 'u1',
    time: '8m ago',
    title: 'Cease-fire discussions resume in Cairo with renewed draft language',
    body: 'Mediators from Egypt and Qatar delivered a revised three-phase framework to delegation envoys in Cairo on Wednesday afternoon. Key modifications address phased troop redeployments and corridor access for emergency aid convoys.',
    author: 'Vivian Yee',
    location: 'Cairo',
  },
  {
    id: 'u2',
    time: '24m ago',
    title: 'Aid convoy clearance protocols expanded across southern crossings',
    body: 'United Nations relief coordinators confirmed that 65 trucks carrying grain, surgical supplies, and water purification units were cleared through inspection gates following bilateral security verification.',
    author: 'Hiba Yazbek',
    location: 'Rafah Crossing',
  },
  {
    id: 'u3',
    time: '1h ago',
    title: 'Security Council schedules emergency closed consultation',
    body: 'The UN Security Council in New York will convene at 3:00 PM Eastern for a closed briefing by the Special Envoy for the Middle East peace process.',
    author: 'Farnaz Fassihi',
    location: 'United Nations, New York',
  },
  {
    id: 'u4',
    time: '2h ago',
    title: 'European Union leaders pledge €150 million for regional humanitarian corridor',
    body: 'European Commission President Ursula von der Leyen announced supplementary humanitarian commitments during a joint briefing in Brussels, urging uninterrupted maritime supply lanes.',
    author: 'Matina Stevis-Gridneff',
    location: 'Brussels',
  },
];

export const LiveUpdatesDrawer: React.FC<LiveUpdatesDrawerProps> = ({
  onClose,
  onSelectArticle,
  leadArticle,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border-l border-[#121212] shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e2e2] bg-[#f9f9f9]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#D0021B] text-white font-label-section text-[10px] uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live Briefing
            </span>
            <span className="font-label-byline text-xs text-[#5e5e5e]">Continuous coverage</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title Banner */}
        <div className="p-5 border-b border-[#e2e2e2] bg-white">
          <h2 className="font-masthead text-xl font-bold leading-snug text-[#121212]">
            Key Developments Across Geopolitical Talks and Regional Security
          </h2>
          <div className="flex items-center justify-between mt-2 text-xs font-label-byline text-[#5e5e5e]">
            <span>Updated continuous live stream</span>
            <button
              onClick={() => {
                onClose();
                onSelectArticle(leadArticle);
              }}
              className="font-bold text-[#121212] uppercase tracking-wider flex items-center hover:underline"
            >
              Read Full Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Updates Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 divide-y divide-[#e2e2e2]">
          {UPDATES.map((update) => (
            <div key={update.id} className="pt-5 first:pt-0 space-y-2">
              <div className="flex items-center justify-between text-xs font-label-byline">
                <span className="font-bold text-[#D0021B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {update.time}
                </span>
                <span className="text-[#5e5e5e]">
                  {update.author} • {update.location}
                </span>
              </div>
              <h3 className="font-masthead font-bold text-base leading-snug text-[#121212]">
                {update.title}
              </h3>
              <p className="font-serif text-sm leading-relaxed text-[#1a1c1c]">
                {update.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e2e2e2] bg-[#f9f9f9] text-center text-xs font-caption text-[#5e5e5e]">
          The New York Times Live Desk • Monitored 24/7 by Bureau Correspondents
        </div>
      </div>
    </div>
  );
};
