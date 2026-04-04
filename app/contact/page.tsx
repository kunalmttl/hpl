"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2,
  Clock,
  Building,
  ArrowUpRight
} from "lucide-react";
import { useNavbarLogoRef } from "@/contexts/NavbarLogoRef";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { isIntroDone } = useNavbarLogoRef();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemPop = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    // Mocking API call
    console.log("Form data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-white font-sans overflow-x-hidden">
      {/* Hero */}
      <section className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isIntroDone ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 variants={itemPop} className="text-4xl md:text-6xl font-black text-slate-900 mb-6">How Can We <span className="text-pharma-teal">Help?</span></motion.h1>
            <motion.p variants={itemPop} className="text-xl text-slate-600 font-medium leading-relaxed">
              Our experts are ready to optimize your pharmaceutical supply chain. Reach out for a consultation, a quote, or simply to learn more about our Indore operations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Details */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView={isIntroDone ? "visible" : "hidden"}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div variants={itemPop}>
                <h3 className="text-3xl font-black text-slate-900 mb-10">Get in Touch Directly</h3>
                <div className="space-y-8">
                  {[
                    { icon: Phone, label: "Call Us", val: "+91 XXXXX XXXXX" },
                    { icon: Mail, label: "Email Us", val: "info@hplindore.com" },
                    { icon: MapPin, label: "Office Location", val: "Indore, Madhya Pradesh", sub: "123 Logistics Park, PH-1, Industrial Area" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemPop}
                      whileHover={{ x: 10 }}
                      className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-pharma-teal/10 rounded-xl flex items-center justify-center text-pharma-teal shrink-0 group-hover:bg-pharma-teal group-hover:text-white transition-all">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 font-subtext mb-1">{item.label}</p>
                        <p className="text-xl font-bold text-slate-900">{item.val}</p>
                        {item.sub && <p className="text-slate-500 font-medium">{item.sub}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemPop} className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pharma-teal/20 blur-2xl rounded-full" />
                <h4 className="text-xl font-bold mb-4 flex items-center font-heading"><Clock className="mr-2 text-pharma-teal" /> Operating Hours</h4>
                <div className="space-y-4 font-medium text-slate-400 font-subtext">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white font-bold text-red-400">Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={itemPop}
              initial="hidden"
              whileInView={isIntroDone ? "visible" : "hidden"}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 h-fit"
            >
              {isSubmitSuccessful ? (
                <div className="py-20 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-pharma-teal/10 rounded-full flex items-center justify-center text-pharma-teal mx-auto"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-lg text-slate-600 font-medium">Our experts will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-pharma-teal text-white rounded-xl font-bold shadow-lg"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        {...register("name")}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pharma-teal focus:border-transparent transition-all font-medium"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        {...register("email")}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pharma-teal focus:border-transparent transition-all font-medium"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                    <input 
                      {...register("subject")}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pharma-teal focus:border-transparent transition-all font-medium"
                      placeholder="Logistic Inquiry"
                    />
                    {errors.subject && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.subject.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                    <textarea 
                      {...register("message")}
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pharma-teal focus:border-transparent transition-all font-medium resize-none"
                      placeholder="Tell us about your logistics needs..."
                    />
                    {errors.message && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.message.message}</p>}
                  </div>
                  <motion.button 
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-pharma-teal text-white rounded-2xl font-black text-xl hover:bg-pharma-teal-dark shadow-xl shadow-pharma-teal/20 transition-all flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <Send size={20} className={isSubmitting ? "" : "ml-2"} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 mb-12"
          >
            <Building className="text-pharma-teal" size={32} />
            <h2 className="text-4xl font-black text-slate-900">Regional Distribution Hub</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-[3rem] bg-slate-200 border border-slate-300 overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700 group"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 flex-col space-y-4">
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
               >
                 <MapPin size={64} className="text-pharma-teal" />
               </motion.div>
               <p className="text-slate-500 font-bold uppercase tracking-[0.3em] font-subtext">Indore Industrial Hub</p>
               <motion.a 
                 href="https://www.google.com/maps/search/Pharma+Logistics+Indore" 
                 target="_blank" 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-10 py-3 bg-white text-pharma-teal rounded-full font-bold shadow-lg flex items-center group-hover:bg-pharma-teal group-hover:text-white transition-all"
               >
                 View on Google Maps <ArrowUpRight size={18} className="ml-2" />
               </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
