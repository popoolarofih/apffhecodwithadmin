import '../styles/globals.css'
import { GalleryProvider } from '../context/GalleryContext'
import { AuthProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GalleryProvider>
        <Component {...pageProps} />
      </GalleryProvider>
    </AuthProvider>
  )
}
