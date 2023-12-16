import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="JinJester is the testing tool for Jinja2. You can test or use Jinja2 by trial with JInjester."
          />
          <meta
            property="og:title"
            content="JinJester - The testing tool for Jinja2."
          />
          <meta
            property="og:description"
            content="JinJester is the testing tool for Jinja2. You can test or use Jinja2 by trial with JInjester."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://torii.shirakiya.com/" />
          <meta property="og:site_name" content="JinJester" />
          <meta
            property="og:image"
            content="https://torii.shirakiya.com/torii_og.png"
          />
          <meta property="og:image:width" content="256" />
          <meta property="og:image:height" content="256" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@mohdjami" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
