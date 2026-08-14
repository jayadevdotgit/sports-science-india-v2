import Navbar from "@/components/layout/Navbar";
import Booking from "@/components/booking/Booking";
import Footer from "@/components/footer/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book an Appointment",
  description:
    "Book a sports medicine consultation, physiotherapy session or sports science assessment at Sports Science India, Bhubaneswar.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <Booking />
      </div>
      <Footer />
    </>
  );
}
