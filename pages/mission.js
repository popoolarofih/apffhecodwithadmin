import Layout from '../components/Layout'
import Link from 'next/link'
import { Target, Eye, Heart, TreePine, Zap, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react'

const missionAreas = [
  {
    icon: Heart,
    title: 'Health & Reproductive Health',
    desc: 'Promoting access to quality healthcare and reproductive health education for all community members.',
    points: ['Sexual health education', 'Maternal care programs', 'Family planning support', 'Health screenings'],
    color: 'from-rose-400 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    icon: TreePine,
    title: 'Environmental Protection',
    desc: 'Engaging communities in sustainable practices that protect the environment for future generations.',
    points: ['Environmental sensitization', 'Waste management programs', 'Tree planting initiatives', 'Clean water access'],
    color: 'from-green-400 to-emerald-600',
    bg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    icon: Zap,
    title: 'Empowerment',
    desc: 'Equipping individuals and families with knowledge, skills, and resources to improve their livelihoods.',
    points: ['Vocational training', 'Youth leadership programs', 'Women empowerment', 'Financial literacy'],
    color: 'from-amber-400 to-orange-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    icon: Users,
    title: 'Community Development',
    desc: 'Building strong, resilient communities by providing resources and support to local organizations.',
    points: ['Community infrastructure', 'Capacity building', 'Local organization support', 'Civic engagement'],
    color: 'from-primary-500 to-indigo-600',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-500',
  },
]

const strategies = [
  { label: 'GESI Integration', desc: 'Gender Equity & Social Inclusion in all programs' },
  { label: 'Evidence-Based', desc: 'Data-driven approaches to community health' },
  { label: 'Local Ownership', desc: 'Community-led, locally-rooted programs' },
  { label: 'Partnership', desc: 'Collaborative alliances with key stakeholders' },
  { label: 'Youth-Centered', desc: 'Positive youth development as a cornerstone' },
  { label: 'Sustainability', desc: 'Long-term systemic change over short-term fixes' },
]

export default function Mission() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-700/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-5">Our Purpose</p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Mission &amp; <span className="text-primary-300">Vision</span>
          </h1>
          <p className="text-primary-200 text-xl max-w-3xl mx-auto leading-relaxed">
            A clear purpose drives every initiative we undertake. Our mission and vision form the foundation of everything APFFHECOD stands for.
          </p>
        </div>
      </section>

      {/* Mission + Vision cards */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 -mt-16 relative z-10">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 text-white shadow-2xl shadow-primary-200">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <Target className="w-8 h-8 text-white" />
              </div>
              <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-4">Our Mission</p>
              <h2 className="font-display text-3xl font-bold mb-6 leading-tight">Engaging & Educating All for a Healthy Lifestyle</h2>
              <p className="text-primary-200 leading-relaxed text-lg">
                APFFHECOD's mission is engaging and educating all for a healthy lifestyle to ensure a prolonged life span and sustainable community development.
              </p>
              <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 gap-4">
                {['Health & Reproductive Health', 'Environmental Protection', 'Empowerment', 'Community Development'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-300 flex-shrink-0" />
                    <span className="text-primary-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-10 shadow-xl shadow-slate-100 border border-primary-100">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-8 border border-primary-100">
                <Eye className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Our Vision</p>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 leading-tight">Healthy Lifestyle for All</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                A society where every family, regardless of background, has access to the health knowledge, resources, and support they need to thrive — and where communities are resilient, informed, and empowered to sustain their own development.
              </p>
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <p className="text-primary-700 font-display font-bold text-lg italic">
                  "Happy Family — Happy Society"
                </p>
                <p className="text-primary-500 text-sm mt-2">— APFFHECOD Motto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Areas */}
      <section className="py-24 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Focus Areas</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Four Pillars of <span className="gradient-text">Our Mission</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Our mission operates through four interconnected areas that reinforce and sustain each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {missionAreas.map((area, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm card-glow group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-14 h-14 ${area.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <area.icon className={`w-7 h-7 ${area.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{area.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{area.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {area.points.map(point => (
                    <div key={point} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${area.color} flex-shrink-0`} />
                      <span className="text-slate-600 text-xs">{point}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${area.color} rounded-full group-hover:w-full transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Our Approach</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Strategic <span className="gradient-text">Framework</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategies.map((s, i) => (
              <div key={i} className="flex gap-4 p-6 bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl border border-primary-100 group hover:border-primary-300 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-display font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1">{s.label}</h4>
                  <p className="text-slate-500 text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-5 text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-6">Be Part of the Mission</h2>
          <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
            Your participation — as a volunteer, donor, or advocate — helps us fulfill our mission one family at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/activities" className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold hover:-translate-y-0.5 transition-all">
              See Our Activities <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
