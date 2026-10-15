export interface Article {
  id: string;
  title: string;
  kicker?: string;
  kickerColor?: string;
  subtitle: string;
  leadSnippet?: string;
  body: string[];
  author: string;
  authorRole?: string;
  authorImage?: string;
  timeAgo: string;
  date: string;
  section: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  readTime: string;
  bullets?: string[];
  tags: string[];
  pullQuote?: {
    text: string;
    attribution: string;
  };
  commentsCount?: number;
  featured?: boolean;
  edition?: string;
}

export type ActiveModal =
  | null
  | { type: 'article'; article: Article }
  | { type: 'wordle' }
  | { type: 'spellingBee' }
  | { type: 'miniCrossword' }
  | { type: 'liveUpdates' }
  | { type: 'subscribe' }
  | { type: 'newsletter' }
  | { type: 'search' }
  | { type: 'readingList' }
  | { type: 'markets' }
  | { type: 'todaysPaper' };
