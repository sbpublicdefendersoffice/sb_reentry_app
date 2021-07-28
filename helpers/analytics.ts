export const googlePageviews = (url: string): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

export const googleSearch = (query: string): void => {
  window.gtag('event', 'search', {
    search_term: query,
  })
}

export const googleViewSearchResults = (query: string): void => {
  window.gtag('event', 'view_search_results', {
    search_term: query,
  })
}
