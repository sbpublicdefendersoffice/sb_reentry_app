import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com/"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
            media="print"
            // @ts-ignore
            onLoad="this.media='all'"
          />
          <link
            rel="preconnect"
            href="https://api.mapbox.com/"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"
            rel="stylesheet"
            // @ts-ignore
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"
            />
          </noscript>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* PWA Tags */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="./images/logo192.png" />
          <meta name="theme-color" content="#2f4cb8" />
          {/*  */}
          <link rel="icon" href="./images/leaf.svg" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
