"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  products: z.array(z.string()).min(1, "Select at least one product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const PRODUCT_OPTIONS = [
  { value: "godspeed", label: "Godspeed Digital Signage" },
  { value: "tellus", label: "Tellus Feedback" },
  { value: "childwood", label: "Childwood" },
  { value: "hardware", label: "Hardware Supply" },
  { value: "it-networking", label: "IT Networking" },
];

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      products: [],
    },
  });

  const selectedProducts = watch("products") || [];

  const toggleProduct = (value: string) => {
    const current = selectedProducts;
    if (current.includes(value)) {
      setValue(
        "products",
        current.filter((p) => p !== value),
      );
    } else {
      setValue("products", [...current, value]);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post("/cms/contact/", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        products: data.products,
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
        <div className="container-page text-center max-w-lg">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
          <h1 className="heading-lg text-primary-500 mb-4">Thank You!</h1>
          <p className="text-gray-500 mb-8">
            Your enquiry has been received. Our team will get back to you shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Ready to transform your business with the right technology?
            Contact us for a free consultation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="heading-md text-primary-500 mb-6">Send Us an Enquiry</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Products of Interest *</label>
                  <div className="flex flex-wrap gap-3">
                    {PRODUCT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleProduct(opt.value)}
                        className={`px-4 py-2 border text-sm font-medium transition-colors ${
                          selectedProducts.includes(opt.value)
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-white text-gray-700 border-gray-200 hover:border-primary-500"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.products && <p className="text-sm text-red-500 mt-1">{errors.products.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                  <Send size={16} className="ml-2" />
                </button>
              </form>
            </div>

            <div>
              <h2 className="heading-sm text-primary-500 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Registered Office</h3>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-1 text-accent-500 shrink-0" />
                    <p className="text-sm text-gray-600">
                      F7, 1st Floor, 40/26 Arani Muthu Street,<br />
                      Choolai, Chennai - 600112
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Sales Office</h3>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-1 text-accent-500 shrink-0" />
                    <p className="text-sm text-gray-600">
                      1/1, 1st Floor, General Collins Road,<br />
                      Choolai, Chennai - 600112
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Call Us</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-accent-500" />
                      <span className="text-sm text-gray-600">044-26420089</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-accent-500" />
                      <div className="text-sm text-gray-600">
                        <p>Jayakumar: +91 9840057127</p>
                        <p>Vidya Rani: +91 9381459199</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Email</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-accent-500" />
                      <a href="mailto:info@sakthisolutions.in" className="text-sm text-gray-600 hover:text-primary-500">info@sakthisolutions.in</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-accent-500" />
                      <a href="mailto:support@sakthisolutions.in" className="text-sm text-gray-600 hover:text-primary-500">support@sakthisolutions.in</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Locate Us</h3>
                <div className="border border-gray-200 aspect-[4/3] bg-gray-50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6067!2d80.2378!3d13.0878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzE2LjEiTiA4MMKwMTQnMTYuMSJF!5e0!3m2!1sen!2sin!4v1"
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