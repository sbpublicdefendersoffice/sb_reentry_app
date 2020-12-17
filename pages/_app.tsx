// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { Header } from '../components'
import { PublicPage } from '../ui'

import '../styles/globals.css'
import '../styles/variables.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <PublicPage>
        <Component {...pageProps} />
      </PublicPage>
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
