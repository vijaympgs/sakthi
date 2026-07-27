"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Building2,
  Clock,
  ChevronDown,
} from "lucide-react";
import { api } from "@/lib/api";
import { useCompanyInfo } from "@/hooks/useQueries";

const ENQUIRY_TYPES = [
  "Digital Signage & Video Wall",
  "Interactive Kiosk / Wayfinding",
  "IT Networking Consulting",
  "Hardware Supply (POS / KOT)",
  "Customer Feedback Solution",
  "Smart Touch Table",
  "General Inquiry",
];

const CALLBACK_SLOTS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 3 PM)",
  "Evening (3 PM – 6 PM)",
  "Anytime",
];

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  business_name: z.string().min(2, "Business / Organization name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  enquiry_type: z.string().min(1, "Please select an enquiry type"),
  callback_time: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: companyInfo } = useCompanyInfo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post("/cms/contact/", {
        name: data.name,
        business_name: data.business_name,
        email: data.email,
        phone: data.phone,
        enquiry_type: null,
        products: [data.enquiry_type],
        callback_time: data.callback_time || "",
        message: data.message,
      });
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-50 border border-green-200 flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-serif font-extrabold text-3xl text-slate-900 mb-3">Enquiry Received!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Thank you for reaching out. Our team will review your enquiry and get back to you within one business day.
          </p>
          <div className="h-px w-16 bg-[#B89A4A]/50 mb-6" />
          <p className="text-xs text-gray-400">
            For urgent queries call <a href="tel:+919840057127" className="text-[#B89A4A] font-bold">+91 98400 57127</a>
          </p>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 bg-white text-slate-800 text-sm placeholder-gray-400 focus:border-[#B89A4A] focus:outline-none transition-colors font-normal";
  const labelClass = "block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 mb-1.5";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89A4A] mb-3">Contact Us</p>
              <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-white mb-4 leading-[1.1]">
                Let&apos;s Talk Technology
              </h1>
              <p className="text-gray-400 text-sm max-w-lg leading-relaxed font-normal">
                Whether you&apos;re planning a digital signage rollout, need an IT infrastructure audit, or want a custom kiosk quote — we&apos;re here to help.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-7 space-y-5">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-[#B89A4A]/20 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-[#B89A4A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">Sales</p>
                    <span className="text-sm">{companyInfo?.phone_secondary || "+91 98400 57127"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-[#B89A4A]/20 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-[#B89A4A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">Email</p>
                    <span className="text-sm">{companyInfo?.email_primary || "info@sakthisolutions.in"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-[#B89A4A]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={15} className="text-[#B89A4A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">Sales Office</p>
                    <span className="text-sm leading-relaxed">
                      {companyInfo?.address_line1
                        ? `${companyInfo.address_line1}, ${companyInfo.address_line2 || ""}, ${companyInfo.city || ""} - ${companyInfo.postal_code || ""}`
                        : "1/1, 1st Floor, General Collins Road, Choolai, Chennai – 600112"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#B89A4A]/40 to-transparent" />

      {/* Form + Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14">

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-slate-900 mb-6">
                Send Us an Enquiry
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="contact-enquiry-form">

                {/* Row: Name + Business */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input {...register("name")} className={inputClass} placeholder="Full name" />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Business / Organization *</label>
                    <input {...register("business_name")} className={inputClass} placeholder="Hotel / Restaurant / Retail brand" />
                    {errors.business_name && <p className={errorClass}>{errors.business_name.message}</p>}
                  </div>
                </div>

                {/* Row: Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input {...register("phone")} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className={labelClass}>Enquiry Type *</label>
                  <div className="relative">
                    <select {...register("enquiry_type")} className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                      <option value="">— Select what you need —</option>
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.enquiry_type && <p className={errorClass}>{errors.enquiry_type.message}</p>}
                </div>

                {/* Preferred Callback */}
                <div>
                  <label className={labelClass}>Preferred Callback Time</label>
                  <div className="relative">
                    <select {...register("callback_time")} className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                      <option value="">— Any time is fine —</option>
                      {CALLBACK_SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>Message / Requirements *</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project scope, location, timeline, or any specific requirements..."
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-enquiry-btn"
                  className="inline-flex items-center gap-2 bg-[#B89A4A] hover:bg-transparent text-white hover:text-[#B89A4A] border border-[#B89A4A] font-bold px-8 py-3.5 text-xs uppercase tracking-widest transition-colors shadow-md disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                  <Send size={14} />
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-slate-50 border border-gray-200 p-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A4A] mb-5">Contact Information</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sales Office</p>
                    <div className="flex items-start gap-2.5">
                      <MapPin size={14} className="text-[#B89A4A] mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {companyInfo?.address_line1 && companyInfo?.address_line2
                          ? `${companyInfo.address_line1}, ${companyInfo.address_line2}, ${companyInfo.city || ""} – ${companyInfo.postal_code || ""}`
                          : "1/1, 1st Floor, General Collins Road, Choolai, Chennai – 600112"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Call Us</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <Phone size={13} className="text-[#B89A4A] shrink-0" />
                        <a href="tel:+919840057127" className="text-xs text-slate-600 hover:text-[#B89A4A] transition-colors">
                          Jayakumar: +91 98400 57127
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone size={13} className="text-[#B89A4A] shrink-0" />
                        <a href="tel:+919381459199" className="text-xs text-slate-600 hover:text-[#B89A4A] transition-colors">
                          Vidya Rani: +91 93814 59199
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email</p>
                    <div className="flex items-center gap-2.5">
                      <Mail size={13} className="text-[#B89A4A] shrink-0" />
                      <a
                        href={`mailto:${companyInfo?.email_primary || "info@sakthisolutions.in"}`}
                        className="text-xs text-slate-600 hover:text-[#B89A4A] transition-colors"
                      >
                        {companyInfo?.email_primary || "info@sakthisolutions.in"}
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Business Hours</p>
                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-[#B89A4A] shrink-0" />
                      <span className="text-xs text-slate-600">Mon – Sat: 9:00 AM – 6:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Us mini card */}
              <div className="border-l-4 border-[#B89A4A] pl-4 bg-slate-50 py-4 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={14} className="text-[#B89A4A]" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Why Sakthi Solutions?</p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Direct Godspeed OEM partner",
                    "On-site installation & support",
                    "24/7 maintenance SLA",
                    "Hospitality-grade hardware",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 bg-[#B89A4A] rounded-full mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Locate Us</p>
                <div className="border border-gray-200 aspect-[4/3] bg-gray-50">
                  <iframe
                    src={
                      companyInfo?.google_maps_embed ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.142420851332!2d80.26311231482329!3d13.09015899077815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265fb1d99fc0d%3A0x426a91434f932dba!2ssakthi+solutions!5e0!3m2!1sen!2sin!4v1522991981617"
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sakthi Solutions Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}