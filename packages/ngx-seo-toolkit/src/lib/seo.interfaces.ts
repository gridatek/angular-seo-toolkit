export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  robots?: string;
  canonical?: string;
}

export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterCardData {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
}

export interface StructuredDataSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SeoDefaultConfig {
  defaultTitle?: string;
  titleTemplate?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
  defaultAuthor?: string;
  defaultImage?: string;
  defaultType?: string;
  siteName?: string;
  defaultLocale?: string;
  defaultRobots?: string;
}
