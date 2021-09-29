// import App from "next/app";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import { ENGLISH, SPANISH, isProd } from '../constants'
import { Language, SantaBarbaraCountyCoords } from '../types'
import {
  GlobalSearchProvider,
  LangProvider,
  LocationProvider,
  ToastProvider,
  ViewProvider,
  FavoriteProvider,
} from '../hooks'
import {
  Footer,
  Header,
  LangSwitcher,
  Toast,
  IsThisUsefulTag,
  MobileAppBar,
} from '../components'
import { checkAndSetUserLocation, googlePageviews } from '../helpers/'
import '../styles/globals.css'
import '../styles/variables.css'

const App = ({ Component, pageProps }: AppProps) => {
  const ISSERVER = typeof localStorage === 'undefined'
  const [isMapView, setIsMapView] = useState<boolean>(true)
  const [favorites, setFavorites] = useState(null)
  const [favoriteRecords, setFavoriteRecords] = useState(null)
  const { events, route } = useRouter()
  const [language, setLanguage] = useState<Language | null>(null)
  const [coords, setCoords] = useState<SantaBarbaraCountyCoords | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const updateFavoriteResources = (
    name: React.Component<any, any>,
    otherName: React.Component<any, any>,
  ) => {
    const updated = [...favorites]
    const updatedRecords = [...favoriteRecords]
    const isFavorite = updated.indexOf(name)
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1)
      updatedRecords.splice(isFavorite, 1)
    } else {
      updated.push(name)
      updatedRecords.push(otherName)
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    localStorage.setItem('favoriteRecords', JSON.stringify(updatedRecords))
    setFavorites(JSON.parse(localStorage.getItem('favorites')))
    setFavoriteRecords(JSON.parse(localStorage.getItem('favoriteRecords')))
  }

  useEffect((): void => {
    const languageToLoad: Language = navigator.language.startsWith('es')
      ? SPANISH
      : ENGLISH
    setLanguage(languageToLoad)
    if (!coords) checkAndSetUserLocation(setCoords, setToast, languageToLoad)
  }, [])

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')))
    setFavoriteRecords(JSON.parse(localStorage.getItem('favoriteRecords')))
    if (localStorage.getItem('favorites') === '[]') {
      localStorage.setItem('favorites', '[]')
    }
    if (localStorage.getItem('favoriteRecords') === '[]') {
      localStorage.setItem('favoriteRecords', '[]')
    }
  }, [])

  /* istanbul ignore next */
  useEffect(() => {
    if (isProd && route) {
      events.on('routeChangeComplete', url => googlePageviews(url, route))
      return () =>
        events.off('routeChangeComplete', url => googlePageviews(url, route))
    }
  }, [events])

  if (!ISSERVER && localStorage.getItem('favorites') === null) {
    setFavorites(JSON.parse(localStorage.getItem('favorites')))
    setFavoriteRecords(JSON.parse(localStorage.getItem('favoriteRecords')))
    localStorage.setItem('favorites', '[]')
    localStorage.setItem('favoriteRecords', '[]')
  }
  return (
    language && (
      <>
        <Head>
          <meta
            key="_app viewport"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />
        </Head>
        <LangProvider value={{ language, setLanguage }}>
          <ViewProvider value={{ isMapView, setIsMapView }}>
            <FavoriteProvider
              value={{
                favoriteResources: favoriteRecords,
                updateFavoriteResources,
              }}
            >
              <LocationProvider value={{ coords, setCoords }}>
                <ToastProvider value={{ toast, setToast }}>
                  <GlobalSearchProvider>
                    <Header />
                    <LangSwitcher />
                    <main>
                      <Component {...pageProps} />
                    </main>
                    <IsThisUsefulTag />
                    <Footer />
                    <MobileAppBar />
                    <Toast />
                  </GlobalSearchProvider>
                </ToastProvider>
              </LocationProvider>
            </FavoriteProvider>
          </ViewProvider>
        </LangProvider>
        <br style={{ display: 'none' }} data-testid="end_of_doc" />
      </>
    )
  )
}
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps }
// }
export default App
