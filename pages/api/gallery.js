// ─────────────────────────────────────────────────────────────────────────────
//  /api/gallery  — server-side write operations (Admin SDK, full privileges)
//
//  POST   → add a new gallery item (JSON body or multipart file upload)
//  PATCH  → update an existing item  { id, ...fields }
//  DELETE → delete an item           { id }
//
//  Every request must include the header:
//    x-admin-secret: <ADMIN_API_SECRET>
// ─────────────────────────────────────────────────────────────────────────────

import { adminDb, adminStorage } from '../../lib/firebaseAdmin'
import { FieldValue }            from 'firebase-admin/firestore'
import formidable                from 'formidable'
import fs                        from 'fs'
import path                      from 'path'

export const config = {
  api: { bodyParser: false }, // needed for formidable file parsing
}

const COLLECTION = 'gallery'

const categoryColors = {
  'Workshop':           'from-violet-500 to-indigo-600',
  'Community Outreach': 'from-emerald-500 to-teal-600',
  'Family Health':      'from-rose-500 to-pink-600',
  'Intervention':       'from-primary-500 to-indigo-600',
}

// ── Auth check ────────────────────────────────────────────────────────────────
function isAuthorised(req) {
  const secret = process.env.ADMIN_API_SECRET
  if (!secret) {
    console.warn('ADMIN_API_SECRET is not set — rejecting all write requests.')
    return false
  }
  return req.headers['x-admin-secret'] === secret
}

// ── Parse multipart OR json body ──────────────────────────────────────────────
async function parseBody(req) {
  const contentType = req.headers['content-type'] || ''

  if (contentType.includes('multipart/form-data')) {
    return new Promise((resolve, reject) => {
      const form = formidable({ maxFileSize: 50 * 1024 * 1024 }) // 50 MB
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        // formidable v3 wraps values in arrays
        const flat = Object.fromEntries(
          Object.entries(fields).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
        )
        resolve({ fields: flat, files })
      })
    })
  }

  // JSON body
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      try { resolve({ fields: JSON.parse(data || '{}'), files: {} }) }
      catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

// ── Upload file buffer to Firebase Storage ────────────────────────────────────
async function uploadToStorage(file) {
  const bucket    = adminStorage.bucket()
  const filename  = `gallery/${Date.now()}-${path.basename(file.originalFilename || file.newFilename)}`
  const fileRef   = bucket.file(filename)

  const buffer = fs.readFileSync(file.filepath)
  await fileRef.save(buffer, {
    metadata: { contentType: file.mimetype || 'application/octet-stream' },
  })
  await fileRef.makePublic()

  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`
  return publicUrl
}

// ── Route handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (!isAuthorised(req)) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  try {
    if (req.method === 'POST') {
      return await handleAdd(req, res)
    } else if (req.method === 'PATCH') {
      return await handleUpdate(req, res)
    } else if (req.method === 'DELETE') {
      return await handleDelete(req, res)
    } else {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (err) {
    console.error('[/api/gallery] Error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}

// ── POST — add item ───────────────────────────────────────────────────────────
async function handleAdd(req, res) {
  const { fields, files } = await parseBody(req)

  let src  = fields.src  || ''
  let type = fields.type || 'image'

  // If a file was sent, upload it to Storage first
  const uploadedFile = files.file?.[0] || files.file
  if (uploadedFile) {
    src  = await uploadToStorage(uploadedFile)
    // Detect type from original filename
    const ext = path.extname(uploadedFile.originalFilename || '').toLowerCase()
    type = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v'].includes(ext) ? 'video' : 'image'
    // Clean up temp file
    fs.unlinkSync(uploadedFile.filepath)
  }

  if (!src) {
    return res.status(400).json({ error: 'src or file is required' })
  }

  const payload = {
    type,
    title:      fields.title    || '',
    category:   fields.category || '',
    date:       fields.date     || '',
    location:   fields.location || '',
    desc:       fields.desc     || '',
    src,
    color: categoryColors[fields.category] || 'from-primary-500 to-indigo-600',
    uploadedAt: FieldValue.serverTimestamp(),
  }

  const docRef = await adminDb.collection(COLLECTION).add(payload)
  return res.status(201).json({ id: docRef.id, ...payload, uploadedAt: new Date().toISOString() })
}

// ── PATCH — update item ───────────────────────────────────────────────────────
async function handleUpdate(req, res) {
  const { fields } = await parseBody(req)
  const { id, ...updates } = fields

  if (!id) return res.status(400).json({ error: 'id is required' })

  if (updates.category) {
    updates.color = categoryColors[updates.category] || 'from-primary-500 to-indigo-600'
  }

  await adminDb.collection(COLLECTION).doc(id).update(updates)
  return res.status(200).json({ id, ...updates })
}

// ── DELETE — remove item ──────────────────────────────────────────────────────
async function handleDelete(req, res) {
  const { fields } = await parseBody(req)
  const { id } = fields

  if (!id) return res.status(400).json({ error: 'id is required' })

  await adminDb.collection(COLLECTION).doc(id).delete()
  return res.status(200).json({ id })
}
