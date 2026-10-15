/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ALL_ARTICLES } from './data/articles';
import { Article, ActiveModal } from './types';
import { ArticleModal } from './components/ArticleModal';
import { WordleModal } from './components/games/WordleModal';
import { SpellingBeeModal } from './components/games/SpellingBeeModal';
import { MiniCrosswordModal } from './components/games/MiniCrosswordModal';
import { LiveUpdatesDrawer } from './components/LiveUpdatesDrawer';
import { SearchModal } from './components/SearchModal';
import { ReadingListDrawer } from './components/ReadingListDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { NewsletterModal } from './components/NewsletterModal';
import { MarketsDrawer } from './components/MarketsDrawer';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import {
  Search,
  Menu,
  User,
  Bookmark,
  Sun,
  ArrowRight,
  TrendingUp,
  X,
  Share2,
  Check
} from 'lucide-react';

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [currentEdition, setCurrentEdition] = useState<string>('U.S.');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nyt_bookmarks');
      return saved ? JSON.parse(saved) : ['swiss-jura-valley-watchmakers'];
    } catch {
      return ['swiss-jura-valley-watchmakers'];
    }
  });
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('nyt_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2400);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((b) => b !== id) : [...prev, id];
      showToast(exists ? 'Article removed from reading list' : 'Saved to Reading List');
      return next;
    });
  };

  const openArticle = (article: Article) => {
    setActiveModal({ type: 'article', article });
  };

  const findArticle = (id: string): Article => {
    return ALL_ARTICLES.find((a) => a.id === id) || ALL_ARTICLES[0];
  };

  // Lead and key articles
  const leadArticle = findArticle('geneva-summit-2024');
  const fedArticle = findArticle('federal-reserve-inflation');
  const redSeaArticle = findArticle('red-sea-shipping-standoff');
  const aiFrameworkArticle = findArticle('bipartisan-ai-regulatory-framework');
  const morningArticle = findArticle('the-morning-newsletter');
  const stickingPointsArticle = findArticle('sticking-points-developing-nations');
  const cyberArticle = findArticle('bilateral-cyber-protocols');
  const deepSeaArticle = findArticle('deep-sea-mining-vulnerabilities');
  const opticalChipsArticle = findArticle('chip-foundries-optical-interconnects');

  // Columnists
  const davidBrooksArticle = findArticle('david-brooks-small-towns');
  const thomasFriedmanArticle = findArticle('thomas-friedman-middle-east');
  const maureenDowdArticle = findArticle('maureen-dowd-washington-compromise');

  // Business 4-card
  const strongDollarArticle = findArticle('strong-dollar-sovereign-debt');
  const aiWaterArticle = findArticle('ai-water-energy-footprint');
  const automakersArticle = findArticle('automakers-ev-hybrid-realities');
  const startupsArticle = findArticle('startups-cheap-money-vanishes');

  // Lifestyle & Culture
  const watchmakersArticle = findArticle('swiss-jura-valley-watchmakers');
  const chickenArticle = findArticle('crispy-lemon-herb-roast-chicken');
  const espressoArticle = findArticle('wirecutter-espresso-machines');

  // Popular
  const popular1 = findArticle('popular-1-sleep-debt');
  const popular2 = findArticle('popular-2-hudson-barn');
  const popular3 = findArticle('popular-3-mountaineering-crowds');
  const popular4 = findArticle('popular-4-modern-philosophy-books');
  const popular5 = findArticle('popular-5-1920s-cocktail');

  // Filtered view if section is chosen
  const filteredArticles = selectedSection === 'All'
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter((a) => a.section.toLowerCase() === selectedSection.toLowerCase());

  const savedArticlesList = ALL_ARTICLES.filter((a) => bookmarks.includes(a.id));

  const sectionsNav = [
    { label: 'U.S.', val: 'U.S.' },
    { label: 'World', val: 'World' },
    { label: 'Business', val: 'Business' },
    { label: 'Arts', val: 'Arts' },
    { label: 'Lifestyle', val: 'Lifestyle' },
    { label: 'Opinion', val: 'Opinion' },
    { label: 'Audio', val: 'Audio' },
    { label: 'Games', val: 'Games' },
    { label: 'Cooking', val: 'Cooking' },
    { label: 'Wirecutter', val: 'Wirecutter' },
    { label: 'The Athletic', val: 'Sports' },
  ];

  const handleNavClick = (val: string) => {
    if (val === 'Games') {
      setActiveModal({ type: 'wordle' });
    } else if (val === 'Cooking') {
      openArticle(chickenArticle);
    } else if (val === 'Wirecutter') {
      openArticle(espressoArticle);
    } else {
      setSelectedSection((prev) => (prev === val ? 'All' : val));
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#ffffff] font-body-md text-[#1a1c1c] antialiased min-h-screen selection:bg-[#faf0ea]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-white px-4 py-2.5 text-xs font-label-section uppercase tracking-wider shadow-xl flex items-center gap-2 border border-neutral-700">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full bg-[#ffffff] border-b border-[#e2e2e2]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Utility Bar */}
          <div className="py-1.5 border-b border-[#e2e2e2] flex items-center justify-between font-label-byline text-xs text-[#444748]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveModal({ type: 'todaysPaper' })}
                  title="Today's Paper Sections"
                  className="p-1 -ml-1 text-[#1a1c1c] hover:text-black transition-colors"
                >
                  <Menu className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'search' })}
                  title="Search Archive"
                  className="p-1 text-[#1a1c1c] hover:text-black transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Edition Selectors */}
              <div className="hidden lg:flex items-center gap-2 border-l border-[#e2e2e2] pl-3 text-[11px]">
                {['U.S.', 'International', 'Canada', 'Español', '中文'].map((ed) => (
                  <React.Fragment key={ed}>
                    {ed !== 'U.S.' && <span className="text-[#c4c7c7]">•</span>}
                    <button
                      onClick={() => {
                        setCurrentEdition(ed);
                        showToast(`Switched to ${ed} Edition`);
                      }}
                      className={`hover:underline cursor-pointer transition-colors ${
                        currentEdition === ed ? 'font-bold text-[#1a1c1c]' : 'text-[#444748]'
                      }`}
                    >
                      {ed}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Financial & User Controls */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setActiveModal({ type: 'markets' })}
                className="hidden sm:flex items-center gap-2 border-r border-[#e2e2e2] pr-3 hover:opacity-80 transition-opacity"
              >
                <span className="font-semibold text-[#1a1c1c]">S&P 500</span>
                <span className="text-emerald-700 font-mono text-[11px]">+0.42%</span>
                <span className="text-[#c4c7c7]">|</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Sun className="w-3 h-3 text-amber-500" /> 68°F
                </span>
              </button>

              {/* Reading list bookmark counter */}
              <button
                onClick={() => setActiveModal({ type: 'readingList' })}
                title="View Reading List"
                className="flex items-center gap-1 px-2 py-0.5 border border-[#e2e2e2] hover:border-[#121212] transition-colors text-[10px] uppercase font-bold"
              >
                <Bookmark className="w-3 h-3 text-amber-700 fill-amber-700" />
                <span className="hidden md:inline">Saved</span>
                <span>({bookmarks.length})</span>
              </button>

              <button
                onClick={() => setActiveModal({ type: 'subscribe' })}
                className="bg-[#121212] text-white font-label-section text-[10px] tracking-wider uppercase px-2.5 py-1 hover:bg-neutral-800 transition-colors shrink-0"
              >
                Subscribe for $1/week
              </button>

              <button
                onClick={() => setActiveModal({ type: 'subscribe' })}
                className="border border-[#121212] text-[#1a1c1c] font-label-section text-[10px] tracking-wider uppercase px-2 py-0.5 hover:bg-[#e8e8e8] transition-colors"
              >
                Log In
              </button>

              <button
                onClick={() => setActiveModal({ type: 'readingList' })}
                className="w-7 h-7 rounded-full bg-[#121212] text-white flex items-center justify-center hover:opacity-85"
                title="Account & Reading List"
              >
                <User className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Historic Broadsheet Masthead */}
          <div className="grid grid-cols-12 items-center py-4">
            <div className="col-span-3 hidden md:flex flex-col text-left">
              <span className="font-body-sm text-xs italic text-[#5e5e5e] leading-tight">
                “All the News That’s Fit to Print”
              </span>
              <span className="font-label-byline text-xs text-[#1a1c1c] font-bold mt-1.5">
                Wednesday, May 24, 2024
              </span>
              <button
                onClick={() => setActiveModal({ type: 'todaysPaper' })}
                className="font-label-byline text-xs text-[#5e5e5e] hover:underline cursor-pointer text-left w-fit"
              >
                Today’s Paper
              </button>
            </div>

            <div className="col-span-12 md:col-span-6 text-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection('All');
                }}
                className="inline-block"
              >
                <h1 className="nyt-blackletter text-4xl sm:text-5xl md:text-[62px] leading-none tracking-normal text-[#1a1c1c] select-none hover:opacity-95 transition-opacity">
                  The New York Times
                </h1>
              </a>
            </div>

            <div className="col-span-3 hidden md:flex flex-col items-end text-right">
              <span className="font-label-byline text-xs text-[#5e5e5e]">
                {currentEdition} Edition
              </span>
              <span className="font-label-byline text-xs text-[#1a1c1c]">
                Volume CLXXIII, No. 60,164
              </span>
            </div>
          </div>

          {/* Section Navigation Strip */}
          <div className="border-t border-b-2 border-[#121212] py-1.5">
            <nav className="flex items-center justify-center flex-wrap gap-x-6 gap-y-1 font-label-section text-[11px] tracking-wider uppercase">
              {sectionsNav.map((sec) => (
                <button
                  key={sec.label}
                  onClick={() => handleNavClick(sec.val)}
                  className={`py-0.5 transition-colors ${
                    selectedSection === sec.val
                      ? 'bg-[#121212] text-white px-2 font-bold'
                      : 'text-[#444748] hover:text-[#1a1c1c]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Secondary Breaking/Puzzles Mini Ribbon */}
          <div className="py-1.5 flex items-center justify-center gap-4 text-xs font-label-section overflow-x-auto whitespace-nowrap">
            <span
              onClick={() => setActiveModal({ type: 'liveUpdates' })}
              className="bg-[#D0021B] text-white font-bold px-1.5 py-0.5 text-[9px] tracking-wider uppercase cursor-pointer hover:bg-red-700 transition-colors"
            >
              Live
            </span>
            <button
              onClick={() => setActiveModal({ type: 'liveUpdates' })}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline"
            >
              Election 2024
            </button>
            <span className="text-[#e2e2e2]">•</span>
            <button
              onClick={() => setActiveModal({ type: 'liveUpdates' })}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline"
            >
              Israel-Hamas War
            </button>
            <span className="text-[#e2e2e2]">•</span>
            <button
              onClick={() => openArticle(fedArticle)}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline"
            >
              Global Economy
            </button>
            <span className="text-[#e2e2e2]">•</span>
            <button
              onClick={() => openArticle(aiFrameworkArticle)}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline"
            >
              Supreme Court
            </button>
            <span className="text-[#e2e2e2]">•</span>
            <button
              onClick={() => setActiveModal({ type: 'miniCrossword' })}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline font-semibold"
            >
              Crossword
            </button>
            <span className="text-[#e2e2e2]">•</span>
            <button
              onClick={() => setActiveModal({ type: 'spellingBee' })}
              className="text-[#444748] hover:text-[#1a1c1c] hover:underline font-semibold"
            >
              Spelling Bee
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full bg-[#ffffff] min-h-screen">
        <div className="flex flex-col w-full">
          {/* Active section filter banner (if not 'All') */}
          {selectedSection !== 'All' && (
            <div className="bg-[#faf0ea] border-b border-[#121212] py-2 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <span className="font-label-section text-xs uppercase font-bold tracking-widest text-[#121212]">
                  Viewing Section: {selectedSection} ({filteredArticles.length} stories)
                </span>
                <button
                  onClick={() => setSelectedSection('All')}
                  className="font-label-section text-xs uppercase underline font-semibold text-[#5e5e5e] hover:text-[#121212]"
                >
                  Reset to Front Page
                </button>
              </div>
            </div>
          )}

          {/* Live Updates Urgent Ribbon Bar */}
          <section className="w-full bg-[#ffffff] border-b border-[#e2e2e2] py-2">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap py-0.5">
                <button
                  onClick={() => setActiveModal({ type: 'liveUpdates' })}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#D0021B] text-white font-label-section text-[10px] uppercase font-bold tracking-wider hover:bg-red-700 transition-colors shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </button>
                <span
                  onClick={() => setActiveModal({ type: 'liveUpdates' })}
                  className="font-masthead text-[15px] text-[#121212] font-bold hover:underline cursor-pointer"
                >
                  Key Developments Across Geopolitical Talks and Regional Security
                </span>
                <span className="text-[#5e5e5e] text-xs">•</span>
                <button
                  onClick={() => setActiveModal({ type: 'liveUpdates' })}
                  className="font-body-sm text-xs text-[#444748] hover:text-[#121212] hover:underline"
                >
                  Cease-fire discussions resume in Cairo
                </button>
                <span className="text-[#5e5e5e] text-xs">•</span>
                <button
                  onClick={() => setActiveModal({ type: 'liveUpdates' })}
                  className="font-body-sm text-xs text-[#444748] hover:text-[#121212] hover:underline"
                >
                  Aid convoy clearance protocols expanded
                </button>
              </div>

              <div className="flex items-center gap-2 text-right shrink-0">
                <span className="font-label-byline text-[11px] text-[#5e5e5e]">Updated 8m ago</span>
                <button
                  onClick={() => setActiveModal({ type: 'liveUpdates' })}
                  className="font-label-section text-[11px] uppercase tracking-wider text-[#121212] font-bold hover:underline flex items-center"
                >
                  See All Updates <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* MAIN FRONT PAGE 3-COLUMN BROADSHEET GRID */}
          <div className="max-w-7xl mx-auto px-4 py-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-[#121212] pb-6">
              {/* LEFT COLUMN: Secondary Leaning Stories & Morning Briefing (approx 25% -> 3 cols) */}
              <aside className="md:col-span-3 pr-0 md:pr-4 md:border-r border-[#e2e2e2] flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Story 1: Analysis */}
                  <article className="space-y-1.5 pb-5 border-b border-[#e2e2e2]">
                    <span className="font-label-section text-[11px] text-[#D0021B] uppercase tracking-wider font-bold">
                      Analysis
                    </span>
                    <h3
                      onClick={() => openArticle(fedArticle)}
                      className="font-masthead text-[21px] leading-[25px] font-semibold text-[#121212] hover:text-[#5e5e5e] cursor-pointer transition-colors"
                    >
                      Federal Reserve Holds Rates Steady Amid Stubborn Inflation Pressures
                    </h3>
                    <p className="font-body-sm text-xs text-[#1a1c1c] leading-snug">
                      Policymakers signaled an extended plateau, cautioning that cooling consumer prices may take several quarters longer than Wall Street projected.
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-label-byline text-[11px] text-[#5e5e5e]">
                      <span>By Jeanna Smialek</span>
                      <span>•</span>
                      <span>14m ago</span>
                    </div>
                    <ul className="pt-2 space-y-1 text-xs font-serif list-disc pl-4 text-[#444748]">
                      <li>
                        <button
                          onClick={() => openArticle(fedArticle)}
                          className="hover:underline text-left cursor-pointer"
                        >
                          Bond yields tick higher following Powell's news conference
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openArticle(fedArticle)}
                          className="hover:underline text-left cursor-pointer"
                        >
                          What the rate pause means for mortgages and credit card debt
                        </button>
                      </li>
                    </ul>
                  </article>

                  {/* Story 2 */}
                  <article className="space-y-1.5 pb-5 border-b border-[#e2e2e2]">
                    <h3
                      onClick={() => openArticle(redSeaArticle)}
                      className="font-masthead text-[19px] leading-[23px] font-semibold text-[#121212] hover:text-[#5e5e5e] cursor-pointer transition-colors"
                    >
                      Diplomatic Standoff Deepens Over Red Sea Commercial Shipping Corridors
                    </h3>
                    <p className="font-body-sm text-xs text-[#1a1c1c] leading-snug">
                      Multilateral naval escorts face logistical hurdles as container reroutes add weeks to transcontinental manufacturing delivery schedules.
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-label-byline text-[11px] text-[#5e5e5e]">
                      <span>By Steven Erlanger and Edward Wong</span>
                    </div>
                  </article>

                  {/* Story 3: Capitol Hill */}
                  <article className="space-y-1 pb-4">
                    <span className="font-label-section text-[11px] text-[#5e5e5e] uppercase tracking-wider font-bold">
                      Capitol Hill
                    </span>
                    <h4
                      onClick={() => openArticle(aiFrameworkArticle)}
                      className="font-masthead text-[17px] leading-[21px] font-semibold text-[#121212] hover:text-[#5e5e5e] cursor-pointer"
                    >
                      Bipartisan Coalition Unveils New Regulatory Framework for Frontier A.I. Models
                    </h4>
                    <p className="font-body-sm text-xs text-[#5e5e5e] pt-0.5">
                      The proposed bill mandates safety testing and disclosure protocols for generative models exceeding severe compute thresholds.
                    </p>
                    <span className="font-label-byline text-[11px] text-[#666666] block pt-1">
                      32m ago
                    </span>
                  </article>
                </div>

                {/* The Morning Newsletter Module */}
                <div className="bg-[#f4f3f3] p-3.5 border-t-2 border-[#121212] mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-section text-[11px] uppercase font-bold tracking-widest text-[#121212]">
                      The Morning
                    </span>
                    <span className="font-caption text-[11px] text-[#5e5e5e]">Daily Briefing</span>
                  </div>
                  <div
                    onClick={() => openArticle(morningArticle)}
                    className="flex gap-3 items-start cursor-pointer group"
                  >
                    <img
                      alt="David Leonhardt"
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaR-usMWX_OhSswIl8ca1uW6FZmeNALgSDNH77Ku76B53TU-b_MWYbs2bPigRnuIcGgGFTuJZsAh4YithR5Anxamz6eEyE99X0-BhxE-bMtMCHioap0cyM3hXlGIw5ILpB7AzBJ_7b8ymE9MtF120qfKYmvRCtHGFyK89fJm_B-uRy6lYKtBUsN1Jpq5DOrCIPDPTAbahfYUPg2Hz1Djq-nFN4Hp47Mx2kz5I5h4-VyWRf2uQyat_G"
                    />
                    <div className="space-y-1">
                      <h5 className="font-masthead text-[15px] leading-tight font-bold text-[#121212] group-hover:underline">
                        How voters view the economy vs. the economic data
                      </h5>
                      <p className="font-body-sm text-[12px] leading-normal text-[#5e5e5e]">
                        David Leonhardt unpacks the disconnect between buoyant consumer spending and downcast sentiment indicators.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#e2e2e2] flex items-center justify-between">
                    <span className="font-label-byline text-[11px] text-[#5e5e5e]">
                      Delivered every weekday
                    </span>
                    <button
                      onClick={() => setActiveModal({ type: 'newsletter' })}
                      className="bg-[#121212] text-white font-label-section text-[10px] uppercase font-bold px-2 py-1 tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </aside>

              {/* CENTER LEAD COLUMN: Main Story of the Day (approx 45% -> 6 cols) */}
              <section className="md:col-span-6 px-0 md:px-5 md:border-r border-[#e2e2e2] py-4 md:py-0">
                <article className="space-y-3">
                  <div className="space-y-1.5">
                    <span className="font-label-section text-[11px] text-[#D0021B] uppercase tracking-wider font-bold">
                      Summit in Geneva
                    </span>
                    <h2
                      onClick={() => openArticle(leadArticle)}
                      className="font-masthead text-2xl sm:text-3xl md:text-[38px] text-[#121212] hover:text-[#5e5e5e] cursor-pointer leading-[1.08] tracking-tight font-bold"
                    >
                      Global Leaders Gather to Address Mounting Security and Climate Crises
                    </h2>
                    <p className="font-serif text-[17px] text-[#1a1c1c] font-light leading-snug pt-1">
                      Delegates convened under tight security to broker binding emissions timetables while addressing escalating flashpoints along eastern borders and trade passages.
                    </p>
                  </div>

                  {/* Hero Editorial Photograph */}
                  <figure className="space-y-1.5 pt-1">
                    <div
                      onClick={() => openArticle(leadArticle)}
                      className="w-full overflow-hidden bg-[#e8e8e8] aspect-[16/10] cursor-pointer"
                    >
                      <img
                        alt="Geneva Summit plenary session"
                        className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIpmwa4zy7ESg64xFAvwH5O4JqNu7qiSV8nMwdx_rLQ_OnkR1NtXN-besw88dMBYYEyg_tLtDHvuIVyBpSL_E_RNN9ubsVc-572xxSDUsiqHtCtj4m03zh5GCoz75sZU2No9qi3rL4h9GOepM9dsRjAo9FYrFw5Ki14zLG7AzdvUmA6F__EjqXEzrMGTRe_E6t6YLi1nOz4XtT7RwZsA9bzzuazBWqQED2mdwwc-LdpXVI7xqUhykM"
                      />
                    </div>
                    <figcaption className="flex justify-between items-baseline font-caption text-[11px] text-[#5e5e5e]">
                      <span className="line-clamp-1 pr-2">
                        Plenary negotiations commenced Wednesday morning in the grand hall of the Palais des Nations.
                      </span>
                      <span className="shrink-0 font-medium">Brenda Ann Kenneally for The New York Times</span>
                    </figcaption>
                  </figure>

                  {/* Core Lead Paragraph & Follow-through */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2 text-[#1a1c1c] font-serif text-[14px] leading-relaxed border-b sm:border-b-0 sm:border-r border-[#e2e2e2] pb-3 sm:pb-0 pr-0 sm:pr-3">
                      <p>
                        GENEVA — After weeks of fraught preparatory cables, envoys from fifty-six nations took their seats inside the high-vaulted auditorium on Wednesday, confronted by overlapping disputes that test the durability of post-war treaties.
                      </p>
                      <p className="text-[#5e5e5e] text-xs">
                        Secretary of State Antony J. Blinken remarked during opening remarks that multilateral enforcement mechanisms require immediate reinvestment from member states.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="border-b border-[#e2e2e2] pb-2.5">
                        <h4
                          onClick={() => openArticle(stickingPointsArticle)}
                          className="font-masthead text-[16px] font-semibold text-[#121212] hover:underline cursor-pointer"
                        >
                          The Key Sticking Points Dividing Developing and Wealthy Nations
                        </h4>
                        <p className="font-body-sm text-xs text-[#5e5e5e] pt-0.5">
                          Loss-and-damage financing targets remain contested as coastal states demand immediate liquidity concessions.
                        </p>
                        <span className="font-label-byline text-[11px] text-[#666666] block pt-1">
                          45m ago
                        </span>
                      </div>

                      <div>
                        <h4
                          onClick={() => openArticle(cyberArticle)}
                          className="font-masthead text-[16px] font-semibold text-[#121212] hover:underline cursor-pointer"
                        >
                          Behind Closed Doors, Bilateral Talks Tackle Cyber Protocols
                        </h4>
                        <p className="font-body-sm text-xs text-[#5e5e5e] pt-0.5">
                          Intelligence chiefs explore reciprocal limitations on critical infrastructure espionage.
                        </p>
                        <span className="font-label-byline text-[11px] text-[#666666] block pt-1">
                          1h ago
                        </span>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Secondary Package Below Lead */}
                <div className="mt-6 pt-4 border-t border-[#e2e2e2] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <article className="flex gap-3">
                    <div className="space-y-1">
                      <span className="font-label-section text-[10px] text-[#5e5e5e] uppercase tracking-widest font-bold">
                        Investigation
                      </span>
                      <h4
                        onClick={() => openArticle(deepSeaArticle)}
                        className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                      >
                        How Modern Supply Chains Hide Deep Sea Mining Vulnerabilities
                      </h4>
                      <p className="font-body-sm text-[12px] leading-tight text-[#5e5e5e]">
                        A six-month inquiry tracks unmonitored extraction vessels operating in international waters.
                      </p>
                    </div>
                  </article>

                  <article className="flex gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#e2e2e2]">
                    <div className="space-y-1">
                      <span className="font-label-section text-[10px] text-[#5e5e5e] uppercase tracking-widest font-bold">
                        Technology
                      </span>
                      <h4
                        onClick={() => openArticle(opticalChipsArticle)}
                        className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                      >
                        Chip Foundries Pivot Toward Next-Gen Optical Interconnects
                      </h4>
                      <p className="font-body-sm text-[12px] leading-tight text-[#5e5e5e]">
                        To break computational bottlenecks, hardware designers swap copper traces for laser light paths.
                      </p>
                    </div>
                  </article>
                </div>
              </section>

              {/* RIGHT COLUMN: Opinion & NYT Games (approx 30% -> 3 cols) */}
              <aside className="md:col-span-3 pl-0 md:pl-4 flex flex-col justify-between space-y-6 pt-4 md:pt-0">
                {/* Opinion Module in Warm Wash */}
                <div className="bg-[#FAF0EA] p-4 border-t-4 border-[#121212] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#5e5e5e]/20 pb-1.5">
                    <h3 className="font-masthead text-[18px] tracking-tight font-bold text-[#121212] uppercase">
                      Opinion
                    </h3>
                    <button
                      onClick={() => handleNavClick('Opinion')}
                      className="font-label-section text-[10px] uppercase tracking-wider text-[#5e5e5e] hover:text-[#121212]"
                    >
                      All Columnists →
                    </button>
                  </div>

                  {/* Columnist 1 */}
                  <article className="space-y-1.5 pb-3 border-b border-[#5e5e5e]/20">
                    <div className="flex items-center gap-2.5">
                      <img
                        alt="David Brooks"
                        className="w-10 h-10 rounded-full object-cover shrink-0 filter grayscale"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_78gtiqTsMNmXxtRaI9U0rNhSjNuGTxUkFF7MyOjjlMUFgZnsUVawjpO3AonF6bmNfCvMDodElHeqPY5xV-siRYB6Jg9heC-QJKVcisIxtb3ffrLI0nDpglqQraE9DsF-Qo4RwG5a-WNnU62WledgsLbR4OBoQ0OeGJO1J-1pkiMdxjNei8XMckMy6hchZEWsrtRBgQSuSqf70thQnj89dmqea-ob-Dl6QDvRyoYgaUlLQN_6Jfe9"
                      />
                      <div>
                        <span className="font-label-section text-[11px] font-bold uppercase tracking-wider text-[#121212] block">
                          David Brooks
                        </span>
                        <span className="font-caption text-[11px] text-[#5e5e5e]">
                          Contributing Columnist
                        </span>
                      </div>
                    </div>
                    <h4
                      onClick={() => openArticle(davidBrooksArticle)}
                      className="font-masthead text-[16px] leading-snug font-semibold text-[#121212] hover:underline cursor-pointer"
                    >
                      The Quiet Crisis Unraveling Community Life in America’s Small Towns
                    </h4>
                    <p className="font-body-sm text-[13px] text-[#444748] leading-snug">
                      When local institutions shutter, the erosion isn't merely economic—it strikes at shared social purpose.
                    </p>
                  </article>

                  {/* Columnist 2 */}
                  <article className="space-y-1.5 pb-3 border-b border-[#5e5e5e]/20">
                    <div className="flex items-center gap-2.5">
                      <img
                        alt="Thomas L. Friedman"
                        className="w-10 h-10 rounded-full object-cover shrink-0 filter grayscale"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO_Sjh1WoWzS_C9pCXrzquOXhD-tqi0YG9cSsyjLS43Ema8HAuqixxNRNBrSwcs3YXoIFteIlC90Iknyr3xBaI_UMFxzvLozCQb-coa26-aEyd2X6alyLjOBPNAFVekTqHFRVDsNC0LzyeScLEzxwJq3YtkBrEuQrR8e54x6IgLl3uxEN8uLUoSYC4fA4PJnOuZ1Zc5fyQb2Bwo8lZzFkAQpryC1eSVtTG9i7jCNfod5TavgBTHa9B"
                      />
                      <div>
                        <span className="font-label-section text-[11px] font-bold uppercase tracking-wider text-[#121212] block">
                          Thomas L. Friedman
                        </span>
                        <span className="font-caption text-[11px] text-[#5e5e5e]">
                          Foreign Affairs
                        </span>
                      </div>
                    </div>
                    <h4
                      onClick={() => openArticle(thomasFriedmanArticle)}
                      className="font-masthead text-[16px] leading-snug font-semibold text-[#121212] hover:underline cursor-pointer"
                    >
                      A Hard-Headed Roadmap for Real Stability in the Middle East
                    </h4>
                  </article>

                  {/* Columnist 3 */}
                  <article className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        alt="Maureen Dowd"
                        className="w-10 h-10 rounded-full object-cover shrink-0 filter grayscale"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLn1rE9FkrJJ1lo5OP4ZYZ21Zmo7lJ6OBgevxdpIr5-valQ5SUkpY57jzW0lN2lspks-Ko8DGAfAk6jqyLZikulUwDAv6Zz02SW-d6PfY_ibVUglNcn-vTkCtRN7lP__M-bOjqd2mkQVPULmFs6e--hr2nHY0oFckbCpKeJtjVqMeDI5QGao90JaUOx6GOZTombSmEPv6AkJcpgyqgmuCIWz7Q3i5Krlv0z6hDpGOQ-S7tOG214YmX"
                      />
                      <div>
                        <span className="font-label-section text-[11px] font-bold uppercase tracking-wider text-[#121212] block">
                          Maureen Dowd
                        </span>
                        <span className="font-caption text-[11px] text-[#5e5e5e]">
                          Style & Politics
                        </span>
                      </div>
                    </div>
                    <h4
                      onClick={() => openArticle(maureenDowdArticle)}
                      className="font-masthead text-[16px] leading-snug font-semibold text-[#121212] hover:underline cursor-pointer"
                    >
                      Washington's Endless Theatrics and the Vanishing Art of Compromise
                    </h4>
                  </article>
                </div>

                {/* NYT Games Quick Play Widget */}
                <div className="border border-[#e2e2e2] p-3 bg-[#ffffff] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#121212]">
                        extension
                      </span>
                      <span className="font-label-section text-[11px] uppercase font-bold tracking-wider text-[#121212]">
                        Play Games
                      </span>
                    </div>
                    <span className="font-caption text-[11px] text-[#5e5e5e]">May 24 Editions</span>
                  </div>

                  <div className="space-y-2">
                    {/* Wordle */}
                    <div
                      onClick={() => setActiveModal({ type: 'wordle' })}
                      className="flex items-center justify-between p-2 hover:bg-[#f4f3f3] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#121212] text-white font-bold flex items-center justify-center text-xs tracking-wider">
                          W
                        </div>
                        <div>
                          <span className="font-label-section text-xs font-bold text-[#121212] block">
                            Wordle
                          </span>
                          <span className="font-caption text-[10px] text-[#5e5e5e]">
                            No. 1,068 • 5 attempts avg.
                          </span>
                        </div>
                      </div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-[#5e5e5e] group-hover:text-[#121212]">
                        Play →
                      </span>
                    </div>

                    {/* Spelling Bee */}
                    <div
                      onClick={() => setActiveModal({ type: 'spellingBee' })}
                      className="flex items-center justify-between p-2 hover:bg-[#f4f3f3] transition-colors group border-t border-[#e2e2e2] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#f7da21] text-[#121212] font-bold flex items-center justify-center text-xs tracking-wider">
                          🐝
                        </div>
                        <div>
                          <span className="font-label-section text-xs font-bold text-[#121212] block">
                            Spelling Bee
                          </span>
                          <span className="font-caption text-[10px] text-[#5e5e5e]">
                            Genius score: 142 pts
                          </span>
                        </div>
                      </div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-[#5e5e5e] group-hover:text-[#121212]">
                        Play →
                      </span>
                    </div>

                    {/* The Mini */}
                    <div
                      onClick={() => setActiveModal({ type: 'miniCrossword' })}
                      className="flex items-center justify-between p-2 hover:bg-[#f4f3f3] transition-colors group border-t border-[#e2e2e2] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#e8e8e8] border border-[#e2e2e2] text-[#121212] font-bold flex items-center justify-center text-[10px]">
                          5×5
                        </div>
                        <div>
                          <span className="font-label-section text-xs font-bold text-[#121212] block">
                            The Mini Crossword
                          </span>
                          <span className="font-caption text-[10px] text-[#5e5e5e]">
                            Solve in under a minute
                          </span>
                        </div>
                      </div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-[#5e5e5e] group-hover:text-[#121212]">
                        Play →
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* MID-PAGE EDITORIAL FEATURE STRIP: BUSINESS & TECHNOLOGY */}
          <section className="max-w-7xl mx-auto px-4 py-6 w-full">
            <div className="flex items-baseline justify-between border-b-2 border-[#121212] pb-1 mb-4">
              <h3 className="font-label-section text-[13px] uppercase tracking-widest font-bold text-[#121212]">
                Business & Technology
              </h3>
              <div className="flex gap-3 font-label-byline text-xs text-[#5e5e5e]">
                <button
                  onClick={() => openArticle(strongDollarArticle)}
                  className="hover:underline text-[#121212] font-semibold"
                >
                  Markets
                </button>
                <span>•</span>
                <button
                  onClick={() => openArticle(aiWaterArticle)}
                  className="hover:underline"
                >
                  Artificial Intelligence
                </button>
                <span>•</span>
                <button
                  onClick={() => openArticle(startupsArticle)}
                  className="hover:underline"
                >
                  DealBook
                </button>
              </div>
            </div>

            {/* 4-Card Horizontal Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <article className="flex flex-col justify-between space-y-2.5 pb-2 border-b lg:border-b-0 lg:border-r border-[#e2e2e2] pr-0 lg:pr-3">
                <div
                  onClick={() => openArticle(strongDollarArticle)}
                  className="aspect-[3/2] overflow-hidden bg-[#e8e8e8] cursor-pointer"
                >
                  <img
                    alt="Market trends"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG0546m4nyp3o4qVWSXRgb62sWjpiQdS0ZqauwnQ8hkd9aQ2q75uODddaA9gkd1iPZVC4eFPxHajVhJ1DsFe1qQ3UNsyGXuNtmATt7h-r-Pwiq3_gs5lTpD8XQsDvZjYxToPpNRankmcvVXxvdaEzuIqHvdPLGIQ_qfqZ4TngjhxPSJuy7zIj8utVAXwIR99xP0nDOavBcF6bovboQ3DPbcgOurjuNhhdbkEl2j20WxakrWxDUInv3"
                  />
                </div>
                <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                  Markets & Currency
                </span>
                <h4
                  onClick={() => openArticle(strongDollarArticle)}
                  className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                >
                  Why Strong Dollar Hegemony Is Squeezing Developing Sovereign Debt
                </h4>
                <p className="font-body-sm text-[13px] text-[#5e5e5e] leading-snug">
                  Central banks worldwide weigh intervention strategies as local depreciations inflate import costs.
                </p>
                <span className="font-label-byline text-[11px] text-[#666666]">
                  By Patricia Cohen
                </span>
              </article>

              {/* Card 2 */}
              <article className="flex flex-col justify-between space-y-2.5 pb-2 border-b lg:border-b-0 lg:border-r border-[#e2e2e2] pr-0 lg:pr-3">
                <div
                  onClick={() => openArticle(aiWaterArticle)}
                  className="aspect-[3/2] overflow-hidden bg-[#e8e8e8] cursor-pointer"
                >
                  <img
                    alt="AI Data Centers"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwoarobR9FYXOKjU6wAd4Yj3gwBHm2OolZ4WQelY1wxcltU8ScoFPEqNtsgtWfEQyj3UD7QwjJyMsutXx2YtpUDJQzEr1LaQn6N9pz5B1ncEhuqGYaN8RNVr-ZiLICJLYiOY4AHufi3-KpC8pVMZppQQnkj59ph66ZwsPGhN7v54EC27p_KLGwsGLY1-EHo4bWMQEwVhbzK_VC4lx2k2rA4-0E1IJXJQrWb7NZwa89ZhBMTn0Ye3JI"
                  />
                </div>
                <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                  Artificial Intelligence
                </span>
                <h4
                  onClick={() => openArticle(aiWaterArticle)}
                  className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                >
                  The Unseen Water and Energy Footprint Fueling the Cloud Boom
                </h4>
                <p className="font-body-sm text-[13px] text-[#5e5e5e] leading-snug">
                  Gigawatt demand projections force tech giants into direct contracts with nuclear utility operators.
                </p>
                <span className="font-label-byline text-[11px] text-[#666666]">
                  By Cade Metz
                </span>
              </article>

              {/* Card 3 */}
              <article className="flex flex-col justify-between space-y-2.5 pb-2 border-b lg:border-b-0 lg:border-r border-[#e2e2e2] pr-0 lg:pr-3">
                <div
                  onClick={() => openArticle(automakersArticle)}
                  className="aspect-[3/2] overflow-hidden bg-[#e8e8e8] cursor-pointer"
                >
                  <img
                    alt="Automotive factory"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk-DkXOf3FkU2OPLIT7YeZAoj7g_taAEM5j0xXeDMHrFgPGPkb3673nljhQt2vdk2_kcEjzN_eKDJasCKokBmfRLC3BdacXH8PkCjX8b3fsNvGQPfJf8YGmuErOD_6PaDVoGyZmAEueg0dvILYeNWjjKjdlFDP0GVGI4MH8CyLQhqJFF8NrEyhDu3E-IqhluEzeGhWZUAF9Ehs7LXMXnY1HeZ3Ti2-15RJGoAipFdDGNbagkszMCUp"
                  />
                </div>
                <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                  Automotive
                </span>
                <h4
                  onClick={() => openArticle(automakersArticle)}
                  className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                >
                  Automakers Balance EV Expansion With Hybrid Realities
                </h4>
                <p className="font-body-sm text-[13px] text-[#5e5e5e] leading-snug">
                  Consumer demand for range resilience forces Detroit to redesign manufacturing platforms on the fly.
                </p>
                <span className="font-label-byline text-[11px] text-[#666666]">
                  By Neal E. Boudette
                </span>
              </article>

              {/* Card 4 */}
              <article className="flex flex-col justify-between space-y-2.5 pb-2">
                <div
                  onClick={() => openArticle(startupsArticle)}
                  className="aspect-[3/2] overflow-hidden bg-[#e8e8e8] cursor-pointer"
                >
                  <img
                    alt="Venture capital ecosystem"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBvNtTGifowQCInDBxsUHLMluk2jhLvM02co3CHh7BRYVHIQJYSNx-eEdzcTmXMljp0ADJs5fvM1bCDSf-8Ry4gor2NSdcXr_4dMOwg1ptQZHdeEz-K8t1oiGZ6iIlS4I_ugEEdZKN0qtSLuEyf0JIeFhmUFt392mcF-aEJAQ2okRETmx3--NtxqfvvXd3fD0YU_HnLYmWEhKQz2UsNDNoKz407AS5UVfHQK9O1_9b6zbTWe7u-aMI"
                  />
                </div>
                <span className="font-label-section text-[10px] uppercase font-bold text-[#5e5e5e]">
                  Venture Capital
                </span>
                <h4
                  onClick={() => openArticle(startupsArticle)}
                  className="font-masthead text-[16px] leading-snug font-bold text-[#121212] hover:underline cursor-pointer"
                >
                  Early-Stage Startups Confront New Discipline as Cheap Money Vanishes
                </h4>
                <p className="font-body-sm text-[13px] text-[#5e5e5e] leading-snug">
                  Founders pivot toward unit profitability and disciplined runway metrics over unbridled customer acquisition.
                </p>
                <span className="font-label-byline text-[11px] text-[#666666]">
                  By Erin Griffith
                </span>
              </article>
            </div>
          </section>

          {/* CULTURAL & LIFESTYLE DIGEST: GREAT READ, COOKING, WIRECUTTER */}
          <section className="max-w-7xl mx-auto px-4 py-8 w-full border-t border-[#e2e2e2]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* The Great Read (7 columns) */}
              <div className="lg:col-span-7 pr-0 lg:pr-6 lg:border-r border-[#e2e2e2] space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#121212] text-white font-label-section text-[10px] uppercase tracking-wider font-bold">
                    The Great Read
                  </span>
                  <span className="font-caption text-[11px] text-[#5e5e5e]">Long-Form Narrative</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-7 space-y-2">
                    <h3
                      onClick={() => openArticle(watchmakersArticle)}
                      className="font-masthead text-2xl sm:text-[30px] font-semibold text-[#121212] leading-tight hover:underline cursor-pointer"
                    >
                      The Last Watchmakers of the Swiss Jura Valley
                    </h3>
                    <p className="font-serif text-[15px] text-[#1a1c1c] leading-relaxed">
                      <span className="float-left text-4xl leading-none font-bold font-masthead pr-2 pt-1 text-[#121212]">
                        I
                      </span>
                      n isolated workshops nestled in Alpine meadows, independent masters spend months assembling miniature mechanical escapements by hand, defying the digital monoculture with tick-marks of pure patience.
                    </p>
                    <div className="flex items-center gap-3 pt-2 font-label-byline text-xs text-[#5e5e5e]">
                      <span>By Stephen Castle</span>
                      <span>•</span>
                      <span>Photographs by Laetitia Vancon</span>
                    </div>
                  </div>

                  <div
                    onClick={() => openArticle(watchmakersArticle)}
                    className="sm:col-span-5 aspect-[4/5] overflow-hidden bg-[#e8e8e8] cursor-pointer"
                  >
                    <img
                      alt="Swiss watchmaker workshop"
                      className="w-full h-full object-cover hover:scale-103 transition-transform"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC206fmylITIpf6WBUOYzitOpG-ZAdo0PK8eopp9YRsx9E8gMhJ3I5QQY6t5aFDQGu0-ISDLeRy6vxur7MqX0B2vzp6loK2u0D7WPX5HcffwWeul5tnjm4_dG6nq5GZMhPq-qHbtiujP4kHUOgJUXuFErfMijMD9DLQJNKXIvOHM_DkhhphTNSOaWzGXBfCFB9_vJAfz278hewuXfEhXNO14OfLWNBjgSV6jU03rswwa9lhb6f2NafO"
                    />
                  </div>
                </div>
              </div>

              {/* Cooking & Wirecutter Highlights (5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                {/* NYT Cooking Card */}
                <article className="p-3.5 bg-[#f4f3f3] border-t-2 border-[#b23b12] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-section text-[11px] uppercase tracking-wider font-bold text-[#b23b12]">
                      NYT Cooking
                    </span>
                    <span className="font-caption text-[11px] text-[#5e5e5e]">Recipe of the Day</span>
                  </div>

                  <div
                    onClick={() => openArticle(chickenArticle)}
                    className="flex gap-3 cursor-pointer group"
                  >
                    <div className="w-24 h-24 shrink-0 overflow-hidden bg-[#e8e8e8]">
                      <img
                        alt="Crispy Lemon-Herb Roast Chicken"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcy-CxJPBwE5JQE4j3GyCPXCUhIUcd1OR5XqRiXzEcj-YTki-hJ9UtqqEN27uxTcZyyjimE0dHXclfTkkZ4KdOv4D25dAhpXGH7Wx-dmyPxTOJOKdayrjGbjtRaXT7h6Mwe_HtGxVJzGkmerlivpgi639Dl6ZYTBL1QoZpn0x4-tlFOo8sfJiZJ6xb7Yiba0m3NcgrEJpm0ot-tG5fIEnKsLLrktpCexXDqa6YpB22ttwo1LH-m4X0"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-masthead text-[16px] leading-snug font-bold text-[#121212] group-hover:underline">
                        Crispy Lemon-Herb Roast Chicken
                      </h4>
                      <p className="font-body-sm text-[12px] text-[#5e5e5e] line-clamp-2">
                        A simple overnight salting technique delivers crackling skin and fragrant, tender meat every single time.
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-byline text-[11px] text-[#121212]">
                        <span className="text-amber-600 font-bold">★ 4.8</span>
                        <span className="text-[#5e5e5e]">(3,412 ratings)</span>
                        <span className="text-[#5e5e5e]">•</span>
                        <span className="text-[#5e5e5e]">1 hr 15 mins</span>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Wirecutter Card */}
                <article className="p-3.5 bg-[#f4f3f3] border-t-2 border-[#006699] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-section text-[11px] uppercase tracking-wider font-bold text-[#006699]">
                      Wirecutter
                    </span>
                    <span className="font-caption text-[11px] text-[#5e5e5e]">Independent Reviews</span>
                  </div>

                  <div
                    onClick={() => openArticle(espressoArticle)}
                    className="flex gap-3 cursor-pointer group"
                  >
                    <div className="w-24 h-24 shrink-0 overflow-hidden bg-[#e8e8e8]">
                      <img
                        alt="Tested espresso machine"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR1iS_7o3wH9JAhvgfr13gn4shyVsY1kxy3aDooIdcUZlkGAhUac6T2T9BUNGbfAC3B1-KZkOwEh7yao49w0Kw1SEkk-SNpXC1K15KMy4TEJl2eFLFfC9T6iIoAcjD2lrS_HbgocFySBeZTAfSnOYsG-8N_F66e_cG4qu_A364xH6WjVaeYyuGRQuf-S3GYhZjfCby2Vnhm8NvoXdZohjaXTbD5qaFzdmPw_yFYwAWiDrG57fqve3X"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-masthead text-[16px] leading-snug font-bold text-[#121212] group-hover:underline">
                        The Best Espresso Machines After 100 Hours of Testing
                      </h4>
                      <p className="font-body-sm text-[12px] text-[#5e5e5e] line-clamp-2">
                        We pulled over 400 double shots to find durable machines that deliver cafe-grade crema with minimal fuss.
                      </p>
                      <div className="pt-1">
                        <span className="font-label-section text-[10px] uppercase tracking-wider text-[#121212] font-bold group-hover:underline flex items-center">
                          Read The Guide →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* BROADSHEET RANKED MOST POPULAR BAR */}
          <section className="max-w-7xl mx-auto px-4 py-6 w-full border-t-2 border-[#121212]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-label-section text-[12px] uppercase tracking-widest font-bold text-[#121212]">
                Most Popular Across The Times
              </h3>
              <span className="font-caption text-[11px] text-[#5e5e5e]">Trending over the last 24 hours</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {/* 1 */}
              <article
                onClick={() => openArticle(popular1)}
                className="flex gap-2.5 pb-2 border-b sm:border-b-0 border-[#e2e2e2] cursor-pointer group"
              >
                <span className="font-masthead text-3xl font-light text-[#5e5e5e]/40 select-none group-hover:text-[#121212] transition-colors">
                  1
                </span>
                <div className="space-y-1">
                  <h4 className="font-masthead text-[14px] leading-snug font-semibold text-[#121212] group-hover:underline">
                    The Science Behind Sleep Debt and How to Actually Recover
                  </h4>
                  <span className="font-label-byline text-[10px] text-[#5e5e5e] block">Well</span>
                </div>
              </article>

              {/* 2 */}
              <article
                onClick={() => openArticle(popular2)}
                className="flex gap-2.5 pb-2 border-b sm:border-b-0 border-[#e2e2e2] cursor-pointer group"
              >
                <span className="font-masthead text-3xl font-light text-[#5e5e5e]/40 select-none group-hover:text-[#121212] transition-colors">
                  2
                </span>
                <div className="space-y-1">
                  <h4 className="font-masthead text-[14px] leading-snug font-semibold text-[#121212] group-hover:underline">
                    Architectural Revival: Inside an 18th-Century Barn Rebuilt in Hudson Valley
                  </h4>
                  <span className="font-label-byline text-[10px] text-[#5e5e5e] block">Real Estate</span>
                </div>
              </article>

              {/* 3 */}
              <article
                onClick={() => openArticle(popular3)}
                className="flex gap-2.5 pb-2 border-b sm:border-b-0 border-[#e2e2e2] cursor-pointer group"
              >
                <span className="font-masthead text-3xl font-light text-[#5e5e5e]/40 select-none group-hover:text-[#121212] transition-colors">
                  3
                </span>
                <div className="space-y-1">
                  <h4 className="font-masthead text-[14px] leading-snug font-semibold text-[#121212] group-hover:underline">
                    Why High-Altitude Mountaineering Is More Crowded Than Ever
                  </h4>
                  <span className="font-label-byline text-[10px] text-[#5e5e5e] block">Sports</span>
                </div>
              </article>

              {/* 4 */}
              <article
                onClick={() => openArticle(popular4)}
                className="flex gap-2.5 pb-2 border-b sm:border-b-0 border-[#e2e2e2] cursor-pointer group"
              >
                <span className="font-masthead text-3xl font-light text-[#5e5e5e]/40 select-none group-hover:text-[#121212] transition-colors">
                  4
                </span>
                <div className="space-y-1">
                  <h4 className="font-masthead text-[14px] leading-snug font-semibold text-[#121212] group-hover:underline">
                    Ten Essential Books That Redefined Modern Philosophy
                  </h4>
                  <span className="font-label-byline text-[10px] text-[#5e5e5e] block">Books</span>
                </div>
              </article>

              {/* 5 */}
              <article
                onClick={() => openArticle(popular5)}
                className="flex gap-2.5 cursor-pointer group"
              >
                <span className="font-masthead text-3xl font-light text-[#5e5e5e]/40 select-none group-hover:text-[#121212] transition-colors">
                  5
                </span>
                <div className="space-y-1">
                  <h4 className="font-masthead text-[14px] leading-snug font-semibold text-[#121212] group-hover:underline">
                    How a Forgotten 1920s Cocktail Conquered Cosmopolitan Bars Again
                  </h4>
                  <span className="font-label-byline text-[10px] text-[#5e5e5e] block">Style</span>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#ffffff] border-t-4 border-[#121212] mt-12 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#e2e2e2] gap-4">
            <div className="flex items-center gap-3">
              <span className="nyt-blackletter text-2xl text-[#1a1c1c]">The New York Times</span>
              <span className="font-label-byline text-xs text-[#5e5e5e] border-l border-[#e2e2e2] pl-3">
                © 2024 The New York Times Company
              </span>
            </div>
            <div className="flex items-center gap-4 font-label-section text-[11px] uppercase tracking-wider">
              <a href="#" className="text-[#444748] hover:text-[#1a1c1c] hover:underline">
                NYT Licensing
              </a>
              <a href="#" className="text-[#444748] hover:text-[#1a1c1c] hover:underline">
                Advertise
              </a>
              <a href="#" className="text-[#444748] hover:text-[#1a1c1c] hover:underline">
                Careers
              </a>
              <a href="#" className="text-[#444748] hover:text-[#1a1c1c] hover:underline">
                Help
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-8 border-b border-[#e2e2e2] font-label-byline text-xs text-[#444748]">
            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                News
              </h4>
              <p><a onClick={() => setSelectedSection('All')} className="hover:underline cursor-pointer">Home Page</a></p>
              <p><a onClick={() => handleNavClick('U.S.')} className="hover:underline cursor-pointer">U.S.</a></p>
              <p><a onClick={() => handleNavClick('World')} className="hover:underline cursor-pointer">World</a></p>
              <p><a onClick={() => handleNavClick('Business')} className="hover:underline cursor-pointer">Business</a></p>
              <p><a onClick={() => handleNavClick('Sports')} className="hover:underline cursor-pointer">Sports</a></p>
              <p><a onClick={() => openArticle(opticalChipsArticle)} className="hover:underline cursor-pointer">Tech</a></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                Opinion
              </h4>
              <p><a onClick={() => handleNavClick('Opinion')} className="hover:underline cursor-pointer">Today’s Opinion</a></p>
              <p><a onClick={() => openArticle(davidBrooksArticle)} className="hover:underline cursor-pointer">Columnists</a></p>
              <p><a onClick={() => openArticle(thomasFriedmanArticle)} className="hover:underline cursor-pointer">Editorials</a></p>
              <p><a onClick={() => openArticle(maureenDowdArticle)} className="hover:underline cursor-pointer">Guest Essays</a></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                Arts
              </h4>
              <p><a onClick={() => handleNavClick('Arts')} className="hover:underline cursor-pointer">Today’s Arts</a></p>
              <p><a onClick={() => openArticle(popular2)} className="hover:underline cursor-pointer">Art & Design</a></p>
              <p><a onClick={() => openArticle(popular4)} className="hover:underline cursor-pointer">Books</a></p>
              <p><a onClick={() => openArticle(watchmakersArticle)} className="hover:underline cursor-pointer">Craftsmanship</a></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                Living
              </h4>
              <p><a onClick={() => openArticle(automakersArticle)} className="hover:underline cursor-pointer">Automotive</a></p>
              <p><a onClick={() => setActiveModal({ type: 'wordle' })} className="hover:underline cursor-pointer">Games</a></p>
              <p><a onClick={() => openArticle(chickenArticle)} className="hover:underline cursor-pointer">Food & Cooking</a></p>
              <p><a onClick={() => openArticle(popular1)} className="hover:underline cursor-pointer">Health & Well</a></p>
              <p><a onClick={() => openArticle(popular5)} className="hover:underline cursor-pointer">Style</a></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                More
              </h4>
              <p><a onClick={() => openArticle(leadArticle)} className="hover:underline cursor-pointer">Audio & Podcasts</a></p>
              <p><a onClick={() => setActiveModal({ type: 'liveUpdates' })} className="hover:underline cursor-pointer">Live Events</a></p>
              <p><a onClick={() => openArticle(espressoArticle)} className="hover:underline cursor-pointer">Wirecutter</a></p>
              <p><a onClick={() => openArticle(chickenArticle)} className="hover:underline cursor-pointer">NYT Cooking</a></p>
              <p><a onClick={() => setActiveModal({ type: 'todaysPaper' })} className="hover:underline cursor-pointer">TimesMachine</a></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-section text-[11px] uppercase font-bold text-[#1a1c1c] tracking-wider mb-3">
                Subscribe
              </h4>
              <p><a onClick={() => setActiveModal({ type: 'subscribe' })} className="hover:underline font-semibold text-[#1a1c1c] cursor-pointer">Home Delivery</a></p>
              <p><a onClick={() => setActiveModal({ type: 'subscribe' })} className="hover:underline font-semibold text-[#1a1c1c] cursor-pointer">Digital Subscriptions</a></p>
              <p><a onClick={() => setActiveModal({ type: 'wordle' })} className="hover:underline cursor-pointer">Games All-Access</a></p>
              <p><a onClick={() => openArticle(chickenArticle)} className="hover:underline cursor-pointer">Cooking All-Access</a></p>
              <p><a onClick={() => setActiveModal({ type: 'subscribe' })} className="hover:underline cursor-pointer">Education Rate</a></p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveModal({ type: 'subscribe' })}
                  className="font-bold text-[#1a1c1c] underline uppercase text-[10px] tracking-wider"
                >
                  Manage My Account
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-caption text-[11px] text-[#5e5e5e]">
            <a href="#" className="hover:underline">© 2024 The New York Times Company</a>
            <a href="#" className="hover:underline">NYTCo</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Work with us</a>
            <a href="#" className="hover:underline">Advertise</a>
            <a href="#" className="hover:underline">T Brand Studio</a>
            <a href="#" className="hover:underline">Your Ad Choices</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Site Map</a>
            <a href="#" className="hover:underline">Subscriptions</a>
          </div>
        </div>
      </footer>

      {/* ACTIVE MODALS & DRAWERS */}
      {activeModal?.type === 'article' && (
        <ArticleModal
          article={activeModal.article}
          onClose={() => setActiveModal(null)}
          isBookmarked={bookmarks.includes(activeModal.article.id)}
          onToggleBookmark={toggleBookmark}
          onSelectArticle={openArticle}
          relatedArticles={ALL_ARTICLES.filter(
            (a) => a.section === activeModal.article.section && a.id !== activeModal.article.id
          )}
        />
      )}

      {activeModal?.type === 'wordle' && (
        <WordleModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'spellingBee' && (
        <SpellingBeeModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'miniCrossword' && (
        <MiniCrosswordModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'liveUpdates' && (
        <LiveUpdatesDrawer
          onClose={() => setActiveModal(null)}
          onSelectArticle={openArticle}
          leadArticle={leadArticle}
        />
      )}

      {activeModal?.type === 'search' && (
        <SearchModal
          onClose={() => setActiveModal(null)}
          articles={ALL_ARTICLES}
          onSelectArticle={openArticle}
        />
      )}

      {activeModal?.type === 'readingList' && (
        <ReadingListDrawer
          onClose={() => setActiveModal(null)}
          savedArticles={savedArticlesList}
          onSelectArticle={openArticle}
          onRemoveBookmark={toggleBookmark}
        />
      )}

      {activeModal?.type === 'subscribe' && (
        <SubscribeModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'newsletter' && (
        <NewsletterModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'markets' && (
        <MarketsDrawer onClose={() => setActiveModal(null)} />
      )}

      {activeModal?.type === 'todaysPaper' && (
        <TodaysPaperModal
          onClose={() => setActiveModal(null)}
          articles={ALL_ARTICLES}
          onSelectArticle={openArticle}
        />
      )}
    </div>
  );
}
