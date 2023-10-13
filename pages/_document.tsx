import Document, { Head, Html, Main, NextScript } from 'next/document'
import { isProd } from '../constants/env'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {
            /* istanbul ignore next */
            isProd && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
              });
            `,
                  }}
                />
              </>
            )
          }
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com/"
            crossOrigin="anonymous"
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
            crossOrigin="anonymous"
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
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="icon"
            href="./icons/thriveleaffavicon.svg"
            type="image/svg+xml"
          />
          <link rel="apple-touch-icon" href="./icons/thriveleaftouchicon.png" />
          <meta property="og:site_name" content="ThriveSBC" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
