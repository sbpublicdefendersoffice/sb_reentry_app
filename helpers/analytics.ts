import { Language } from '../types/language'

export const googlePageviews = (url: string): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

export const googleSearch = (
  search_term: string,
  language_used: Language,
): void => {
  window.gtag('event', 'search', {
    search_term,
    language_used,
  })
}

export const googleViewSearchResults = (
  search_term: string,
  language_used: Language,
): void => {
  window.gtag('event', 'view_search_results', {
    search_term,
    language_used,
  })
}
