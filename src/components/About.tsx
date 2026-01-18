"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image container animation - slide in from left with reveal
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          {
            x: -100,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Subtle parallax on the image
        gsap.to(imageContainerRef.current?.querySelector("img"), {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            y: 60,
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

      // Content paragraphs stagger animation
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        const subtitle = contentRef.current.querySelector("span");

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

        gsap.fromTo(
          paragraphs,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Decorative blur elements animation
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
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding bg-black scroll-mt-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-pattern" />

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/15 blur-[120px] animate-float delay-200" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-light/10 blur-[80px] animate-float delay-300" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={imageContainerRef} className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <div className="aspect-[4/5] overflow-hidden shadow-xl relative">
                <Image
                  src="/images/about-us.webp"
                  alt="Khairul Aming - Pengasas Rembayung"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/30 -z-10" />
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="order-1 lg:order-2 ">
            <span className="inline-block text-accent font-bold mb-4 tracking-wider uppercase text-sm">
              KISAH KAMI
            </span>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-cream mb-14 leading-tight"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Dari Dapur Digital ke
              <br />
              <span className="text-accent">Meja Anda!</span>
            </h2>

            <div className="space-y-6 text-cream/80 leading-relaxed text-lg">
              <p>
                <strong className="text-cream">Rembayung</strong> adalah impian
                Khairul Aming yang akhirnya menjadi kenyataan. Selepas
                bertahun-tahun berkongsi resepi tradisional di media sosial dan
                memikat hati jutaan rakyat Malaysia dengan kelazatan masakan
                kampung, kini tiba masanya untuk menjamu anda secara peribadi.
              </p>
              <p>
                Nama &ldquo;Rembayung&rdquo; diambil dari suasana senja kampung
                yang tenang — waktu keluarga berkumpul untuk makan malam
                bersama, berkongsi cerita, dan menikmati masakan ibu. Kami ingin
                membawa kehangatan itu kepada setiap tetamu.
              </p>
              <p>
                Dengan pelaburan RM4 juta, kami telah mencipta ruang yang
                menggabungkan keselesaan kampung dengan sentuhan kemewahan
                moden. Setiap sudut Rembayung menceritakan kisah warisan Melayu
                yang kaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
