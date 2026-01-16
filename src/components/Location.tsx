"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Location() {
  const [showCopyToast, setShowCopyToast] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const address =
    "Rembayung Kuala Lumpur, Lot 2791, Jalan Daud, Off, Jalan Raja Muda Abdul Aziz, Kampung Baru, 50300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur";

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("span");
        const description = headerRef.current.querySelector("p");

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
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

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
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Map animation - reveal from left
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          {
            x: -80,
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
              trigger: mapRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Info cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(":scope > div");
        gsap.fromTo(
          cards,
          {
            x: 60,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
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

  return (
    <>
      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-accent text-black font-medium shadow-lg animate-fade-in-up">
          Alamat telah disalin!
        </div>
      )}

      <section
        ref={sectionRef}
        id="location"
        className="relative section-padding bg-black"
      >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-pattern" />

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/15 blur-[120px] animate-float delay-200" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-light/10 blur-[80px] animate-float delay-300" />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-accent font-bold mb-4 tracking-wider uppercase text-sm">
            Lokasi
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream mb-6"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Cari <span className="text-accent">Kami</span>
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg">
            Terletak di Kampung Baru, Kuala Lumpur.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div
            ref={mapRef}
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden border border-accent/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7!2d101.7036309!3d3.1677405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc490029136eb3%3A0x5435818f65486218!2sRembayung%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1705000000000!5m2!1sen!2smy"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Rembayung"
            />
          </div>

          {/* Info Cards */}
          <div ref={cardsRef} className="space-y-6">
            {/* Address Card */}
            <div className="bg-cream/5 border border-accent/20 p-6 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-cream mb-2">
                    Alamat
                  </h3>
                  <p className="text-cream/80 mb-4">{address}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={copyAddress}
                      className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Salin
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Arah ke sini
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-cream/5 border border-accent/20 p-6 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🕐</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-cream mb-4">
                    Waktu Operasi
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-accent/10">
                      <span className="text-cream/80">Makan Tengahari</span>
                      <span className="text-cream font-medium">
                        12:00 PM - 3:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-accent/10">
                      <span className="text-cream/80">Makan Malam</span>
                      <span className="text-cream font-medium">
                        6:00 PM - 10:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cream/80">Hari Operasi</span>
                      <span className="text-cream font-medium">
                        Selasa - Ahad
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-accent/10 border border-accent/20">
                    <p className="text-cream/90 text-sm">
                      Tutup pada hari Isnin untuk penyelenggaraan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking Card */}
            <div className="bg-cream/5 border border-accent/20 p-6 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚗</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-cream mb-2">
                    Kemudahan Parkir
                  </h3>
                  <p className="text-cream/80">
                    Parkir percuma disediakan untuk tetamu. Valet parking juga
                    tersedia pada hujung minggu (RM10).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
