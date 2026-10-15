import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import {
  X,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Printer,
  ArrowLeft,
  Check,
  MessageSquare,
  ThumbsUp,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  relatedArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [theme, setTheme] = useState<'paper' | 'sepia' | 'dark'>('paper');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<Array<{ id: string; name: string; time: string; text: string; location: string; likes: number; userLiked?: boolean }>>([
    {
      id: 'c1',
      name: 'Eleanor Vance',
      location: 'Boston, MA',
      time: '2 hours ago',
      text: 'Essential and sober reporting. The diplomatic friction between emerging economic blocs and traditional treaty frameworks will define the coming decades.',
      likes: 42,
    },
    {
      id: 'c2',
      name: 'Robert K. Miller',
      location: 'Geneva, Switzerland',
      time: '4 hours ago',
      text: 'Having worked near the Palais des Nations for over twenty years, the security posture and urgency of these bilateral talks is truly unprecedented.',
      likes: 27,
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const total = scrollHeight - clientHeight;
      if (total > 0) {
        setScrollProgress((scrollTop / total) * 100);
      }
    };

    const el = containerRef.current;
    el?.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Speech API for Real Text-to-Speech Narration
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingAudio(!isPlayingAudio);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.subtitle}. By ${article.author}. ${article.body.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Pick high quality voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      sounds.playFlip();
    }
  };

  const handleRateChange = () => {
    const nextRate = speechRate === 1 ? 1.25 : speechRate === 1.25 ? 1.5 : 1;
    setSpeechRate(nextRate);
    if (isPlayingAudio) {
      toggleSpeech();
      setTimeout(toggleSpeech, 50);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    sounds.playFlip();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.userLiked ? c.likes - 1 : c.likes + 1,
              userLiked: !c.userLiked,
            }
          : c
      )
    );
    sounds.playKeyTap();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: `c_${Date.now()}`,
        name: 'You (Verified Subscriber)',
        location: 'New York, NY',
        time: 'Just now',
        text: newComment.trim(),
        likes: 1,
        userLiked: true,
      },
      ...comments,
    ]);
    setNewComment('');
    sounds.playSuccess();
  };

  const themeStyles = {
    paper: 'bg-white text-[#1a1c1c]',
    sepia: 'bg-[#faf0ea] text-[#1f1b17]',
    dark: 'bg-[#121212] text-[#f1f1f1]',
  };

  const fontSizes = {
    normal: 'text-[17px] leading-[29px]',
    large: 'text-[20px] leading-[34px]',
    xlarge: 'text-[23px] leading-[38px]',
  };

  const firstParagraph = article.body[0] || '';
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex justify-center"
    >
      <div
        className={`w-full max-w-4xl min-h-screen border-x border-[#121212] transition-colors duration-200 flex flex-col relative ${themeStyles[theme]}`}
      >
        {/* Reading Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-transparent">
          <div
            className="h-full bg-[#121212] dark:bg-white transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Utility Reader Toolbar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-[#e2e2e2] dark:border-neutral-800 bg-inherit/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playFlip();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-label-section uppercase font-bold tracking-wider hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Front Page</span>
            </button>
            <span className="text-[#a3a3a3]">•</span>
            <span className="font-label-section text-xs uppercase font-bold tracking-widest text-[#5e5e5e] dark:text-neutral-400">
              {article.section}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size picker */}
            <div className="hidden sm:flex items-center border border-[#e2e2e2] dark:border-neutral-700 px-1.5 py-0.5 text-xs">
              <span className="text-[10px] text-[#5e5e5e] mr-1.5 font-label-section">SIZE</span>
              <button
                onClick={() => {
                  setFontSize('normal');
                  sounds.playKeyTap();
                }}
                className={`px-1 font-serif ${fontSize === 'normal' ? 'font-bold underline' : ''}`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setFontSize('large');
                  sounds.playKeyTap();
                }}
                className={`px-1 font-serif text-sm ${fontSize === 'large' ? 'font-bold underline' : ''}`}
              >
                A+
              </button>
              <button
                onClick={() => {
                  setFontSize('xlarge');
                  sounds.playKeyTap();
                }}
                className={`px-1 font-serif text-base ${fontSize === 'xlarge' ? 'font-bold underline' : ''}`}
              >
                A++
              </button>
            </div>

            {/* Reading theme switcher */}
            <div className="flex items-center border border-[#e2e2e2] dark:border-neutral-700 text-xs">
              <button
                onClick={() => setTheme('paper')}
                title="Paper Pure"
                className={`px-2 py-0.5 font-label-section text-[10px] uppercase font-semibold ${theme === 'paper' ? 'bg-[#121212] text-white' : ''}`}
              >
                Paper
              </button>
              <button
                onClick={() => setTheme('sepia')}
                title="Warm Wash"
                className={`px-2 py-0.5 font-label-section text-[10px] uppercase font-semibold ${theme === 'sepia' ? 'bg-[#964B00] text-white' : ''}`}
              >
                Wash
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Ink"
                className={`px-2 py-0.5 font-label-section text-[10px] uppercase font-semibold ${theme === 'dark' ? 'bg-neutral-800 text-white' : ''}`}
              >
                Ink
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              title="Print Article"
              className="p-1.5 border border-[#e2e2e2] dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-[#5e5e5e]"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => {
                onToggleBookmark(article.id);
                sounds.playFlip();
              }}
              className={`p-1.5 border border-[#e2e2e2] dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                isBookmarked ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/40' : 'text-[#5e5e5e]'
              }`}
              title={isBookmarked ? 'Saved to Reading List' : 'Save Article'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-[#e2e2e2] dark:border-neutral-700 text-[#5e5e5e] hover:text-[#121212] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
              title="Copy Article Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                sounds.playFlip();
                onClose();
              }}
              className="p-1.5 hover:opacity-75 transition-opacity text-[#121212] dark:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="flex-1 px-4 sm:px-10 md:px-20 py-8 max-w-3xl mx-auto w-full">
          {/* Header block */}
          <div className="space-y-3 pb-6 border-b border-[#e2e2e2] dark:border-neutral-800">
            {article.kicker && (
              <span
                className={`font-label-section text-xs uppercase font-bold tracking-widest ${
                  article.kickerColor || 'text-[#D0021B]'
                }`}
              >
                {article.kicker}
              </span>
            )}

            <h1 className="font-masthead text-3xl sm:text-4xl md:text-[44px] leading-[1.1] font-bold tracking-tight">
              {article.title}
            </h1>

            <p className="font-serif text-lg md:text-xl text-[#5e5e5e] dark:text-neutral-400 leading-snug">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e2e2e2] dark:border-neutral-800 text-xs font-label-byline text-[#5e5e5e] dark:text-neutral-400">
              <div className="flex items-center gap-2.5">
                {article.authorImage && (
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-10 h-10 rounded-full object-cover filter grayscale"
                  />
                )}
                <div>
                  <span className="font-bold text-[#121212] dark:text-white block">{article.author}</span>
                  {article.authorRole && <span className="text-[11px]">{article.authorRole}</span>}
                </div>
              </div>
              <div className="text-right">
                <span>{article.date}</span>
                <span className="mx-1.5">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Interactive Narration Audio Bar with Real Browser Speech */}
          <div className="my-6 p-3.5 bg-[#f5f5f5] dark:bg-neutral-900 border border-[#e2e2e2] dark:border-neutral-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSpeech}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 shrink-0 ${
                  isPlayingAudio
                    ? 'bg-[#D0021B] text-white animate-pulse'
                    : 'bg-[#121212] dark:bg-white text-white dark:text-black hover:opacity-90'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <span className="font-label-section text-xs uppercase font-bold block text-[#121212] dark:text-neutral-100">
                  {isPlayingAudio ? 'Listening to Article Narration' : 'Listen to this article'}
                </span>
                <span className="font-caption text-[11px] text-[#5e5e5e] dark:text-neutral-400">
                  Voice narration powered by browser audio engine • {article.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRateChange}
                className="px-2 py-0.5 border border-[#121212] dark:border-neutral-600 text-[10px] font-mono font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                {speechRate}x
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <figure className="my-6 space-y-2">
              <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row justify-between text-xs font-caption text-[#5e5e5e] dark:text-neutral-400 gap-1">
                <span>{article.imageCaption || article.title}</span>
                {article.imageCredit && (
                  <span className="shrink-0 italic">{article.imageCredit}</span>
                )}
              </figcaption>
            </figure>
          )}

          {/* Pull quote if present */}
          {article.pullQuote && (
            <div className="my-8 py-5 px-6 border-y-2 border-[#121212] dark:border-neutral-200 bg-inherit text-center">
              <p className="font-masthead italic text-xl sm:text-2xl leading-relaxed text-[#121212] dark:text-neutral-100">
                “{article.pullQuote.text}”
              </p>
              <span className="block mt-2 font-label-section text-xs uppercase tracking-widest text-[#5e5e5e] dark:text-neutral-400">
                — {article.pullQuote.attribution}
              </span>
            </div>
          )}

          {/* Main Prose with Drop Cap */}
          <div className={`space-y-5 font-serif ${fontSizes[fontSize]}`}>
            <p>
              <span className="float-left text-5xl sm:text-6xl font-masthead font-bold leading-none pr-3 pt-1 text-[#121212] dark:text-neutral-100 select-none">
                {firstLetter}
              </span>
              {restOfFirstParagraph}
            </p>

            {article.body.slice(1).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Bullet points if present */}
          {article.bullets && article.bullets.length > 0 && (
            <div className="my-6 p-4 border border-[#e2e2e2] dark:border-neutral-800 bg-[#f9f9f9] dark:bg-neutral-900">
              <h4 className="font-label-section text-xs uppercase font-bold tracking-wider mb-2 text-[#121212] dark:text-white">
                Key Background & Context
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm font-serif text-[#1a1c1c] dark:text-neutral-200">
                {article.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-[#e2e2e2] dark:border-neutral-800 flex flex-wrap gap-2">
            <span className="font-label-section text-xs uppercase font-bold text-[#5e5e5e] dark:text-neutral-400 mr-2 py-0.5">
              Filed under:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-serif text-[#121212] dark:text-neutral-300 underline underline-offset-2 cursor-pointer hover:text-[#5e5e5e]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Comments Section Toggle */}
          <div className="mt-10 border-t-2 border-[#121212] dark:border-neutral-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowComments(!showComments);
                  sounds.playFlip();
                }}
                className="flex items-center gap-2 font-label-section text-xs uppercase font-bold tracking-wider text-[#121212] dark:text-neutral-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Comments ({comments.length + (article.commentsCount || 0)})</span>
                <span className="text-[10px] text-[#5e5e5e] font-normal">
                  {showComments ? 'Hide' : 'Expand'}
                </span>
              </button>
            </div>

            {showComments && (
              <div className="space-y-4">
                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="border border-[#e2e2e2] dark:border-neutral-800 p-3 space-y-2 bg-[#fafafa] dark:bg-neutral-900">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment (The New York Times moderates discussions for civility and journalistic relevance)..."
                    className="w-full text-xs font-serif p-2.5 border border-[#e2e2e2] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#121212] dark:text-white focus:outline-hidden"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-caption text-[#5e5e5e]">
                      Commenting as verified subscriber
                    </span>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#121212] dark:bg-white text-white dark:text-black text-[11px] font-label-section uppercase font-bold hover:opacity-85"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div key={c.id} className="p-3 border-b border-[#e2e2e2] dark:border-neutral-800 space-y-1.5">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-bold font-label-byline text-[#121212] dark:text-neutral-100">
                          {c.name} <span className="font-normal text-[#5e5e5e]">({c.location})</span>
                        </span>
                        <span className="text-[11px] text-[#5e5e5e]">{c.time}</span>
                      </div>
                      <p className="font-serif text-sm leading-relaxed text-[#1a1c1c] dark:text-neutral-300">
                        {c.text}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => handleLikeComment(c.id)}
                          className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 border ${
                            c.userLiked
                              ? 'border-[#121212] bg-[#121212] text-white dark:bg-white dark:text-black'
                              : 'border-[#e2e2e2] dark:border-neutral-700 text-[#5e5e5e]'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{c.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-6 border-t-2 border-[#121212] dark:border-neutral-200">
              <h3 className="font-label-section text-xs uppercase font-bold tracking-widest text-[#121212] dark:text-neutral-200 mb-4">
                More in {article.section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => {
                      sounds.playFlip();
                      onSelectArticle(rel);
                    }}
                    className="cursor-pointer space-y-1.5 group p-2 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    {rel.image && (
                      <div className="aspect-[3/2] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        />
                      </div>
                    )}
                    <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                      {rel.kicker || rel.section}
                    </span>
                    <h4 className="font-masthead text-sm font-semibold leading-snug group-hover:underline">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-[#5e5e5e] block">{rel.author}</span>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
