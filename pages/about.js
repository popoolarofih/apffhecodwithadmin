import Layout from '../components/Layout'
import Link from 'next/link'
import { CheckCircle, Users, Heart, Shield, Award, ArrowRight, TreePine, BookOpen } from 'lucide-react'

const pillars = [
  {
    icon: BookOpen,
    title: 'Programs',
    desc: 'Support the design and implementation of inclusive projects and program development for families and communities.',
    color: 'from-violet-500 to-indigo-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Shield,
    title: 'Internal Practice & Policy',
    desc: 'Developing and implementing policies that promote diversity and inclusion among all staff, volunteers and beneficiaries.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Award,
    title: 'Professional Development',
    desc: 'Supporting development of trainings and learning opportunities to increase cultural competency and impact.',
    color: 'from-indigo-500 to-primary-600',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Users,
    title: 'Organizational Culture',
    desc: 'Giving all stakeholders a platform to share diverse experiences through celebrations and inclusive activities.',
    color: 'from-primary-500 to-violet-600',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: Heart,
    title: 'Communications',
    desc: 'Overseeing the diversity and inclusion aspects of all internal and external communication efforts.',
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

const values = [
  { title: 'Positive Youth Development', desc: 'Engaging youth as partners with their families and communities to be empowered to reach their full potential.' },
  { title: 'Evidence-Based Learning', desc: 'Using evidence and knowledge to inform programs and achieve results that improve the lives of all youth.' },
  { title: 'Social Inclusion', desc: 'Addressing the specific needs of distinct populations including young women and men, ethnic minorities, and disabled youth.' },
  { title: 'Local Ownership', desc: 'Programs grounded in local context, led by local partners and supported by locally-led staff.' },
  { title: 'Partnership', desc: 'Serving as a connector and convener, forging alliances with corporations, employers, local organizations and governments.' },
  { title: 'Ecosystems Thinking', desc: 'Creating systemic change by enabling youth to influence the systems that affect them the most.' },
]

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-5">About Us</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Who We <span className="text-primary-300">Are</span>
            </h1>
            <p className="text-primary-200 text-xl leading-relaxed mb-8">
              The Association of Professional for Family Health Empowerment and Community Development — a non-profit, non-partisan, non-religious, and non-tribal organization.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Founded 2011', 'CAC Registered', 'Auchi, Edo State', 'Non-Profit'].map(tag => (
                <span key={tag} className="bg-white/10 border border-white/20 text-primary-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Our Story</p>
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">
                Founded by Concerned <span className="gradient-text">Citizens</span>
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  APFFHECOD was founded in 2011 by a group of concerned citizens who saw a need for a more holistic approach to family health. We believe that families are the foundation of strong communities, and that by empowering families to make healthy choices, we can create a healthier and more vibrant society.
                </p>
                <p>
                  APFFHECOD engages in community sensitization aimed at identifying problems and taking action to provide solutions. We work across health education, family support, and community development to build a better future for all.
                </p>
                <p>
                  Based in Auchi, Etsako West Local Government Area of Edo State, our work has touched hundreds of families and built lasting community infrastructure.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '65+', label: 'Happy Families', icon: Heart, color: 'from-violet-500 to-indigo-600' },
                { num: '85', label: 'Projects Completed', icon: TreePine, color: 'from-blue-500 to-indigo-600' },
                { num: '12+', label: 'Years Experience', icon: Award, color: 'from-indigo-500 to-primary-600' },
                { num: '15', label: 'Awards Won', icon: Award, color: 'from-primary-500 to-violet-600' },
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-3xl p-7 text-white`}>
                  <stat.icon className="w-8 h-8 text-white/70 mb-4" />
                  <p className="font-display text-4xl font-bold">{stat.num}</p>
                  <p className="text-white/80 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D&I Five Pillars */}
      <section className="py-24 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Diversity & Inclusion</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Five <span className="gradient-text">Pillars</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              APFFHECOD has established a D&I Committee to promote gender equity and social inclusion across all internal and external work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm card-glow hover:-translate-y-1 transition-all duration-300 group ${i === 4 ? 'lg:col-start-2' : ''}`}>
                <div className={`w-13 h-13 ${p.bg} rounded-2xl flex items-center justify-center mb-6 w-14 h-14 group-hover:scale-110 transition-transform`}>
                  <p.icon className={`w-7 h-7 ${p.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                <div className={`mt-6 h-1 w-12 bg-gradient-to-r ${p.color} rounded-full group-hover:w-full transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Our Principles</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Grounding <span className="gradient-text">Principles</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="flex gap-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-2">{v.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-5 text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
            Whether you volunteer, donate, or advocate, your contribution helps us build healthier families and communities.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-0.5 transition-all">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  )
}
