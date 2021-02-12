import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* PWA Tags */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="./images/logo192.png" />
          <meta name="theme-color" content="#2f4cb8" />
          {/*  */}
          <link rel="icon" href="./images/heart.svg" type="image/svg+xml" />
          <meta
            name="description"
            content="Santa Barbara Reentry Project, A dynamic web app to help justice impacted individuals access resources to aid in a sucessful reentry after a jail or prison stay."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
