// import App from "next/app";
import { useRouter } from 'next/router'
import { useState, useEffect, useReducer } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { siteTitle, ENGLISH, SPANISH, isProd } from '../constants'
import { Language, SantaBarbaraCountyCoords } from '../types'
import {
  GlobalSearchProvider,
  LangProvider,
  LocationProvider,
  ToastProvider,
  ViewContext,
  FavoriteContext,
} from '../hooks'
import {
  Footer,
  Header,
  LangSwitcher,
  Toast,
  IsThisUsefulTag,
  MobileAppBar,
} from '../components'
import {
  checkAndSetUserLocation,
  googlePageviews,
  viewReducer,
} from '../helpers/'
import '../styles/globals.css'
import '../styles/variables.css'

const App = ({ Component, pageProps }: AppProps) => {
  const ISSERVER = typeof localStorage === 'undefined'
  const [state, dispatch] = useReducer(viewReducer, {
    isListView: false,
    isMapView: true,
  })
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
            name="description"
            content={`${siteTitle}, A dynamic web app to help justice impacted individuals access resources to aid in a sucessful reentry after a jail or prison stay.`}
          />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />
          <title>{siteTitle}</title>
        </Head>
        <LangProvider value={{ language, setLanguage }}>
          <ViewContext.Provider value={{ state, dispatch }}>
            <FavoriteContext.Provider
              value={{
                favoriteResources: favoriteRecords,
                updateFavoriteResources: updateFavoriteResources,
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
            </FavoriteContext.Provider>
          </ViewContext.Provider>
        </LangProvider>
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
