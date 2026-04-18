export interface ProfileData {
  username: string;
  name: string;
  tagline: string;
  bio: string;
  working: string;
  learning: string;
  askme: string;
  funfact: string;
  showStats: boolean;
  showLangs: boolean;
  showStreak: boolean;
  showTrophies: boolean;
  showVisitors: boolean;
  statsTheme: string;
  hideStats: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  discord: string;
  email: string;
  website: string;
  youtube: string;
  devto: string;
  selectedTechs: Set<number>;
  showQuote: boolean;
  showMeme: boolean;
  showSnake: boolean;
  showSpotify: boolean;
  spotify: string;
  bmc: string;
  kofi: string;
  paypal: string;
  layout: 'center' | 'left' | 'grid' | 'side';
  brandColor: string;
  bannerStyle: string;
  mediumRss: string;
  devtoWidget: string;
  leetcodeUsername: string;
  codewarsUsername: string;
  showBlogPosts: boolean;
  showLeetcode: boolean;
  showCodewars: boolean;
}

export type Page = 'home' | 'builder' | 'features' | 'tools';

export interface TechItem {
  name: string;
  icon: string;
  simple: string;
  category: string;
}
