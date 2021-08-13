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
          <link
            rel="icon"
            href="./icons/thriveleaffavicon.svg"
            type="image/svg+xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <br style={{ display: 'none' }} data-testid="end_of_doc" />
        </body>
      </Html>
    )
  }
}
