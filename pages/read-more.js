import Layout from '../components/Layout'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BarChart2, BookOpen, Users, Shield, Zap, Globe, ArrowRight } from 'lucide-react'

const gesiPillars = [
  { icon: BarChart2, title: 'Programs', desc: 'Mainstreaming gender equity and social inclusion into every project lifecycle — from design to evaluation and learning.' },
  { icon: Shield, title: 'Internal Practice & Policy', desc: 'Equitable hiring, procurement, and administrative processes that mirror our commitment to inclusion at every level.' },
  { icon: BookOpen, title: 'Professional Development', desc: 'Continuous learning, mentorship, and advanced training opportunities in cultural competency for all staff members.' },
  { icon: Users, title: 'Organizational Culture', desc: 'Creating a safe, inclusive, and respectful workplace by giving all stakeholders a platform to share diverse experiences.' },
  { icon: Globe, title: 'Communications', desc: 'Inclusive language and diverse representation in all internal and external media and communications.' },
]

const principles = [
  {
    title: 'Positive Youth Development',
    body: 'APFFHECOD engages all staff, volunteers and beneficiaries as partners along with their families, communities, and governments so youth are empowered to reach their full potential. Positive Youth Development approaches build skills, assets, and competencies, foster healthy inclusion, strengthen the environment around youth, and transform systems.',
  },
  {
    title: 'Evidence-Based Learning',
    body: 'APFFHECOD is committed to using evidence and knowledge to inform programs and achieve results that improve the lives of all youth. High-quality data captured through measurement, evaluation, research, and learning systems advance learning and promote effective solutions across the sector.',
  },
  {
    title: 'Social Inclusion',
    body: 'APFFHECOD is committed to addressing the specific needs of distinct populations, including young women and men, ethnic or racial minorities, youth that identify as vulnerable, and disabled youth, among others. Projects seek to benefit all youth equally.',
  },
  {
    title: 'Local Ownership',
    body: 'APFFHECOD programs are grounded in the local context, led by local partners and supported by locally-led staff in the communities where it works. This policy prioritizes the expertise of local partners and staff in appropriately contextualizing measures to ensure programs do no harm.',
  },
  {
    title: 'Partnership',
    body: 'Partnership is at the core of APFFHECOD\'s model. Serving as a connector and convener, APFFHECOD forges alliances with corporations, employers, local organizations, governments, communities, youth and other stakeholders to create the best solutions to specific challenges.',
  },
  {
    title: 'Ecosystems Thinking',
    body: 'Recognizing that changes require addressing knowledge, attitudes, and behaviors at individual and systemic levels, APFFHECOD creates systemic change, impacting youth at scale by enabling them to influence the systems that affect them most.',
  },
]

const facts = [
  { num: '2011', label: 'Year Founded' },
  { num: '65+', label: 'Happy Families' },
  { num: '85', label: 'Projects' },
  { num: '12+', label: 'Years Active' },
]

export default function ReadMore() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-300 text-sm font-medium mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <p className="text-primary-300 font-bold tracking-widest text-xs uppercase mb-5">In Depth</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Our Full <span className="text-primary-300">Story</span> & Policies
            </h1>
            <p className="text-primary-200 text-xl leading-relaxed">
              A comprehensive overview of APFFHECOD's approach to gender equity, social inclusion, and community-centered development since 2011.
            </p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-gradient-to-r from-primary-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/20 text-white">
            {facts.map((f, i) => (
              <div key={i} className="text-center lg:px-10">
                <p className="font-display text-4xl font-bold mb-1">{f.num}</p>
                <p className="text-primary-200 text-sm">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full history */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Our History</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">
              A Decade of <span className="gradient-text">Transformative Work</span>
            </h2>
            <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
              <p className="text-lg">
                Since its establishment, APFFHECOD has been focused on preparing young people to be productive and engaged economic actors and citizens. As we know from experience, varied forms of marginalization have a direct impact on their agency, voice, economic opportunity, and other life outcomes. Equipping all staff, volunteers, and beneficiaries to transform their lives necessarily involves addressing the barriers to inclusion that make it challenging for them to thrive.
              </p>
              <p>
                APFFHECOD considers all types of exclusion based on sex, gender identity and expression, sexual orientation, race, religion, ethnicity, income status, educational status, disability, family structure, living situation, marital status, geography, and many other factors at play in young people's contexts. We recognize the intersectionality that exists for many marginalized communities and the impact such social categorizations have on their livelihoods.
              </p>
              <p>
                APFFHECOD is committed to taking a systems approach to address the institutionalized oppression that promotes discrimination and disadvantage. Our Gender and Social Inclusion (GESI) policy reflects APFFHECOD's strong commitment to improving gender equality and social equity through its interventions. Moreover, it links to and reinforces APFFHECOD's existing policies on child protection, anti-harassment, and anti-discrimination.
              </p>
            </div>
          </div>

          {/* Definitions */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-4">Equal Access</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All staff, volunteers and beneficiaries of APFFHECOD, regardless of demographic backgrounds, have the same opportunities to benefit from an intervention. For example, a life skills program takes steps to ensure that young people with and without disabilities have equal access to training sessions.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-4">Equitable Outcomes</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To the maximum extent possible, all stakeholders have similar outcomes from an intervention. Programs carefully examine the particular needs of all beneficiaries and make appropriate accommodations to ensure that the intervention supports positive outcomes for all individuals in the program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GESI Pillars */}
      <section className="py-24 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">GESI Policy</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Diversity & Inclusion <span className="gradient-text">Committee</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              APFFHECOD has established a D&I Committee structured around five key areas of focus.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gesiPillars.map((p, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm card-glow group hover:-translate-y-1 transition-all ${i === 3 ? 'lg:col-start-1' : ''}`}>
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <p.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">Pillar {i + 1}</div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-4">Strategy</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">
              Grounding <span className="gradient-text">Principles</span>
            </h2>
          </div>
          <div className="space-y-5">
            {principles.map((p, i) => (
              <div key={i} className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl p-8 border border-primary-100 group hover:border-primary-300 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-900 mb-3">{p.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation & Measuring Progress */}
      <section className="py-24 bg-gradient-to-br from-primary-50/50 to-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-sm">
              <BarChart2 className="w-8 h-8 text-primary-600 mb-5" />
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">Data Collection & Monitoring</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Demographic factors important for inclusion are integrated into project-specific indicators. The minimum collection includes disaggregated data by age, sex/gender identity, race/ethnicity, disability status, and geography at the individual beneficiary level.
              </p>
              <ul className="space-y-2">
                {['Age-disaggregated data', 'Sex/gender identity tracking', 'Disability status recording', 'Geographic distribution', 'Quarterly performance reviews'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-sm">
              <BookOpen className="w-8 h-8 text-primary-600 mb-5" />
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">Training & Capacity Building</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                All staff are required to complete basic training on gender equity and social inclusion within their first 90 days of employment. Current employees also undergo ongoing professional development to stay current.
              </p>
              <ul className="space-y-2">
                {['GESI induction training', 'Role-specific modules', 'Inclusive design workshops', 'Intersectionality training', 'Partner capacity building'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-5 text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-5">Ready to Partner With Us?</h2>
          <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
            Learn how your organization can collaborate with APFFHECOD to build healthier, more inclusive communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-0.5 transition-all">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/activities" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Our Activities
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
