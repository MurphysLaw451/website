import { Head, Html, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react'

export default function Document(props) {
    let pageProps = props.__NEXT_DATA__?.props?.pageProps

    const [ready, setReady] = useState(false)

    return (
        <Html
            className="h-full scroll-smooth antialiased [font-feature-settings:'ss01']"
            lang="en"
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />

                <script
                    async
                    type="text/javascript"
                    src="/charting_library/charting_library.js"
                ></script>

                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-SHQ22SS768"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){
dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-SHQ22SS768");
`,
                    }}
                ></script>
            </Head>
            <body className="flex h-full flex-col bg-light-200 bg-fixed dark:bg-gradient-radial dark:from-darkblue dark:to-dark">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
