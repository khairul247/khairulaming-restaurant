"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt to autoplay music on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set volume to 30%
      audio.loop = true;

      // Try to play unmuted
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsMusicMuted(false);
        })
        .catch(() => {
          // If browser blocks unmuted autoplay, stay muted
          audio.muted = true;
          setIsMusicMuted(true);
        });
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicMuted) {
        audio.muted = false;
        audio.play();
        setIsMusicMuted(false);
      } else {
        audio.muted = true;
        setIsMusicMuted(true);
      }
    }
  };

  const navLinks = [
    { name: "Tentang Kami", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Galeri", href: "#gallery" },
    { name: "Lokasi", href: "#location" },
    { name: "Hubungi", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent pt-8">
      {/* Background Music - lazy loaded to improve page speed */}
      <audio
        ref={audioRef}
        src="/Noraniza Idris - Dikir Puteri.mp3"
        preload="none"
      />

      <div className="container-custom px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Music Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src="/logo.svg"
                alt="Rembayung"
                width={156}
                height={34}
                priority
              />
            </button>

            {/* Music Mute/Unmute Button - 44x44px touch target for accessibility */}
            <button
              onClick={toggleMusic}
              className="p-3 -m-2 text-cream/80 hover:text-accent transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              aria-label={isMusicMuted ? "Play music" : "Mute music"}
              title={isMusicMuted ? "Play music" : "Mute music"}
            >
              {isMusicMuted ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-2"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="group relative px-4 py-2 text-cream/90 hover:text-accent transition-colors duration-200 text-xl"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#booking")}
              className="ml-4 px-6 py-2.5 bg-accent hover:bg-accent-light text-black font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 text-lg"
            >
              Tempah Meja
            </button>
          </div>

          {/* Mobile Menu Button - 44x44px touch target for accessibility */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 -m-1 text-cream"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
          style={{ fontFamily: "var(--font-nav)" }}
        >
          <div className="flex flex-col gap-1 pt-3 border-t border-cream/10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="group relative text-cream/90 hover:text-accent transition-colors duration-200 text-left py-2 px-4 text-lg w-fit"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#booking")}
              className="mt-3 px-4 py-2.5 bg-accent hover:bg-accent-light text-black font-semibold transition-all duration-200 text-base"
            >
              Tempah Meja
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
