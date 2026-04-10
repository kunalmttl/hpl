"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919300001411";
const MESSAGE = "Hello HPL, I'm interested in your logistics services.";
const ENCODED_MESSAGE = encodeURIComponent(MESSAGE);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${ENCODED_MESSAGE}`;

export default function WhatsAppButton() {

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow group"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40" />
      <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
      
      {/* Tooltip - Hidden on Mobile */}
      <span className="hidden md:block absolute right-20 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
        Chat with us on WhatsApp
      </span>
    </motion.a>

  );
}
