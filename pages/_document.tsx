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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
