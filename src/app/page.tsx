import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuPreview from "@/components/MenuPreview";
import BookingForm from "@/components/BookingForm";

// Dynamically import below-fold components for better initial load
const Location = dynamic(() => import("@/components/Location"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[200px] bg-black" />,
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MenuPreview />
      <BookingForm />
      <About />
      <Location />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
