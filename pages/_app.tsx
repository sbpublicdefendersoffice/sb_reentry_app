// import App from "next/app";
import { useState, useEffect } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'

import { Language, ENGLISH, SPANISH } from '../types/language'
import { Provider as LangProvider } from '../hooks/useLanguage'
import { Header, LangSwitcher } from '../components'
import { PublicPage } from '../ui'

import '../styles/globals.css'
import '../styles/variables.css'

const App = ({ Component, pageProps }: AppProps) => {
  const [language, setLanguage] = useState<Language | null>(null)

  useEffect(() => {
    const { language } = window.navigator
    if (language.startsWith('es')) setLanguage(SPANISH)
    else setLanguage(ENGLISH)
  }, [])

  return (
    <>
      <Head>
        <meta
          name="description"
          content={
            language === ENGLISH
              ? 'Santa Barbara Reentry Project, A dynamic web app to help justice impacted individuals access resources to aid in a sucessful reentry after a jail or prison stay.'
              : 'Santa Barbara Reentry Project, una aplicación web dinámica para ayudar a las personas afectadas por la justicia a acceder a los recursos para ayudar a una reincorporación exitosa después de una estancia en la cárcel o prisión.'
          }
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <title>Santa Barbara Reentry</title>
      </Head>
      {language && (
        <LangProvider value={{ language, setLanguage }}>
          <LangSwitcher />
          <Header />
          <PublicPage>
            <Component {...pageProps} />
          </PublicPage>
        </LangProvider>
      )}
    </>
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
