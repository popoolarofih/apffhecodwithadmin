import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { useGallery } from '../../context/GalleryContext'
import { useEffect } from 'react'
import {
  HeartHandshake, LayoutDashboard, Grid, Upload,
  LogOut, ExternalLink, Menu, X, Bell
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Gallery', href: '/admin/gallery', icon: Grid },
  { label: 'Upload Media', href: '/admin/upload', icon: Upload },
]

export default function AdminLayout({ children, title }) {
  const { isLoggedIn, logout, checked } = useAuth()
  const { items } = useGallery()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (checked && !isLoggedIn) router.replace('/admin')
  }, [isLoggedIn, checked])

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  if (!checked || !isLoggedIn) return null

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-primary-950 via-primary-900 to-indigo-950 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
            <HeartHandshake className="w-5 h-5 text-primary-300" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm">APFFHECOD</p>
            <p className="text-primary-400 text-[10px] tracking-wider uppercase">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="text-primary-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-4">Menu</p>
          {navItems.map(item => {
            const active = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-primary-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-primary-400'}`} />
                {item.label}
                {item.label === 'Gallery' && (
                  <span className="ml-auto bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-primary-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-4">Site</p>
            <a
              href="/activities"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-primary-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <ExternalLink className="w-4 h-4 text-primary-400" />
              View Public Gallery
            </a>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div>
              <p className="text-white text-sm font-medium">Administrator</p>
              <p className="text-primary-400 text-xs">admin@apffhecod.org</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-5 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-bold text-slate-900 text-lg">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-primary-50 border border-primary-200 px-4 py-2 rounded-xl">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-primary-700 text-xs font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
