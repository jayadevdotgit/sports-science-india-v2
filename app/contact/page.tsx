import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import BackButton from "@/components/ui/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Visit Sports Science India at A17/1A, Surya Nagar, Bhubaneswar 751003. Call +91 73813 80010 to book a sports medicine or physiotherapy appointment.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute inset-x-0 top-[136px] z-20 px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="absolute left-8">
              <BackButton />
            </div>
          </div>
        </div>
        <Contact />
      </div>
      <Footer />
    </>
  );
}