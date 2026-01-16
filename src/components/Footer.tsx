"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigasi: [
      { name: "Tentang Kami", href: "#about" },
      { name: "Menu", href: "#menu" },
      { name: "Galeri", href: "#gallery" },
      { name: "Hubungi", href: "#contact" },
    ],
    tempahan: [
      { name: "Tempah Meja", href: "#booking" },
      { name: "Acara Peribadi", href: "#contact" },
      { name: "Kumpulan Besar", href: "#contact" },
    ],
    legal: [
      { name: "Dasar Privasi", href: "/privacy" },
      { name: "Terma & Syarat", href: "/terms" },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-black border-t border-accent/10 pt-16 pb-8">
      <div className="container-custom px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-accent/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/logo.svg" alt="Rembayung" width={156} height={34} />
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Masakan kampung autentik oleh Khairul Aming. Pengalaman menjamu
              selera yang menggabungkan tradisi dengan kemewahan moden.
            </p>
            <div className="flex items-center gap-2 text-sm text-accent">
              <span>Kampung Baru, Kuala Lumpur</span>
            </div>
          </div>

          {/* Links - Navigasi */}
          <div>
            <h4
              className="text-lg font-semibold text-cream mb-5"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Navigasi
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigasi.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Tempahan */}
          <div>
            <h4
              className="text-lg font-semibold text-cream mb-5"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Tempahan
            </h4>
            <ul className="space-y-3">
              {footerLinks.tempahan.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4
              className="text-lg font-semibold text-cream mb-5"
              style={{ fontFamily: "var(--font-nav)" }}
            >
              Langgan Kemas Kini
            </h4>
            <p className="text-cream/70 text-sm mb-4">
              Terima berita terbaru tentang menu, acara, dan promosi istimewa.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Emel anda"
                className="flex-1 px-4 py-2 bg-cream/5 border border-accent/20 text-cream text-sm placeholder:text-cream/40 focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors text-sm">
                Langgan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-cream/50 text-sm text-center md:text-left">
            © {currentYear} Rembayung by khairulaming. Hak cipta terpelihara.
          </div>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-cream/50 hover:text-accent text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 text-center">
          <p className="text-cream/30 text-xs">
            Dibina dengan cinta untuk menyajikan warisan masakan Melayu
          </p>
        </div>
      </div>
    </footer>
  );
}
