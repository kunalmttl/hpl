import React from "react";
import Link from "next/link";
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-pharma-teal to-cyan-400 bg-clip-text text-transparent">
                HPL
              </span>
              <span className="text-sm font-semibold text-white tracking-widest uppercase">
                Logistics
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Empowering the pharmaceutical supply chain in Indore with speed, safety, and precision. We are your reliable partner for C&F, Super Stockiest, and Third Party Logistics 
            </p>
            <div className="flex space-x-4">
              {[Globe, MessageSquare, Mail].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pharma-teal hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About HPL", "Services", "Resource Center", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-pharma-teal flex items-center group transition-colors">
                    {link} <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services#cnf" className="hover:text-pharma-teal transition-colors">C&F Agency</Link></li>
              <li><Link href="/services#stockist" className="hover:text-pharma-teal transition-colors">Super Stockiest</Link></li>
              <li><Link href="/services#distribution" className="hover:text-pharma-teal transition-colors">Distribution Hub</Link></li>
              <li><Link href="/services#3pl" className="hover:text-pharma-teal transition-colors">3PL Logistics</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-pharma-teal mt-1 shrink-0" />
                <span>Indore, Madhya Pradesh<br />Industrial Area, PH-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-pharma-teal shrink-0" />
                <Link href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">+91 XXXXX XXXXX</Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-pharma-teal shrink-0" />
                <Link href="mailto:info@hplindore.com" className="hover:text-white transition-colors">info@hplindore.com</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm order-2 md:order-1 text-slate-500">
            &copy; {currentYear} Hindustan Pharma Logistics. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm order-1 md:order-2 group">
            <span className="text-slate-400">A</span>
            <span className="font-bold tracking-widest text-slate-200 group-hover:text-pharma-teal transition-colors">DIVISION OF HDH</span>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-pharma-teal transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
