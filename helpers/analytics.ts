import { Language, CustomClicks } from '../types/'

export const googlePageviews = (url: string, route: string): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
    route,
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

export const googleCustomClick = (clickEvent: CustomClicks): void => {
  window.gtag('event', 'click', clickEvent)
}
