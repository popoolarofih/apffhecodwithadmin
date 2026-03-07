import Layout from '../components/Layout'
import Link from 'next/link'
import {
  Heart, Users, Target, Award, ArrowRight, CheckCircle,
  BookOpen, Shield, Lightbulb, TreePine, ChevronRight
} from 'lucide-react'

const stats = [
  { number: '65+', label: 'Happy Families', icon: Heart },
  { number: '85', label: 'Projects Completed', icon: Target },
  { number: '12', label: 'Years of Experience', icon: Award },
  { number: '15', label: 'Awards Received', icon: Award },
]

const services = [
  {
    icon: BookOpen,
    title: 'Sensitization',
    desc: 'Educational workshops and classes for families and communities on health and wellbeing.',
    color: 'from-violet-500 to-indigo-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Users,
    title: 'Mobilization',
    desc: 'Building strong support groups and community-led networks across Edo State.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Counseling',
    desc: 'Professional counseling services to help families cope with life\'s challenges.',
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Lightbulb,
    title: 'Intervention',
    desc: 'Direct action and targeted programs to improve family lives and community health.',
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

const testimonials = [
  {
    name: 'Obafemi Taiwo',
    role: 'Teacher',
    quote: 'APFFHECOD helped me get the treatment I needed when I was struggling with addiction. They were there for me when I needed them most.',
    initials: 'OT',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    name: 'Fashina Brandon',
    role: 'Freelancer',
    quote: 'They helped me connect with others going through the same experience after my divorce, providing the support I needed to rebuild my life.',
    initials: 'FB',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Adeshina Taiwo',
    role: 'Civil Servant',
    quote: 'I am so grateful for the work that APFFHECOD does. They have helped me and my family so much. I am thankful for their dedication.',
    initials: 'AT',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Babatunde Peter',
    role: 'Painter',
    quote: 'When my child was diagnosed with a chronic illness, APFFHECOD was there every step of the way with resources and support.',
    initials: 'BP',
    color: 'from-purple-500 to-violet-600',
  },
]

export default function Home() {
  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-primary-50/40 to-indigo-50">
        {/* Background decorations */}
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-100 to-indigo-100 rounded-full opacity-40 blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full opacity-30 blur-3xl translate-y-1/3 -translate-x-1/3" />

        {/* Floating accent shapes */}
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-primary-400 to-indigo-500 rounded-2xl opacity-20 rotate-12 animate-float" />
        <div className="absolute bottom-40 right-40 w-8 h-8 bg-gradient-to-br from-violet-400 to-primary-500 rounded-full opacity-30 animate-float delay-300" />
        <div className="absolute top-1/2 right-10 w-6 h-6 bg-primary-300 rounded-full opacity-25 animate-float delay-200" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-100 border border-primary-200 text-primary-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                Auchi, Edo State, Nigeria
              </div>

              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Empowering
                <span className="block gradient-text">Families &</span>
                <span className="block">Communities</span>
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                APFFHECOD is a non-profit organization dedicated to promoting healthy families and sustainable community development through education, support, and direct intervention.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl shadow-primary-200 hover:shadow-2xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Discover Our Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 border-2 border-primary-200 px-8 py-4 rounded-2xl font-semibold text-base hover:border-primary-400 hover:bg-primary-50 transition-all duration-200"
                >
                  Get Involved
                </Link>
              </div>

              <div className="flex flex-wrap gap-5 pt-2">
                {['Non-Partisan', 'Non-Religious', 'CAC Registered'].map(tag => (
                  <div key={tag} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual Card Stack */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-primary-100 border border-primary-100 ml-10">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl opacity-10" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-900">Our Impact</p>
                    <p className="text-xs text-slate-500">Since 2011</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map(stat => (
                    <div key={stat.label} className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl p-5 border border-primary-100">
                      <p className="font-display text-3xl font-bold text-primary-700">{stat.number}</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl text-white">
                  <p className="text-sm font-semibold mb-1">Our Mission</p>
                  <p className="text-xs text-primary-200 leading-relaxed">
                    "Engaging and educating all for a healthy lifestyle to ensure a prolonged life span and sustainable community development."
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-primary-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Community Dev.</p>
                  <p className="text-xs text-slate-500">Active Programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-700 py-14 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white lg:px-10">
                <p className="font-display text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-primary-200 text-sm font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">About APFFHECOD</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                A Holistic Approach to <span className="gradient-text">Family Health</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded in 2011 by a group of concerned citizens, APFFHECOD was created to address the need for a more holistic approach to family health. We believe that families are the foundation of strong communities.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Based in Auchi, Etsako West Local Government Area of Edo State, we engage in community sensitization — identifying problems and taking action to provide real solutions.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  'Health education and promotion across communities',
                  'Family support services and counseling',
                  'Environmental protection initiatives',
                  'Community development and empowerment',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm border-b-2 border-primary-300 hover:border-primary-600 pb-1 transition-colors"
              >
                Read Our Full Story <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-100 to-indigo-200 rounded-3xl h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                      <p className="text-primary-700 font-bold text-sm">Community</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-100 to-purple-200 rounded-3xl h-32 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-violet-500" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gradient-to-br from-indigo-100 to-blue-200 rounded-3xl h-32 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-indigo-500" />
                  </div>
                  <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl h-48 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Award className="w-12 h-12 mx-auto mb-2 text-primary-200" />
                      <p className="font-bold text-sm">15 Awards</p>
                      <p className="text-xs text-primary-200">Locally & Internationally</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl border border-primary-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-slate-700">Active Since 2011</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">What We Do</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Core <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Four pillars that support our mission to create healthier families and stronger communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 card-glow hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                <div className={`mt-6 h-1 w-12 bg-gradient-to-r ${service.color} rounded-full group-hover:w-20 transition-all duration-300`} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 bg-white text-primary-700 border-2 border-primary-200 px-8 py-4 rounded-2xl font-semibold hover:border-primary-400 hover:bg-primary-50 transition-all"
            >
              View All Activities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Testimonials</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Voices of <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">Real stories from the families and individuals we've had the privilege of supporting.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-b from-primary-50 to-white rounded-3xl p-6 border border-primary-100 card-glow hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl text-primary-200 font-serif mb-3">"</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-primary-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-gradient-to-br from-primary-700 via-primary-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center text-white">
          <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-6">Get Involved</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Ready to Make a <br />Real Difference?
          </h2>
          <p className="text-primary-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community of volunteers, donors, and advocates working together to empower families and build healthier communities across Edo State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
              Volunteer With Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
