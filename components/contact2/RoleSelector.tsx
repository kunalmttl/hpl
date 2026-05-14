"use client";

import { motion } from "framer-motion";

interface RoleSelectorProps {
  onRoleSelect: (role: "manufacturer" | "distributor") => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          Who are you?
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          We tailor your enquiry so our team can respond with exactly the right information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manufacturer Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleSelect("manufacturer")}
          className="group cursor-pointer rounded-xl border-2 p-8 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#0e7c6e]/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-2">Pharma Manufacturer</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            Looking for a C&F agent, super stockist, or consignee in MP
          </p>
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#0e7c6e]/50 pointer-events-none" />
        </motion.div>

        {/* Distributor Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleSelect("distributor")}
          className="group cursor-pointer rounded-xl border-2 p-8 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#0e7c6e]/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#0e7c6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-2">Distributor / Stockist</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            Looking to source verified pharmaceutical stock through HPL
          </p>
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#0e7c6e]/50 pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  );
}