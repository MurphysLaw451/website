import { Head, Html, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react'

export default function Document(props) {
  let pageProps = props.__NEXT_DATA__?.props?.pageProps

  const [ready, setReady] = useState(false);

  return (
    <Html
      className="h-full scroll-smooth antialiased [font-feature-settings:'ss01']"
      lang="en"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="flex h-full flex-col bg-white dark:bg-gray-900 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
