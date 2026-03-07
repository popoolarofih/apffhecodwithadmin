import Layout from '../components/Layout'
import Link from 'next/link'
import { useState } from 'react'
import { useGallery } from '../context/GalleryContext'
import { BookOpen, Users, Shield, Lightbulb, ArrowRight, Calendar, MapPin, Image, Film } from 'lucide-react'

const categories = ['All', 'Workshop', 'Community Outreach', 'Family Health', 'Intervention']

const programs = [
  {
    icon: BookOpen,
    title: 'Sensitization',
    desc: 'Educational workshops and classes for families and communities on health education, nutrition, physical activity, mental health, and substance abuse.',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100',
  },
  {
    icon: Users,
    title: 'Mobilization',
    desc: 'Building and supporting community groups and networks that connect families with shared experiences and needs.',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: Shield,
    title: 'Counseling',
    desc: 'Providing emotional, psychological, and practical counseling to families facing challenges such as poverty, violence, and chronic illness.',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    border: 'border-indigo-100',
  },
  {
    icon: Lightbulb,
    title: 'Intervention',
    desc: 'Direct action and targeted programs to address urgent community health needs and improve long-term outcomes.',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    border: 'border-primary-100',
  },
]

export default function Activities() {
  const { items } = useGallery()
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? items : items.filter(a => a.category === active)

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-5">What We Do</p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Our <span className="text-primary-300">Activities</span>
          </h1>
          <p className="text-primary-200 text-xl max-w-3xl mx-auto leading-relaxed">
            Browse through {items.length}+ projects and community programs we've carried out over 12+ years of impactful work across Edo State.
          </p>
        </div>
      </section>

      {/* Core Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Core Programs</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">
              Four Ways We <span className="gradient-text">Make Impact</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, i) => (
              <div key={i} className={`${prog.bg} rounded-3xl p-7 border ${prog.border} group hover:-translate-y-1 transition-all duration-300`}>
                <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                  <prog.icon className={`w-6 h-6 ${prog.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-3">{prog.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-2">Recent Work</p>
              <h2 className="font-display text-4xl font-bold text-slate-900">Activity Gallery</h2>
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active === cat
                      ? 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-md shadow-primary-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((activity, i) => (
              <div key={activity.id || i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-glow group hover:-translate-y-1 transition-all duration-300">
                {/* Thumbnail or color band */}
                {activity.src && activity.type === 'image' ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.src}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-gradient-to-r ${activity.color} text-white`}>
                        <Image className="w-2.5 h-2.5" />
                        image
                      </span>
                    </div>
                  </div>
                ) : activity.src && activity.type === 'video' ? (
                  <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center">
                    <video src={activity.src} className="w-full h-full object-cover opacity-60" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Film className="w-7 h-7 text-primary-600" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-blue-600 text-white">
                        <Film className="w-2.5 h-2.5" />
                        video
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`h-3 bg-gradient-to-r ${activity.color}`} />
                )}

                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${activity.color} text-white`}>
                      {activity.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{activity.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{activity.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {activity.date}
                    </div>
                    {activity.location && (
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {activity.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="font-display text-xl">No activities in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Involvement */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Get Involved</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Ways to <span className="gradient-text">Participate</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Volunteer', desc: 'Share your time and skills at our workshops, outreach events, and training programs.', cta: 'Apply to Volunteer' },
              { title: 'Donate', desc: 'Your financial support enables us to reach more families and communities across Edo State.', cta: 'Support Us', featured: true },
              { title: 'Advocate', desc: 'Help spread the word about family health and community development in your networks.', cta: 'Become an Advocate' },
            ].map((item, i) => (
              <div key={i} className={`rounded-3xl p-8 text-center ${item.featured ? 'bg-gradient-to-br from-primary-600 to-indigo-700 text-white shadow-2xl shadow-primary-200' : 'bg-primary-50 border border-primary-100'}`}>
                <h3 className={`font-display text-2xl font-bold mb-4 ${item.featured ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-8 ${item.featured ? 'text-primary-200' : 'text-slate-600'}`}>{item.desc}</p>
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    item.featured ? 'bg-white text-primary-700 shadow-md' : 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  }`}
                >
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
