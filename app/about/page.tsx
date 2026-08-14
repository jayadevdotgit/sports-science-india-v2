import Navbar from "@/components/layout/Navbar";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Sports Science India is the first sports medicine centre of Odisha and Eastern India — trusted by Odisha Football Academy, Ranji Cricket team and the SAI Table Tennis Academy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <About />
      </div>
      <Footer />
    </>
  );
}
