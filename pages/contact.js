import Layout from '../components/Layout'
import { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle, Users, Heart, Megaphone } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Office',
    lines: ['No 61B Egbeadokhai Street', 'Before Otaru Primary School', 'Auchi, Edo State, Nigeria'],
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100',
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    lines: ['0803 825 1957', '0806 622 5584', '0806 138 7108'],
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    title: 'Email Addresses',
    lines: ['affhecod11@gmail.com', 'info@affhecod.org'],
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    border: 'border-indigo-100',
  },
]

const ways = [
  { icon: Users, title: 'Volunteer', desc: 'Give your time and skills.' },
  { icon: Heart, title: 'Donate', desc: 'Support our programs financially.' },
  { icon: Megaphone, title: 'Advocate', desc: 'Spread our mission.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary-700/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-5">Reach Out</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Let's <span className="text-primary-300">Connect</span>
            </h1>
            <p className="text-primary-200 text-xl leading-relaxed">
              Whether you want to volunteer, donate, partner, or simply learn more — we'd love to hear from you. Every message matters.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 -mt-12 relative z-10">
            {contactInfo.map((info, i) => (
              <div key={i} className={`${info.bg} rounded-3xl p-8 border ${info.border} shadow-sm`}>
                <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm`}>
                  <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-4">{info.title}</h3>
                <div className="space-y-1">
                  {info.lines.map(line => (
                    <p key={line} className="text-slate-600 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main form section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-primary-100 shadow-lg shadow-primary-50">
                <div className="mb-8">
                  <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-3">Get In Touch</p>
                  <h2 className="font-display text-3xl font-bold text-slate-900">Send Us a Message</h2>
                </div>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Message Received!</h3>
                    <p className="text-slate-600 max-w-sm mx-auto">Thank you for reaching out to APFFHECOD. We'll get back to you within 2-3 business days.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-primary-600 font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                        <input
                          type="text" required
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="e.g. Taiwo Adeshina"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email" required
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="080 XXXX XXXX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Area of Interest</label>
                        <select
                          value={form.interest}
                          onChange={e => setForm({...form, interest: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                        >
                          <option value="">Select one</option>
                          <option>Volunteer</option>
                          <option>Donate</option>
                          <option>Partnership</option>
                          <option>Program Inquiry</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                      <input
                        type="text" required
                        value={form.subject}
                        onChange={e => setForm({...form, subject: e.target.value})}
                        placeholder="What's this about?"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                      <textarea
                        required rows={5}
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Tell us how we can help or how you'd like to get involved..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary-200 hover:shadow-2xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Get Involved */}
              <div className="bg-gradient-to-br from-primary-700 to-indigo-800 rounded-3xl p-8 text-white">
                <h3 className="font-display font-bold text-xl mb-2">Ways to Get Involved</h3>
                <p className="text-primary-200 text-sm mb-8">There are many ways to support our mission beyond just messaging us.</p>
                <div className="space-y-5">
                  {ways.map((way, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                        <way.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{way.title}</p>
                        <p className="text-primary-300 text-xs">{way.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-4">Support Our Cause</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  You can also reach us by phone for urgent inquiries or to arrange in-person visits to our Auchi office.
                </p>
                <div className="space-y-3">
                  <a href="tel:08038251957" className="flex items-center gap-3 bg-white border border-primary-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium hover:border-primary-400 transition-colors">
                    <Phone className="w-4 h-4 text-primary-500" />
                    0803 825 1957
                  </a>
                  <a href="tel:08066225584" className="flex items-center gap-3 bg-white border border-primary-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium hover:border-primary-400 transition-colors">
                    <Phone className="w-4 h-4 text-primary-500" />
                    0806 622 5584
                  </a>
                  <a href="mailto:info@affhecod.org" className="flex items-center gap-3 bg-white border border-primary-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium hover:border-primary-400 transition-colors">
                    <Mail className="w-4 h-4 text-primary-500" />
                    info@affhecod.org
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-slate-100 to-primary-50 rounded-3xl h-48 flex items-center justify-center border border-primary-100 relative overflow-hidden">
                <div className="absolute inset-0 dot-pattern opacity-30" />
                <div className="relative text-center">
                  <MapPin className="w-10 h-10 text-primary-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700 text-sm">Auchi, Etsako West</p>
                  <p className="text-slate-500 text-xs">Edo State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
