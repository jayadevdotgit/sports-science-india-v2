import Navbar from "@/components/layout/Navbar";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";
import BackButton from "@/components/ui/BackButton";
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
      <div className="relative">
        <div className="absolute inset-x-0 top-[136px] z-20 px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="absolute left-0">
              <BackButton />
            </div>
          </div>
        </div>
        <About />
      </div>
      <Footer />
    </>
  );
}
