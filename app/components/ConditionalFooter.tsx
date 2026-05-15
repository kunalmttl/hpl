'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Only show footer on home and contact pages
  const showFooter = pathname === '/' || pathname === '/contact';
  
  return showFooter ? <Footer /> : null;
}