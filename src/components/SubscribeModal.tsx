import React, { useState } from 'react';
import { X, Check, ShieldCheck, Newspaper } from 'lucide-react';

interface SubscribeModalProps {
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'digital' | 'allAccess'>('allAccess');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white border-2 border-[#121212] shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <span className="nyt-blackletter text-2xl text-[#121212]">The New York Times</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-masthead text-2xl font-bold text-[#121212]">
              Welcome to The New York Times
            </h3>
            <p className="font-serif text-sm text-[#5e5e5e]">
              A verification confirmation has been dispatched to <strong className="text-[#121212]">{email}</strong>. Enjoy unlimited digital broadsheet coverage, daily puzzles, and investigative journalism.
            </p>
            <button
              onClick={onClose}
              className="bg-[#121212] text-white px-6 py-2.5 font-label-section uppercase text-xs font-bold tracking-wider hover:bg-neutral-800"
            >
              Start Reading
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <span className="font-label-section text-[11px] uppercase tracking-widest text-[#D0021B] font-bold">
                Special Limited-Time Invitation
              </span>
              <h2 className="font-masthead text-3xl font-bold text-[#121212]">
                Independent Journalism.<br />Essential Clarity.
              </h2>
              <p className="font-serif text-sm text-[#5e5e5e] pt-1">
                Subscribe for $1/week for your first year. Cancel anytime.
              </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setSelectedPlan('allAccess')}
                className={`p-3.5 border-2 cursor-pointer transition-all ${
                  selectedPlan === 'allAccess'
                    ? 'border-[#121212] bg-[#faf0ea]'
                    : 'border-[#e2e2e2] bg-white hover:border-[#121212]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-label-section text-[10px] uppercase font-bold text-[#121212]">
                    All Access
                  </span>
                  {selectedPlan === 'allAccess' && <Check className="w-4 h-4 text-[#121212]" />}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-serif font-bold text-[#121212]">$1</span>
                  <span className="text-xs text-[#5e5e5e]"> / week</span>
                </div>
                <p className="font-caption text-[11px] text-[#5e5e5e] mt-1">
                  News, Games, Cooking, Wirecutter & The Athletic.
                </p>
              </div>

              <div
                onClick={() => setSelectedPlan('digital')}
                className={`p-3.5 border-2 cursor-pointer transition-all ${
                  selectedPlan === 'digital'
                    ? 'border-[#121212] bg-[#faf0ea]'
                    : 'border-[#e2e2e2] bg-white hover:border-[#121212]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-label-section text-[10px] uppercase font-bold text-[#121212]">
                    News Basic
                  </span>
                  {selectedPlan === 'digital' && <Check className="w-4 h-4 text-[#121212]" />}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-serif font-bold text-[#121212]">$0.75</span>
                  <span className="text-xs text-[#5e5e5e]"> / week</span>
                </div>
                <p className="font-caption text-[11px] text-[#5e5e5e] mt-1">
                  Core broadsheet news, live updates, and podcasts.
                </p>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-2 border-t border-[#e2e2e2] pt-4 text-xs font-serif">
              <div className="flex items-center gap-2 text-[#1a1c1c]">
                <Check className="w-3.5 h-3.5 text-[#121212]" />
                <span>Unrestricted access to all national & international desks</span>
              </div>
              <div className="flex items-center gap-2 text-[#1a1c1c]">
                <Check className="w-3.5 h-3.5 text-[#121212]" />
                <span>Daily word puzzles: Wordle, Spelling Bee, and Crosswords</span>
              </div>
              <div className="flex items-center gap-2 text-[#1a1c1c]">
                <Check className="w-3.5 h-3.5 text-[#121212]" />
                <span>Audio editions & narrated long-form articles</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 text-sm border border-[#121212] font-serif focus:outline-hidden"
              />
              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-3 text-xs font-label-section uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Continue for $1/Week
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-caption text-[#5e5e5e]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Billed every 4 weeks. Cancel online at any time with one click.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
