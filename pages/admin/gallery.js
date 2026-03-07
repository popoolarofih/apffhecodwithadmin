import AdminLayout from '../../components/admin/AdminLayout'
import { useState } from 'react'
import { useGallery } from '../../context/GalleryContext'
import Link from 'next/link'
import {
  Search, Filter, Trash2, Edit2, Image, Film, X,
  ChevronDown, AlertTriangle, CheckCircle, Upload, Eye, Calendar, MapPin
} from 'lucide-react'

const CATEGORIES = ['All', 'Workshop', 'Community Outreach', 'Family Health', 'Intervention']
const TYPES = ['All', 'image', 'video']

export default function AdminGallery() {
  const { items, deleteItem, updateItem } = useGallery()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [editItem, setEditItem] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [viewItem, setViewItem] = useState(null)
  const [toast, setToast] = useState(null)
  const [editForm, setEditForm] = useState({})

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || item.category === catFilter
    const matchType = typeFilter === 'All' || item.type === typeFilter
    return matchSearch && matchCat && matchType
  })

  const handleDelete = (id) => {
    deleteItem(id)
    setDeleteConfirm(null)
    showToast('Item deleted from gallery.')
  }

  const openEdit = (item) => {
    setEditItem(item)
    setEditForm({
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location || '',
      desc: item.desc || '',
    })
  }

  const handleEditSave = () => {
    updateItem(editItem.id, editForm)
    setEditItem(null)
    showToast('Item updated successfully.')
  }

  const colorFor = (cat) => {
    const map = {
      'Workshop': 'from-violet-500 to-indigo-600',
      'Community Outreach': 'from-emerald-500 to-teal-600',
      'Family Health': 'from-rose-500 to-pink-600',
      'Intervention': 'from-primary-500 to-indigo-600',
    }
    return map[cat] || 'from-slate-400 to-slate-600'
  }

  return (
    <AdminLayout title="Gallery Manager">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          <CheckCircle className="w-4 h-4" />
          {toast.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer"
            >
              {TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500">{filtered.length} of {items.length} items</p>
          <Link
            href="/admin/upload"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-primary-200 hover:-translate-y-0.5 transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Link>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-slate-300" />
          </div>
          <p className="font-display font-bold text-slate-600 text-lg mb-2">No media found</p>
          <p className="text-slate-400 text-sm mb-6">Try adjusting your filters or upload new media.</p>
          <Link href="/admin/upload" className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
            <Upload className="w-4 h-4" />
            Upload Media
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-lg hover:border-primary-200 transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                {item.src && item.type === 'image' ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : item.src && item.type === 'video' ? (
                  <video src={item.src} className="w-full h-full object-cover" muted />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${item.color || colorFor(item.category)} flex items-center justify-center`}>
                    {item.type === 'video'
                      ? <Film className="w-10 h-10 text-white/70" />
                      : <Image className="w-10 h-10 text-white/70" />}
                  </div>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setViewItem(item)}
                    className="w-9 h-9 bg-white/90 text-slate-800 rounded-xl flex items-center justify-center hover:bg-white transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="w-9 h-9 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item)}
                    className="w-9 h-9 bg-red-500 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Type badge */}
                <div className="absolute top-2 left-2">
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${item.type === 'video' ? 'bg-blue-600 text-white' : 'bg-primary-600 text-white'}`}>
                    {item.type === 'video' ? <Film className="w-2.5 h-2.5" /> : <Image className="w-2.5 h-2.5" />}
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color || colorFor(item.category)} text-white`}>
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-slate-900 text-sm mt-2 mb-1 truncate">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                  {item.location && <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" />{item.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PREVIEW MODAL ── */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              {viewItem.src && viewItem.type === 'image' ? (
                <img src={viewItem.src} alt={viewItem.title} className="w-full max-h-80 object-cover" />
              ) : viewItem.src && viewItem.type === 'video' ? (
                <video src={viewItem.src} controls className="w-full max-h-80" />
              ) : (
                <div className={`w-full h-48 bg-gradient-to-br ${viewItem.color} flex items-center justify-center`}>
                  {viewItem.type === 'video' ? <Film className="w-16 h-16 text-white/50" /> : <Image className="w-16 h-16 text-white/50" />}
                </div>
              )}
              <button onClick={() => setViewItem(null)} className="absolute top-3 right-3 w-9 h-9 bg-black/50 text-white rounded-xl flex items-center justify-center hover:bg-black/70">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${viewItem.color} text-white`}>{viewItem.category}</span>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-3 mb-2">{viewItem.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{viewItem.desc}</p>
              <div className="flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{viewItem.date}</span>
                {viewItem.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{viewItem.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEditItem(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900">Edit Media Details</h3>
              <button onClick={() => setEditItem(null)} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                  <input
                    type="text"
                    value={editForm.date}
                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={editForm.desc}
                  onChange={e => setEditForm({ ...editForm, desc: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditSave}
                className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-700 text-white py-3 rounded-xl font-bold text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Delete Media?</h3>
            <p className="text-slate-500 text-sm mb-6">
              "<strong>{deleteConfirm.title}</strong>" will be permanently removed from the gallery.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
