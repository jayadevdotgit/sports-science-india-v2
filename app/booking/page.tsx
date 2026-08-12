import Navbar from "@/components/layout/Navbar";
import Booking from "@/components/booking/Booking";
import Footer from "@/components/footer/Footer";

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
