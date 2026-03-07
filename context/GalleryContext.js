import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, deleteDoc,
  updateDoc, doc, serverTimestamp, query, orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'gallery'

export const categoryColors = {
  'Workshop':           'from-violet-500 to-indigo-600',
  'Community Outreach': 'from-emerald-500 to-teal-600',
  'Family Health':      'from-rose-500 to-pink-600',
  'Intervention':       'from-primary-500 to-indigo-600',
}

const GalleryContext = createContext(null)

export function GalleryProvider({ children }) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // Real-time Firestore listener — updates everywhere instantly
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

  // Add — src is a plain URL string (Firebase Storage public link, etc.)
  const addItem = async (item) => {
    const payload = {
      type:       item.type || 'image',
      title:      item.title,
      category:   item.category,
      date:       item.date,
      location:   item.location || '',
      desc:       item.desc    || '',
      src:        item.src     || '',   // ← just a URL
      color:      categoryColors[item.category] || 'from-primary-500 to-indigo-600',
      uploadedAt: serverTimestamp(),
    }
    const ref = await addDoc(collection(db, COLLECTION), payload)
    return { id: ref.id, ...payload }
  }

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id))
  }

  const updateItem = async (id, updates) => {
    if (updates.category) {
      updates.color = categoryColors[updates.category] || 'from-primary-500 to-indigo-600'
    }
    await updateDoc(doc(db, COLLECTION, id), updates)
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
