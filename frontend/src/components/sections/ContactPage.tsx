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
  ChevronDown,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { useCompanyInfo } from "@/hooks/useQueries";

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

  const enquiryTypes: string[] = (companyInfo?.enquiry_types && companyInfo.enquiry_types.length > 0)
    ? companyInfo.enquiry_types.map((e: any) => typeof e === "string" ? e : e.name)
    : [];
  const callbackSlots: string[] = (companyInfo?.callback_slots && companyInfo.callback_slots.length > 0)
    ? companyInfo.callback_slots.map((s: any) => typeof s === "string" ? s : s.label)
    : [];

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

  // ── Derived contact data (API only) ──
  const phonePrimary = companyInfo?.phone_primary || "";
  const phoneSecondary = companyInfo?.phone_secondary || "";
  const emailPrimary = companyInfo?.email_primary || "";
  const phoneJayakumar = (companyInfo as any)?.phone_jayakumar || phonePrimary;
  const phoneVidya = (companyInfo as any)?.phone_vidya || phoneSecondary;

  const salesAddress = companyInfo?.address_line1
    ? `${companyInfo.address_line1}, ${companyInfo.address_line2 || ""}, ${companyInfo.city || ""} – ${companyInfo.postal_code || ""}`
    : "";

  const registeredAddress = companyInfo?.address_line1 ? salesAddress : "";

  const mapUrl = (companyInfo as any)?.google_maps_embed || "";

  const googleMapsDirectionsUrl = companyInfo?.company_name
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyInfo.company_name)}`
    : "";
  const whatsappUrl = `https://wa.me/${phonePrimary.replace(/[\s+\-]/g, "")}`;

  if (isSubmitted) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-50 border border-green-200 flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-primary-500 mb-3">
            Enquiry Received!
          </h1>
          <p className="font-body text-gray-500 text-sm leading-relaxed mb-8">
            Thank you for reaching out. Our team will review your enquiry and get back to you
            within one business day.
          </p>
          <div className="gold-divider-center" />
          <p className="text-xs text-gray-400 font-body">
            For urgent queries call{" "}
            <a href={`tel:${phonePrimary}`} className="text-accent-500 font-bold">
              {phonePrimary}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-page section-header-left max-w-3xl">
          <p className="section-label">Contact Us</p>
          <h1 className="heading-lg text-primary-500 mb-1">
            Let&apos;s Build Something Remarkable
          </h1>
          <div className="gold-divider" />
          <p className="font-body text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
            Whether you&apos;re planning a digital signage rollout, need an IT infrastructure
            audit, or want a custom kiosk quote — we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPLIT LAYOUT — Offices (Left) + Form (Right)
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

            {/* ── LEFT: Office Contact Info ── */}
            <div className="space-y-8">
              <div>
                <p className="section-label">Our Offices</p>
                <h2 className="heading-md text-primary-500 mb-1">Visit or Call Us</h2>
                <div className="gold-divider" />
              </div>

              {/* Office Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Registered Office */}
                <div className="card p-5 space-y-3">
                  <h3 className="font-heading text-lg font-bold text-primary-500">
                    Registered Office
                  </h3>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-accent-500 mt-0.5 shrink-0" />
                    <p className="font-body text-xs text-gray-600 leading-relaxed">
                      {registeredAddress}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-accent-500 shrink-0" />
                      <a
                        href={`tel:${phonePrimary.replace(/[\s-]/g, "")}`}
                        className="font-body text-xs text-accent-500 hover:underline"
                      >
                        {phonePrimary}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-accent-500 shrink-0" />
                      <a
                        href={`mailto:${emailPrimary}`}
                        className="font-body text-xs text-accent-500 hover:underline"
                      >
                        {emailPrimary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sales Office */}
                <div className="card p-5 space-y-3">
                  <h3 className="font-heading text-lg font-bold text-primary-500">
                    Sales Office
                  </h3>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-accent-500 mt-0.5 shrink-0" />
                    <p className="font-body text-xs text-gray-600 leading-relaxed">
                      {salesAddress}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-accent-500 shrink-0" />
                      <a
                        href={`tel:${phoneSecondary.replace(/[\s-]/g, "")}`}
                        className="font-body text-xs text-accent-500 hover:underline"
                      >
                        {phoneSecondary}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-accent-500 shrink-0" />
                      <a
                        href={`mailto:${emailPrimary}`}
                        className="font-body text-xs text-accent-500 hover:underline"
                      >
                        {emailPrimary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Row */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"
                  title="Get Directions"
                >
                  <Navigation size={16} />
                  <span className="font-body text-xs font-medium">Get Directions</span>
                </a>
                <a
                  href={`tel:${phonePrimary.replace(/[\s-]/g, "")}`}
                  className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"
                  title="Call"
                >
                  <Phone size={16} />
                  <span className="font-body text-xs font-medium">Call</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"
                  title="WhatsApp"
                >
                  <MessageCircle size={16} />
                  <span className="font-body text-xs font-medium">WhatsApp</span>
                </a>
              </div>

              {/* Individual Contacts */}
              <div className="bg-cream p-5 space-y-3">
                <p className="font-heading text-sm font-bold text-primary-500">
                  Direct Lines
                </p>
                {(phoneJayakumar || phoneVidya) && (
                  <div className="space-y-2">
                    {phoneJayakumar && (
                      <div className="flex items-center gap-2.5">
                        <Phone size={13} className="text-accent-500 shrink-0" />
                        <a
                          href={`tel:${phoneJayakumar.replace(/[\s-]/g, "")}`}
                          className="font-body text-xs text-accent-500 hover:underline"
                        >
                          Jayakumar: {phoneJayakumar}
                        </a>
                      </div>
                    )}
                    {phoneVidya && (
                      <div className="flex items-center gap-2.5">
                        <Phone size={13} className="text-accent-500 shrink-0" />
                        <a
                          href={`tel:${phoneVidya.replace(/[\s-]/g, "")}`}
                          className="font-body text-xs text-accent-500 hover:underline"
                        >
                          Vidya Rani: {phoneVidya}
                        </a>
                      </div>
                    )}
                  </div>
                )}
                {(companyInfo as any)?.business_hours && (
                  <p className="font-body text-xs text-gray-500">
                    {(companyInfo as any).business_hours}
                  </p>
                )}
              </div>
            </div>

            {/* ── RIGHT: Inquiry Form ── */}
            <div>
              <div className="mb-6">
                <p className="section-label">Request a Consultation</p>
                <p className="font-accent italic text-xl md:text-2xl text-primary-500/70">
                  Start your project journey
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} id="contact-enquiry-form" className="space-y-5">
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Your Name *</label>
                    <input
                      {...register("name")}
                      className="form-input"
                      placeholder="Full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row: Phone + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Phone *</label>
                    <input
                      {...register("phone")}
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Business / Organization *</label>
                    <input
                      {...register("business_name")}
                      className="form-input"
                      placeholder="Hotel / Restaurant / Retail brand"
                    />
                    {errors.business_name && (
                      <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
                    )}
                  </div>
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="form-label">Enquiry Type *</label>
                  <div className="relative">
                    <select
                      {...register("enquiry_type")}
                      className="form-select pr-10 cursor-pointer"
                    >
                      <option value="">— Select what you need —</option>
                      {enquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {errors.enquiry_type && (
                    <p className="text-xs text-red-500 mt-1">{errors.enquiry_type.message}</p>
                  )}
                </div>

                {/* Preferred Callback */}
                <div>
                  <label className="form-label">Preferred Callback Time</label>
                  <div className="relative">
                    <select
                      {...register("callback_time")}
                      className="form-select pr-10 cursor-pointer"
                    >
                      <option value="">— Any time is fine —</option>
                      {callbackSlots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Message / Requirements *</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell us about your project scope, location, timeline, or any specific requirements..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-enquiry-btn"
                  className="btn-accent w-full"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Enquiry <Send size={14} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MAP SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-cream">
        <div className="container-page py-12">
          <div className="section-header-center max-w-xl mx-auto">
            <p className="section-label text-center">Locate Us</p>
            <h2 className="heading-md text-primary-500 mb-1">Find Us on the Map</h2>
            <div className="gold-divider-center" />
          </div>
          <div className="border border-accent-500/15 aspect-[16/7] bg-gray-50 overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={companyInfo?.company_name ? `${companyInfo.company_name} Location` : "Location"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
