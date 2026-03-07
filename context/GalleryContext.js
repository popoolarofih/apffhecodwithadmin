import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, deleteDoc,
  updateDoc, doc, serverTimestamp, query, orderBy,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../lib/firebase'

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

  // Upload file to Firebase Storage and get download URL
  const uploadFile = async (file) => {
    const storageRef = ref(storage, `gallery/${Date.now()}-${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress monitoring could be added here
        },
        (error) => {
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        }
      )
    })
  }

  // Detect file type from file extension
  const getFileType = (filename) => {
    const ext = filename.toLowerCase().split('.').pop()
    const videoExtensions = ['mp4', 'mov', 'webm', 'avi', 'mkv', 'm4v']
    return videoExtensions.includes(ext) ? 'video' : 'image'
  }

  // Add — supports both file upload and URL
  const addItem = async (item) => {
    let src = item.src || ''
    
    // If item.file exists, upload it to storage
    if (item.file) {
      src = await uploadFile(item.file)
    }

    // Determine type if not provided
    let type = item.type
    if (!type) {
      if (item.file) {
        type = getFileType(item.file.name)
      } else if (src) {
        const url = src.toLowerCase().split('?')[0]
        type = /\.(mp4|mov|webm|avi|mkv|m4v)$/.test(url) ? 'video' : 'image'
      } else {
        type = 'image' // default
      }
    }

    const payload = {
      type:       type,
      title:      item.title,
      category:   item.category,
      date:       item.date,
      location:   item.location || '',
      desc:       item.desc    || '',
      src:        src,
      color:      categoryColors[item.category] || 'from-primary-500 to-indigo-600',
      uploadedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, COLLECTION), payload)
    return { id: docRef.id, ...payload }
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
