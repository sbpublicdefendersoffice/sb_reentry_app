export const googlePageviews = (url: string): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

export const googleSearch = (query: string): void => {
  window.gtag('event', 'search', {
    search_terms: query,
  })
}
