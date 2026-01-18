"use client";

import { useState, useEffect, useRef, useLayoutEffect, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  isSignature?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Rendang Daging Tok",
    description:
      "Rendang tradisional Perak yang dimasak perlahan selama 6 jam dengan rempah ratus asli.",
    price: "RM38",
    image: "/images/menu/rendang.webp",
    category: "Hidangan Utama",
    isSignature: true,
  },
  {
    id: 2,
    name: "Ayam Masak Lemak Cili Api",
    description:
      "Ayam kampung dalam kuah santan pekat dengan cili api segar dari kebun sendiri.",
    price: "RM32",
    image: "/images/menu/ayam-lemak.webp",
    category: "Hidangan Utama",
    isSignature: true,
  },
  {
    id: 3,
    name: "Ikan Patin Tempoyak",
    description:
      "Ikan patin sungai dengan tempoyak asli Pahang — masam manis yang memukau.",
    price: "RM45",
    image: "/images/menu/patin-tempoyak.webp",
    category: "Hidangan Utama",
  },
  {
    id: 4,
    name: "Nasi Ulam Rembayung",
    description:
      "Nasi herba dengan 12 jenis ulam-ulaman segar, dimakan dengan sambal belacan.",
    price: "RM18",
    image: "/images/menu/nasi-ulam.webp",
    category: "Nasi",
    isSignature: true,
  },
  {
    id: 5,
    name: "Sambal Nyet Original",
    description:
      "Sambal ikonik yang memulakan segalanya — pedas, rangup, dan ketagihan.",
    price: "RM15",
    image: "/images/menu/sambal-nyet.webp",
    category: "Sambal & Lauk",
    isSignature: true,
  },
  {
    id: 6,
    name: "Kerabu Mangga Muda",
    description:
      "Mangga muda jeruk dengan kerisik, udang kering, dan daun kesum.",
    price: "RM16",
    image: "/images/menu/kerabu.webp",
    category: "Pembuka Selera",
  },
];

export default function MenuPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("span");
        const description = headerRef.current.querySelector("p");

        // Subtitle slide in
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
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Description fade in
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

      // Carousel entrance
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
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

  const goToPrevious = () => {
    if (isAnimating) return;
    setSlideDirection("left");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (isAnimating) return;
    setSlideDirection("right");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setSlideDirection(index > currentIndex ? "right" : "left");
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getItemIndex = (offset: number) => {
    return (currentIndex + offset + menuItems.length) % menuItems.length;
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative section-padding bg-black overflow-hidden scroll-mt-28"
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
            Menu Kami
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream mb-6"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Hidangan <span className="text-accent">Istimewa</span>
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg">
            Setiap hidangan dimasak dengan penuh cinta menggunakan resipi
            warisan dan bahan-bahan segar berkualiti tinggi.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative flex items-center justify-center min-h-[500px]"
        >
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-2 md:left-8 z-20 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-accent/30 hover:bg-accent/20 hover:border-accent text-cream transition-all duration-300 hover:scale-110 disabled:opacity-50"
            aria-label="Previous"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto px-16 md:px-24">
            {/* Left Card (blurred) */}
            <div
              className={`absolute left-0 md:left-8 hidden md:block w-56 lg:w-64 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isAnimating
                  ? slideDirection === "right"
                    ? "opacity-0 -translate-x-12 scale-80"
                    : "opacity-60 translate-x-4 scale-95"
                  : "opacity-50 scale-90"
              }`}
              style={{
                filter:
                  isAnimating && slideDirection === "right"
                    ? "blur(8px)"
                    : "blur(3px)",
                transition:
                  "all 600ms cubic-bezier(0.4, 0, 0.2, 1), filter 400ms ease-out",
              }}
            >
              <MenuCard item={menuItems[getItemIndex(-1)]} />
            </div>

            {/* Center Card (focused) */}
            <div
              className={`relative z-10 w-80 lg:w-[400px] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isAnimating
                  ? "scale-[0.97] opacity-95"
                  : "scale-100 opacity-100"
              }`}
            >
              <MenuCard item={menuItems[currentIndex]} isFocused />
            </div>

            {/* Right Card (blurred) */}
            <div
              className={`absolute right-0 md:right-8 hidden md:block w-56 lg:w-64 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isAnimating
                  ? slideDirection === "left"
                    ? "opacity-0 translate-x-12 scale-80"
                    : "opacity-60 -translate-x-4 scale-95"
                  : "opacity-50 scale-90"
              }`}
              style={{
                filter:
                  isAnimating && slideDirection === "left"
                    ? "blur(8px)"
                    : "blur(3px)",
                transition:
                  "all 600ms cubic-bezier(0.4, 0, 0.2, 1), filter 400ms ease-out",
              }}
            >
              <MenuCard item={menuItems[getItemIndex(1)]} />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-2 md:right-8 z-20 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-accent/30 hover:bg-accent/20 hover:border-accent text-cream transition-all duration-300 hover:scale-110 disabled:opacity-50"
            aria-label="Next"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {menuItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all duration-500 ${
                index === currentIndex
                  ? "bg-accent w-8"
                  : "bg-cream/20 w-2 hover:bg-cream/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const MenuCard = memo(function MenuCard({
  item,
  isFocused = false,
}: {
  item: MenuItem;
  isFocused?: boolean;
}) {
  return (
    <div
      className={`group relative bg-zinc-900 overflow-hidden transition-all duration-500 ${
        isFocused ? "shadow-2xl shadow-black/40" : ""
      }`}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Signature Badge */}
        {item.isSignature && (
          <span
            className="absolute top-4 left-4 text-cream text-xl z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Signature
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-semibold text-cream group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <span className="text-accent font-bold text-lg">{item.price}</span>
        </div>
        <span className="inline-block text-xs text-cream/50 mb-3 uppercase tracking-wide">
          {item.category}
        </span>
        <p className="text-cream/70 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
});

MenuCard.displayName = "MenuCard";
