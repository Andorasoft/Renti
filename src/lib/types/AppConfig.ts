// src/types/config.ts

/**
 * Language options allowed in the application.
 */
type Lang = 'en' | 'es';

/**
 * Theme options allowed in the application.
 */
type Theme = 'light' | 'dark';

/**
 * Global configuration object accessible across the app.
 */
export interface AppConfig {
  lang: Lang;
  theme: Theme;
}
