// import App from "next/app";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'

import { siteTitle, ENGLISH, SPANISH, isProd } from '../constants'
import { Language, SantaBarbaraCountyCoords } from '../types'
import {
  GlobalSearchProvider,
  LangProvider,
  LocationProvider,
  ToastProvider,
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
  const { events } = useRouter()

  const [language, setLanguage] = useState<Language | null>(null)
  const [coords, setCoords] = useState<SantaBarbaraCountyCoords | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect((): void => {
    const languageToLoad: Language = navigator.language.startsWith('es')
      ? SPANISH
      : ENGLISH

    setLanguage(languageToLoad)

    if (!coords) checkAndSetUserLocation(setCoords, setToast, languageToLoad)
  }, [])

  useEffect(() => {
    if (isProd) {
      // Log pageviews on Google Analytics while _app is mounted
      events.on('routeChangeComplete', googlePageviews)
      return () => events.off('routeChangeComplete', googlePageviews)
    }
  }, [events])

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
