import type { AppProps } from "next/app"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Script from "next/script"
import { useEffect } from "react"
import { GTM_ID, pageview } from "../lib/gtm"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootswatch/dist/united/bootstrap.min.css"
import "../styles/globals.css"

const getTitle = () => {
  return process.env.NODE_ENV === "development"
    ? "dev - Jinjester"
    : "Jinjester"
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview)

    return () => {
      router.events.off("routeChangeComplete", pageview)
    }
  }, [router.events])

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />

      <Head>
        <title>{getTitle()}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
