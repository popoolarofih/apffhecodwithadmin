import AdminLayout from '../../components/admin/AdminLayout'
import { useState } from 'react'
import { useGallery } from '../../context/GalleryContext'
import { useRouter } from 'next/router'
import {
  Plus, Trash2, CheckCircle, AlertCircle, Upload,
  Image, Film, Link2, ArrowRight, Info, ExternalLink,
} from 'lucide-react'

const CATEGORIES = ['Workshop', 'Community Outreach', 'Family Health', 'Intervention']

// Detect media type from URL extension / patterns
function detectType(url) {
  const u = url.toLowerCase().split('?')[0]
  if (/\.(mp4|mov|webm|avi|mkv|m4v)$/.test(u)) return 'video'
  return 'image' // default to image
}


function isValidUrl(str) {
  try { new URL(str); return true } catch (_) { return false }
}

const emptyEntry = () => ({ id: Date.now() + Math.random(), url: '', type: 'image', title: '' })

export default function AdminUpload() {
  const { addItem } = useGallery()
  const router = useRouter()

  const [entries,   setEntries]   = useState([emptyEntry()])
  const [form,      setForm]      = useState({ category: 'Workshop', date: '', location: '', desc: '' })
  const [saving,    setSaving]    = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [errors,    setErrors]    = useState([])

  // ── Entry helpers ──────────────────────────────────────────
  const addEntry = () => setEntries(prev => [...prev, emptyEntry()])

  const removeEntry = (id) => setEntries(prev => prev.filter(e => e.id !== id))

  const updateEntry = (id, field, value) => {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e
      const updated = { ...e, [field]: value }
      // Auto-detect type when URL changes
      if (field === 'url' && value) updated.type = detectType(value)
      return updated
    }))
  }

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = []

    const validEntries = entries.filter(e => e.url.trim())
    if (validEntries.length === 0) errs.push('Add at least one media URL.')
    validEntries.forEach((e, i) => {
      if (!isValidUrl(e.url.trim())) errs.push(`Entry ${i + 1}: "${e.url}" is not a valid URL.`)
      if (!e.title.trim()) errs.push(`Entry ${i + 1}: title is required.`)
    })
    if (!form.category) errs.push('Category is required.')
    if (!form.date.trim()) errs.push('Date is required.')

    if (errs.length) { setErrors(errs); return }

    setErrors([])
    setSaving(true)

    try {
      for (const entry of validEntries) {
        await addItem({
          type:     entry.type,
          title:    entry.title.trim(),
          category: form.category,
          date:     form.date.trim(),
          location: form.location.trim(),
          desc:     form.desc.trim(),
          src:      entry.url.trim(),
        })
      }
      setSuccess(true)
    } catch (err) {
      setErrors([`Firestore error: ${err.message}`])
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setEntries([emptyEntry()])
    setForm({ category: 'Workshop', date: '', location: '', desc: '' })
    setSuccess(false)
    setErrors([])
  }

  // ── Success screen ─────────────────────────────────────────
  if (success) {
    return (
      <AdminLayout title="Upload Media">
        <div className="max-w-lg mx-auto mt-16 text-center">
          <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-100">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Published!</h2>
          <p className="text-slate-500 mb-8">
            {entries.filter(e => e.url.trim()).length} item
            {entries.filter(e => e.url.trim()).length > 1 ? 's' : ''} saved to Firestore and live on the gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleReset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm">
              <Upload className="w-4 h-4" /> Add More
            </button>
            <button onClick={() => router.push('/admin/gallery')}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm hover:border-primary-300">
              View Gallery <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Upload Media">
      <div className="max-w-3xl mx-auto">



        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 space-y-1.5">
            {errors.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {e}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Media URL entries ──────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-slate-900">Media URLs</h3>
                <p className="text-slate-400 text-xs mt-0.5">Paste one Firebase Storage (or any public) URL per row</p>
              </div>
              <button
                type="button"
                onClick={addEntry}
                className="inline-flex items-center gap-1.5 text-primary-600 border border-primary-200 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            <div className="p-6 space-y-4">
              {entries.map((entry, idx) => (
                <div key={entry.id} className="group grid grid-cols-1 sm:grid-cols-[1fr_160px_36px] gap-3 items-start">

                  {/* URL + title stacked */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={entry.url}
                        onChange={e => updateEntry(entry.id, 'url', e.target.value)}
                        placeholder="https://firebasestorage.googleapis.com/…"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition placeholder:text-slate-300"
                      />
                    </div>
                    <input
                      type="text"
                      value={entry.title}
                      onChange={e => updateEntry(entry.id, 'title', e.target.value)}
                      placeholder={`Title for item ${idx + 1} *`}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition placeholder:text-slate-300"
                    />
                  </div>

                  {/* Type selector */}
                  <div className="flex gap-2">
                    {['image', 'video'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updateEntry(entry.id, 'type', t)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          entry.type === t
                            ? t === 'image'
                              ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-200'
                              : 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-primary-300'
                        }`}
                      >
                        {t === 'image'
                          ? <Image className="w-4 h-4" />
                          : <Film className="w-4 h-4" />}
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    disabled={entries.length === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Live URL preview thumbnail */}
                  {entry.url && isValidUrl(entry.url) && (
                    <div className="sm:col-span-3">
                      {entry.type === 'image' ? (
                        <img
                          src={entry.url}
                          alt="preview"
                          className="h-20 rounded-xl object-cover border border-slate-200 bg-slate-100"
                          onError={ev => ev.target.style.display = 'none'}
                        />
                      ) : (
                        <div className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                          <Film className="w-4 h-4" />
                          Video URL set
                          <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Shared metadata ────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
            <h3 className="font-display font-bold text-slate-900 text-lg mb-1">Activity Details</h3>
            <p className="text-slate-400 text-xs mb-6">Applied to all URLs above</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  placeholder="e.g. March 2024"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Auchi Community Hall"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={e => setForm({ ...form, desc: e.target.value })}
                  placeholder="Briefly describe this activity or event…"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── Submit row ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Saving to Firestore…
                </>
              ) : (
                <><Upload className="w-4 h-4" /> Publish to Gallery</>
              )}
            </button>
            {!saving && (
              <button type="button" onClick={handleReset}
                className="text-slate-500 text-sm font-medium hover:text-slate-700 px-4 py-2">
                Clear All
              </button>
            )}
            <p className="text-xs text-slate-400 sm:ml-auto">URLs + metadata saved to Firestore · visible instantly</p>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
