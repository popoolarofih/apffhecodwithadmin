// ─────────────────────────────────────────────────────────────────────────────
//  Firebase Admin SDK — server-side only (API routes / SSR)
//  Uses a service account JSON stored as an env variable.
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore }                  from 'firebase-admin/firestore'
import { getStorage }                    from 'firebase-admin/storage'

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!raw) {
    throw new Error(
      'Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable.'
    )
  }
  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.')
  }
}

// Prevent duplicate initialisation during Next.js hot-reload
if (!getApps().length) {
  initializeApp({
    credential: cert(getServiceAccount()),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

export const adminDb      = getFirestore()
export const adminStorage = getStorage()
