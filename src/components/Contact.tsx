"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://instagram.com/rembayungmy",
      color: "hover:text-pink-500",
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      href: "https://tiktok.com/@khairulaming",
      color: "hover:text-cream",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://facebook.com/khairulaming",
      color: "hover:text-blue-500",
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      href: "https://www.youtube.com/@khairulaming2508",
      color: "hover:text-red-500",
    },
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Content side animation
      if (contentRef.current) {
        const title = contentRef.current.querySelector("h2");
        const subtitle = contentRef.current.querySelector("span");
        const description = contentRef.current.querySelector("p");
        const contactMethods =
          contentRef.current.querySelectorAll(".space-y-4 > a");
        const socialSection = contentRef.current.querySelector(
          ":scope > div:last-child"
        );

        // Subtitle animation
        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Title reveal
        if (title) {
          gsap.fromTo(
            title,
            {
              y: 50,
              opacity: 0,
              clipPath: "inset(100% 0% 0% 0%)",
            },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Description fade
        if (description) {
          gsap.fromTo(
            description,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Contact methods stagger
        if (contactMethods.length) {
          gsap.fromTo(
            contactMethods,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Social links animation
        if (socialSection) {
          const socialButtons = socialSection.querySelectorAll("a");
          gsap.fromTo(
            socialButtons,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: socialSection,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Form side animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          {
            x: 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Form fields stagger
        const formFields = formRef.current.querySelectorAll("form > div");
        const submitButton = formRef.current.querySelector("form > button");

        gsap.fromTo(
          formFields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (submitButton) {
          gsap.fromTo(
            submitButton,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Decorative blur elements
      const blurElements =
        sectionRef.current?.querySelectorAll(".animate-float");
      if (blurElements) {
        gsap.fromTo(
          blurElements,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Alamat emel tidak sah.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.subject || !formData.message) {
      setErrorMessage("Sila lengkapkan semua maklumat.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMessage("Ralat berlaku. Sila cuba lagi.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-pattern" />

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/15 blur-[120px] animate-float delay-200" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-light/10 blur-[80px] animate-float delay-300" />

      {/* Bottom Radial Gradient Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
        }}
      />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div ref={contentRef}>
            <span className="inline-block text-accent font-bold mb-4 tracking-wider uppercase text-sm">
              Hubungi Kami
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-cream mb-6"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Ada Sebarang <span className="text-accent">Pertanyaan?</span>
            </h2>
            <p className="text-cream/80 text-lg mb-10">
              Kami sedia membantu anda. Hubungi kami untuk sebarang pertanyaan
              mengenai tempahan, menu khas, atau acara peribadi.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-10">
              {/* Phone */}
              <a
                href="tel:+60312345678"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-cream/5 border border-accent/20 flex items-center justify-center text-cream group-hover:text-accent group-hover:bg-accent/20 group-hover:border-accent/50 transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-cream/60 text-sm">Telefon</div>
                  <div className="text-cream text-lg font-medium group-hover:text-accent transition-colors">
                    +60 3-1234 5678
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@rembayung.my"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-cream/5 border border-accent/20 flex items-center justify-center text-cream group-hover:text-accent group-hover:bg-accent/20 group-hover:border-accent/50 transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-cream/60 text-sm">Emel</div>
                  <div className="text-cream text-lg font-medium group-hover:text-accent transition-colors">
                    hello@rembayung.my
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-cream/5 border border-accent/20 flex items-center justify-center text-cream group-hover:text-green-500 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-cream/60 text-sm">WhatsApp</div>
                  <div className="text-cream text-lg font-medium group-hover:text-green-500 transition-colors">
                    +60 12-345 6789
                  </div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-cream/60 text-sm mb-4">Ikuti Kami</div>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-cream/5 border border-accent/20 flex items-center justify-center text-cream ${social.color} transition-all hover:scale-110 hover:bg-accent/20 hover:border-accent/50`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div ref={formRef} className="bg-cream/5 border border-accent/20 p-8">
            <h3
              className="text-2xl font-semibold text-cream mb-6"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Hantar Mesej
            </h3>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 text-green-400">
                Mesej anda telah berjaya dihantar. Kami akan menghubungi anda secepat mungkin.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && errorMessage && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 text-red-400">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <label className="block text-cream font-medium mb-2">
                  Nama <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/50 border border-accent/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Nama anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-cream font-medium mb-2">
                  Emel <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black/50 border border-accent/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="emel@contoh.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-cream font-medium mb-2">
                  Subjek <span className="text-accent">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-black/50 border border-accent/20 text-cream focus:outline-none focus:border-accent transition-colors"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                >
                  <option value="">Pilih subjek</option>
                  <option value="booking">Pertanyaan Tempahan</option>
                  <option value="event">Acara Peribadi</option>
                  <option value="feedback">Maklum Balas</option>
                  <option value="other">Lain-lain</option>
                </select>
              </div>
              <div>
                <label className="block text-cream font-medium mb-2">
                  Mesej <span className="text-accent">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-accent/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tulis mesej anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Menghantar...
                  </>
                ) : (
                  "Hantar Mesej"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
