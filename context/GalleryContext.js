import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, onSnapshot, query, orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'gallery'

export const categoryColors = {
  'Workshop':           'from-violet-500 to-indigo-600',
  'Community Outreach': 'from-emerald-500 to-teal-600',
  'Family Health':      'from-rose-500 to-pink-600',
  'Intervention':       'from-primary-500 to-indigo-600',
}

// ── API helper — all writes go through /api/gallery (Admin SDK) ───────────────
async function galleryApi(method, body) {
  const secret = process.env.NEXT_PUBLIC_ADMIN_API_SECRET
  if (!secret) throw new Error('NEXT_PUBLIC_ADMIN_API_SECRET is not configured.')

  let init = {
    method,
    headers: { 'x-admin-secret': secret },
  }

  if (body instanceof FormData) {
    // multipart — browser sets Content-Type with boundary automatically
    init.body = body
  } else {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch('/api/gallery', init)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`)
  return data
}

const GalleryContext = createContext(null)

export function GalleryProvider({ children }) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // ── Real-time Firestore listener (read-only client SDK) ───────────────────
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('uploadedAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        console.error('Firestore:', err)
        setError(err.message)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  // ── Add — supports file upload or plain URL ───────────────────────────────
  const addItem = async (item) => {
    if (item.file) {
      // Multipart upload: let the API route handle Storage
      const fd = new FormData()
      fd.append('file',     item.file)
      fd.append('title',    item.title    || '')
      fd.append('category', item.category || '')
      fd.append('date',     item.date     || '')
      fd.append('location', item.location || '')
      fd.append('desc',     item.desc     || '')
      return galleryApi('POST', fd)
    }

    // URL-only path
    return galleryApi('POST', {
      type:     item.type,
      title:    item.title,
      category: item.category,
      date:     item.date,
      location: item.location || '',
      desc:     item.desc     || '',
      src:      item.src      || '',
    })
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteItem = async (id) => {
    return galleryApi('DELETE', { id })
  }

  // ── Update ────────────────────────────────────────────────────────────────
  const updateItem = async (id, updates) => {
    return galleryApi('PATCH', { id, ...updates })
  }

  return (
    <GalleryContext.Provider value={{ items, loading, error, addItem, deleteItem, updateItem, categoryColors }}>
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  const ctx = useContext(GalleryContext)
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider')
  return ctx
}
