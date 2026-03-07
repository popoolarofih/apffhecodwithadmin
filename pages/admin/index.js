import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { HeartHandshake, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const { login, isLoggedIn, checked } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (checked && isLoggedIn) router.replace('/admin/dashboard')
  }, [isLoggedIn, checked])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // simulate network
    const ok = login(form.username, form.password)
    if (ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
      setLoading(false)
    }
  }

  if (!checked) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-800/20 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-white/5 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-32 right-24 w-10 h-10 bg-primary-400/20 rounded-full animate-float delay-300" />
      <div className="absolute top-1/2 right-16 w-6 h-6 bg-indigo-400/20 rounded-full animate-float delay-200" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-2 bg-gradient-to-r from-primary-500 via-indigo-500 to-violet-600" />

          <div className="p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-200">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Admin Portal</h1>
              <p className="text-slate-500 text-sm mt-1">APFFHECOD Dashboard</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    placeholder="Enter username"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign In to Dashboard'}
              </button>
            </form>

          </div>
        </div>

        <p className="text-center text-primary-400 text-xs mt-6">
          © {new Date().getFullYear()} APFFHECOD · Restricted Access
        </p>
      </div>
    </div>
  )
}
