import { ThemeProvider } from 'next-themes'
import 'focus-visible'
import '../styles/tailwind.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
