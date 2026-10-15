import React, { useState } from 'react';
import { Article } from '../types';
import {
  X,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Type,
  ArrowLeft,
  Check,
  MessageSquare,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

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
  const [audioProgress, setAudioProgress] = useState<number>(18);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<Array<{ name: string; time: string; text: string; location: string }>>([
    {
      name: 'Eleanor Vance',
      location: 'Boston, MA',
      time: '2 hours ago',
      text: 'Essential and sober reporting. The diplomatic friction between emerging economic blocs and traditional treaty frameworks will define the coming decades.',
    },
    {
      name: 'Robert K. Miller',
      location: 'Geneva, Switzerland',
      time: '4 hours ago',
      text: 'Having worked near the Palais des Nations for over twenty years, the security posture and urgency of these bilateral talks is truly unprecedented.',
    },
  ]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        name: 'You (Subscriber)',
        location: 'New York, NY',
        time: 'Just now',
        text: newComment.trim(),
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const themeStyles = {
    paper: 'bg-white text-[#1a1c1c]',
    sepia: 'bg-[#faf0ea] text-[#1f1b17]',
    dark: 'bg-[#181818] text-[#f1f1f1]',
  };

  const fontSizes = {
    normal: 'text-[17px] leading-[29px]',
    large: 'text-[19px] leading-[32px]',
    xlarge: 'text-[22px] leading-[36px]',
  };

  const firstParagraph = article.body[0] || '';
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center">
      <div
        className={`w-full max-w-4xl min-h-screen border-x border-[#121212] transition-colors duration-200 flex flex-col ${themeStyles[theme]}`}
      >
        {/* Sticky Utility Reader Toolbar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-[#e2e2e2] bg-inherit/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-label-section uppercase font-bold tracking-wider hover:opacity-75 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Front Page</span>
            </button>
            <span className="text-[#a3a3a3]">•</span>
            <span className="font-label-section text-xs uppercase font-bold tracking-widest text-[#5e5e5e]">
              {article.section}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font size picker */}
            <div className="hidden sm:flex items-center gap-1 border border-[#e2e2e2] px-1.5 py-0.5 text-xs">
              <span className="text-[10px] text-[#5e5e5e] mr-1">SIZE</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 font-serif ${fontSize === 'normal' ? 'font-bold underline' : ''}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 font-serif text-sm ${fontSize === 'large' ? 'font-bold underline' : ''}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1.5 font-serif text-base ${fontSize === 'xlarge' ? 'font-bold underline' : ''}`}
              >
                A++
              </button>
            </div>

            {/* Reading theme switcher */}
            <div className="flex items-center border border-[#e2e2e2] text-xs">
              <button
                onClick={() => setTheme('paper')}
                title="Paper Pure"
                className={`px-2 py-0.5 ${theme === 'paper' ? 'bg-[#121212] text-white font-bold' : ''}`}
              >
                Paper
              </button>
              <button
                onClick={() => setTheme('sepia')}
                title="Warm Sepia"
                className={`px-2 py-0.5 ${theme === 'sepia' ? 'bg-[#b8860b] text-white font-bold' : ''}`}
              >
                Wash
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Ink"
                className={`px-2 py-0.5 ${theme === 'dark' ? 'bg-neutral-800 text-white font-bold' : ''}`}
              >
                Ink
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 border border-[#e2e2e2] hover:bg-neutral-100 transition-colors ${
                isBookmarked ? 'text-amber-700 bg-amber-50' : 'text-[#5e5e5e]'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save to Reading List'}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-[#e2e2e2] text-[#5e5e5e] hover:text-[#121212] hover:bg-neutral-100 transition-colors relative"
              title="Copy Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 hover:opacity-75 transition-opacity text-[#121212]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="flex-1 px-4 sm:px-8 md:px-16 py-8 max-w-3xl mx-auto w-full">
          {/* Header block */}
          <div className="space-y-3 pb-6 border-b border-[#e2e2e2]">
            {article.kicker && (
              <span
                className={`font-label-section text-xs uppercase font-bold tracking-widest ${
                  article.kickerColor || 'text-[#D0021B]'
                }`}
              >
                {article.kicker}
              </span>
            )}

            <h1 className="font-masthead text-3xl sm:text-4xl md:text-[44px] leading-[1.12] font-bold tracking-tight">
              {article.title}
            </h1>

            <p className="font-serif text-lg md:text-xl text-[#5e5e5e] leading-snug">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e2e2e2] text-xs font-label-byline text-[#5e5e5e]">
              <div className="flex items-center gap-2">
                {article.authorImage && (
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-9 h-9 rounded-full object-cover filter grayscale"
                  />
                )}
                <div>
                  <span className="font-bold text-[#121212] block">{article.author}</span>
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

          {/* Audio narration bar */}
          <div className="my-6 p-3.5 bg-[#f5f5f5] dark:bg-neutral-800/60 border border-[#e2e2e2] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 rounded-full bg-[#121212] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shrink-0"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <span className="font-label-section text-xs uppercase font-bold block text-[#121212] dark:text-neutral-100">
                  {isPlayingAudio ? 'Playing Audio Narration' : 'Listen to this article'}
                </span>
                <span className="font-caption text-[11px] text-[#5e5e5e]">
                  Narrated by NYT Audio Desk • 8:24 min
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 w-48">
              <div className="flex-1 bg-[#d4d4d4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#121212] h-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-[#5e5e5e]">1:35</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <figure className="my-6 space-y-2">
              <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-200">
                <img
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row justify-between text-xs font-caption text-[#5e5e5e] gap-1">
                <span>{article.imageCaption || article.title}</span>
                {article.imageCredit && (
                  <span className="shrink-0 italic">{article.imageCredit}</span>
                )}
              </figcaption>
            </figure>
          )}

          {/* Pull quote if present */}
          {article.pullQuote && (
            <div className="my-8 py-5 px-6 border-y-2 border-[#121212] bg-inherit text-center">
              <p className="font-masthead italic text-xl sm:text-2xl leading-relaxed text-[#121212] dark:text-neutral-100">
                “{article.pullQuote.text}”
              </p>
              <span className="block mt-2 font-label-section text-xs uppercase tracking-widest text-[#5e5e5e]">
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
            <div className="my-6 p-4 border border-[#e2e2e2] bg-[#f9f9f9] dark:bg-neutral-800/40">
              <h4 className="font-label-section text-xs uppercase font-bold tracking-wider mb-2">
                Key Background & Context
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm font-serif">
                {article.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-[#e2e2e2] flex flex-wrap gap-2">
            <span className="font-label-section text-xs uppercase font-bold text-[#5e5e5e] mr-2 py-0.5">
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
          <div className="mt-10 border-t-2 border-[#121212] pt-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowComments(!showComments)}
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
                <form onSubmit={handleAddComment} className="border border-[#e2e2e2] p-3 space-y-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment (The New York Times moderates discussions for civility and journalistic relevance)..."
                    className="w-full text-xs font-serif p-2 border border-[#e2e2e2] bg-white text-[#121212] focus:outline-hidden"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-caption text-[#5e5e5e]">
                      Commenting as verified subscriber
                    </span>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#121212] text-white text-[11px] font-label-section uppercase font-bold hover:bg-neutral-800"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.map((c, idx) => (
                    <div key={idx} className="p-3 border-b border-[#e2e2e2] space-y-1">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-bold font-label-byline text-[#121212] dark:text-neutral-100">
                          {c.name} <span className="font-normal text-[#5e5e5e]">({c.location})</span>
                        </span>
                        <span className="text-[11px] text-[#5e5e5e]">{c.time}</span>
                      </div>
                      <p className="font-serif text-sm leading-relaxed text-[#1a1c1c] dark:text-neutral-300">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-6 border-t-2 border-[#121212]">
              <h3 className="font-label-section text-xs uppercase font-bold tracking-widest text-[#121212] dark:text-neutral-200 mb-4">
                More in {article.section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="cursor-pointer space-y-1.5 group p-2 hover:bg-neutral-100/50 transition-colors"
                  >
                    {rel.image && (
                      <div className="aspect-[3/2] overflow-hidden bg-neutral-200">
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
