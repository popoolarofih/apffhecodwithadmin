import Link from 'next/link'
import { HeartHandshake, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-950 text-white">
      {/* Top wave */}
      <div className="h-12 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 0%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                <HeartHandshake className="w-5 h-5 text-primary-300" />
              </div>
              <span className="font-display font-bold text-lg">APFFHECOD</span>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-6">
              Association of Professional for Family Health Empowerment and Community Development. Registered with the Corporate Affairs Commission (CAC).
            </p>
            <p className="text-xs text-primary-400 font-semibold tracking-widest uppercase">Happy Family — Happy Society</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-primary-300 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Mission', href: '/mission' },
                { label: 'Activities', href: '/activities' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary-200 text-sm hover:text-white flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-primary-500 group-hover:text-primary-300 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-primary-300 mb-6">Our Programs</h4>
            <ul className="space-y-3">
              {[
                'Health Education',
                'Family Support',
                'Community Dev.',
                'Reproductive Health',
                'Environmental Protection',
                'Empowerment',
              ].map(item => (
                <li key={item} className="text-primary-200 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-primary-300 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-primary-200 text-sm">No 61B Egbeadokhai Street, Before Otaru Primary School, Auchi, Edo State, Nigeria</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-primary-200 text-sm space-y-1">
                  <p>0803 825 1957</p>
                  <p>0806 622 5584</p>
                  <p>0806 138 7108</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-primary-200 text-sm space-y-1">
                  <p>affhecod11@gmail.com</p>
                  <p>info@affhecod.org</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} APFFHECOD. All Rights Reserved. Founded 2011.
          </p>
          <p className="text-primary-500 text-xs">Non-profit · Non-partisan · Non-religious · Non-tribal</p>
        </div>
      </div>
    </footer>
  )
}
