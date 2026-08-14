import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
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
      <div className="pt-32">
        <Contact />
      </div>
      <Footer />
    </>
  );
}