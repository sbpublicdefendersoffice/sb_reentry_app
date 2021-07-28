import { Language } from '../types/language'

export const googlePageviews = (url: string): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

export const googleSearch = (query: string, language: Language): void => {
  window.gtag('event', 'search', {
    search_term: query,
    language,
  })
}

export const googleViewSearchResults = (
  query: string,
  language: Language,
): void => {
  window.gtag('event', 'view_search_results', {
    search_term: query,
    language,
  })
}
