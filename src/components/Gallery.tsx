"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "food" | "interior" | "atmosphere";
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/gallery/food-1.jpg",
    alt: "Hidangan Rendang Daging",
    category: "food",
  },
  {
    id: 2,
    src: "/images/gallery/interior-1.jpg",
    alt: "Ruang Makan Utama",
    category: "interior",
  },
  {
    id: 3,
    src: "/images/gallery/food-2.jpg",
    alt: "Ayam Masak Lemak",
    category: "food",
  },
  {
    id: 4,
    src: "/images/gallery/atmosphere-1.jpg",
    alt: "Suasana Malam",
    category: "atmosphere",
  },
  {
    id: 5,
    src: "/images/gallery/interior-2.jpg",
    alt: "Hiasan Tradisional",
    category: "interior",
  },
  {
    id: 6,
    src: "/images/gallery/food-3.jpg",
    alt: "Nasi Ulam Rembayung",
    category: "food",
  },
  {
    id: 7,
    src: "/images/gallery/atmosphere-2.jpg",
    alt: "Tetamu Menikmati Hidangan",
    category: "atmosphere",
  },
  {
    id: 8,
    src: "/images/gallery/food-4.jpg",
    alt: "Sambal Nyet",
    category: "food",
  },
  {
    id: 9,
    src: "/images/gallery/interior-3.jpg",
    alt: "Kawasan VIP",
    category: "interior",
  },
];

const categories = [
  { key: "all", label: "Semua" },
  { key: "food", label: "Hidangan" },
  { key: "interior", label: "Interior" },
  { key: "atmosphere", label: "Suasana" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("span");
        const description = headerRef.current.querySelector("p");
        const filters = headerRef.current.querySelector(
          ".flex.flex-wrap.justify-center"
        );

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
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Filter buttons animation
        if (filters) {
          const buttons = filters.querySelectorAll("button");
          gsap.fromTo(
            buttons,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Gallery grid animation - staggered reveal
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(":scope > div");
        gsap.fromTo(
          items,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: {
              each: 0.1,
              grid: [3, 3],
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
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

  // Refresh ScrollTrigger when category changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeCategory]);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative section-padding bg-black scroll-mt-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-pattern" />

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/15 blur-[120px] animate-float delay-200" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-light/10 blur-[80px] animate-float delay-300" />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block text-accent font-bold mb-4 tracking-wider uppercase text-sm">
            Galeri
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream mb-6"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Jelajahi <span className="text-accent">Rembayung</span>
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg mb-8">
            Lihat suasana dan hidangan istimewa yang menanti anda di Rembayung.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="group relative px-2 py-2 font-medium transition-all text-lg"
              >
                <span
                  className={
                    activeCategory === cat.key
                      ? "text-accent"
                      : "text-cream/80 group-hover:text-accent"
                  }
                >
                  {cat.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => setLightboxImage(image)}
            >
              <div className="relative overflow-hidden aspect-square transition-all duration-500">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-cream">
                    <p className="font-medium">{image.alt}</p>
                    <span className="text-sm text-cream/70 capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm border border-accent/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-cream"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-cream/10 hover:bg-cream/20 border border-accent/30 flex items-center justify-center transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <svg
              className="w-6 h-6 text-cream"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="max-w-4xl max-h-[80vh] relative w-full aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
              priority
            />
            <div className="text-center mt-4">
              <p className="text-cream font-medium">{lightboxImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
