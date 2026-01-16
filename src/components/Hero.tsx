import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Rembayung Restaurant Background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient Overlay - 52% at top, 100% black at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 blur-3xl" />
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-primary/10 blur-3xl" />

      {/* Welcome Message */}
      <div className="relative z-10 text-center">
        <Image
          src="/logo.svg"
          alt="Rembayung"
          width={300}
          height={66}
          priority
          className="mx-auto mt-24"
        />
      </div>
    </section>
  );
}
