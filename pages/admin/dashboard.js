import AdminLayout from '../../components/admin/AdminLayout'
import Link from 'next/link'
import { useGallery } from '../../context/GalleryContext'
import {
  Images, Upload, Film, Image, TrendingUp,
  ArrowRight, Calendar, Clock, CheckCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const { items } = useGallery()

  const imageCount = items.filter(i => i.type === 'image').length
  const videoCount = items.filter(i => i.type === 'video').length
  const categories = [...new Set(items.map(i => i.category))]
  const recent = [...items].sort((a, b) => b.uploadedAt?.localeCompare(a.uploadedAt)).slice(0, 5)

  const stats = [
    {
      label: 'Total Media',
      value: items.length,
      icon: Images,
      color: 'from-primary-500 to-indigo-600',
      bg: 'bg-primary-50',
      iconColor: 'text-primary-600',
      sub: 'Items in gallery',
    },
    {
      label: 'Images',
      value: imageCount,
      icon: Image,
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      sub: 'Photo uploads',
    },
    {
      label: 'Videos',
      value: videoCount,
      icon: Film,
      color: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      sub: 'Video uploads',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      sub: 'Activity types',
    },
  ]

  const categoryBreakdown = ['Workshop', 'Community Outreach', 'Family Health', 'Intervention'].map(cat => ({
    name: cat,
    count: items.filter(i => i.category === cat).length,
    pct: items.length ? Math.round((items.filter(i => i.category === cat).length / items.length) * 100) : 0,
  }))

  const barColors = {
    'Workshop': 'bg-violet-500',
    'Community Outreach': 'bg-emerald-500',
    'Family Health': 'bg-rose-500',
    'Intervention': 'bg-primary-500',
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-2">Welcome back</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">APFFHECOD Media Manager</h2>
            <p className="text-primary-200 text-sm">Manage gallery content, upload new media, and keep the public site updated.</p>
          </div>
          <Link
            href="/admin/upload"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Media
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <p className="font-display text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="font-semibold text-slate-700 text-sm mt-1">{stat.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category breakdown */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-bold text-slate-900 mb-6">By Category</h3>
          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-slate-600 font-medium">{cat.name}</span>
                  <span className="text-xs font-bold text-slate-500">{cat.count} items</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`${barColors[cat.name] || 'bg-primary-500'} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100 text-center">
              <p className="font-display text-2xl font-bold text-primary-700">{imageCount}</p>
              <p className="text-xs text-slate-500 mt-1">Images</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
              <p className="font-display text-2xl font-bold text-blue-700">{videoCount}</p>
              <p className="text-xs text-slate-500 mt-1">Videos</p>
            </div>
          </div>
        </div>

        {/* Recent uploads */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-slate-900">Recent Uploads</h3>
            <Link href="/admin/gallery" className="text-primary-600 text-xs font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recent.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-8">No media uploaded yet.</p>
            )}
            {recent.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors group">
                {/* Thumbnail */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                  {item.src && item.type === 'image' ? (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  ) : item.src && item.type === 'video' ? (
                    <Film className="w-6 h-6 text-white" />
                  ) : item.type === 'video' ? (
                    <Film className="w-6 h-6 text-white" />
                  ) : (
                    <Image className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-primary-600 font-medium">{item.category}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-primary-100 text-primary-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-5 mt-6">
        {[
          { title: 'Upload New Media', desc: 'Add images or videos to the gallery', href: '/admin/upload', icon: Upload, color: 'from-primary-600 to-indigo-700', featured: true },
          { title: 'Manage Gallery', desc: 'Edit, delete, or reorder existing media', href: '/admin/gallery', icon: Images, color: '' },
          { title: 'View Public Site', desc: 'See how the gallery looks to visitors', href: '/activities', icon: CheckCircle, color: '', external: true },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            className={`p-6 rounded-2xl border flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-200 ${
              action.featured
                ? 'bg-gradient-to-br from-primary-600 to-indigo-700 border-transparent text-white shadow-lg shadow-primary-200'
                : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${action.featured ? 'bg-white/20' : 'bg-primary-50'}`}>
              <action.icon className={`w-6 h-6 ${action.featured ? 'text-white' : 'text-primary-600'}`} />
            </div>
            <div>
              <p className={`font-display font-bold text-sm ${action.featured ? 'text-white' : 'text-slate-900'}`}>{action.title}</p>
              <p className={`text-xs mt-0.5 ${action.featured ? 'text-primary-200' : 'text-slate-500'}`}>{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  )
}
