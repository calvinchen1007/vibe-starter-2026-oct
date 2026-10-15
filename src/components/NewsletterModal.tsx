import React, { useState } from 'react';
import { X, Check, Mail } from 'lucide-react';

interface NewsletterModalProps {
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white border border-[#121212] shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#5e5e5e] hover:text-[#121212]"
        >
          <X className="w-5 h-5" />
        </button>

        {subscribed ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-masthead text-xl font-bold text-[#121212]">
              You're all set for The Morning
            </h3>
            <p className="font-serif text-xs text-[#5e5e5e]">
              Look for tomorrow's edition in your inbox at 6:00 AM Eastern, written by David Leonhardt and Times journalists.
            </p>
            <button
              onClick={onClose}
              className="bg-[#121212] text-white text-xs font-label-section uppercase px-4 py-2 font-bold hover:bg-neutral-800"
            >
              Back to Today's Paper
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaR-usMWX_OhSswIl8ca1uW6FZmeNALgSDNH77Ku76B53TU-b_MWYbs2bPigRnuIcGgGFTuJZsAh4YithR5Anxamz6eEyE99X0-BhxE-bMtMCHioap0cyM3hXlGIw5ILpB7AzBJ_7b8ymE9MtF120qfKYmvRCtHGFyK89fJm_B-uRy6lYKtBUsN1Jpq5DOrCIPDPTAbahfYUPg2Hz1Djq-nFN4Hp47Mx2kz5I5h4-VyWRf2uQyat_G"
                alt="David Leonhardt"
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div>
                <span className="font-label-section text-[10px] uppercase font-bold text-[#121212] tracking-wider block">
                  Daily Briefing
                </span>
                <h3 className="font-masthead text-xl font-bold text-[#121212]">The Morning</h3>
                <span className="font-caption text-xs text-[#5e5e5e]">By David Leonhardt</span>
              </div>
            </div>

            <p className="font-serif text-sm leading-relaxed text-[#1a1c1c]">
              Make sense of the day’s most important news with David Leonhardt and Times journalists. Clear context, sharp analysis, and cultural recommendations delivered before breakfast.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-[#121212] font-serif focus:outline-hidden"
              />
              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-2.5 text-xs font-label-section uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Sign Up for The Morning
              </button>
            </form>

            <p className="text-[11px] font-caption text-[#5e5e5e] text-center">
              Delivered Monday through Friday. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
