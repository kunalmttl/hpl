"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { TypewriterHeading } from "./TypewriterHeading";

export const TeamSection = () => {
  const { isIntroDone } = useNavbarLogoRef();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  const staggerContainer: Variants = {
    hidden: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: isIntroDone ? 0.2 : 999
      }
    }
  };

  const itemSlideUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const teamMembers = [
    {
      name: "Mukesh Modi",
      title: "Founder & Managing Director",
      bio: "With over 15 years connecting manufacturers to Central India's vast pharma network. Mukesh leads HPL's strategic roadmap, ensuring absolute compliance, robust supply chains, and unwavering trust at every node of distribution.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Tripti Modi",
      title: "Head of Operations",
      bio: "Tripti drives the operational heartbeat of HPL. She ensures completely seamless, error-free warehouse execution, day-to-day regulatory compliance, and accelerates billing workflows to get medicines where they're needed faster.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="pt-12 pb-24 flex flex-col items-center px-4 md:px-12 relative overflow-hidden bg-background snap-start"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isIntroDone && isInView ? "visible" : "hidden"}
        className="flex flex-col items-center text-center w-full"
      >
        <motion.p variants={itemSlideUp} className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 font-subtext">
          Our Team
        </motion.p>
        <motion.div variants={itemSlideUp}>
          <TypewriterHeading 
            text="The People Behind HPL" 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-14 tracking-tight" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={i}
              variants={itemSlideUp}
              className="group relative w-full aspect-[4/5] rounded-[32px] overflow-hidden cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-slate-200"
            >
              {/* High-fidelity Photo */}
              <img 
                src={member.image} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col items-start text-left z-10">
                <h4 className="text-white text-3xl font-bold mb-1 tracking-tight">{member.name}</h4>
                <p className="text-pharma-teal font-bold text-[13px] uppercase tracking-[0.1em] font-subtext">
                  {member.title}
                </p>
                
                {/* CSS Grid Hack for Smooth Height Reveal */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full">
                  <div className="overflow-hidden">
                    <p className="text-slate-300 text-[15px] leading-relaxed font-subtext pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[50ms] ease-out">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
