import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Booking() {
  return (
    <section id="booking" className="bg-black py-28 text-white">
      <Container>

        <SectionHeading
          eyebrow="Book Assessment"
          title="Start Your Performance Journey"
          description="Fill out the form below and our sports science experts will contact you."
        />

        <div className="max-w-3xl mx-auto mt-16 bg-[#111111] rounded-3xl border border-gray-800 p-10">

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:border-orange-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:border-orange-500 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:border-orange-500 outline-none"
            />

            <select
              className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:border-orange-500 outline-none"
            >
              <option>Select Your Sport</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Badminton</option>
              <option>Running</option>
              <option>Cycling</option>
              <option>Other</option>
            </select>

            <textarea
              rows={5}
              placeholder="Tell us about your goals..."
              className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:border-orange-500 outline-none"
            />

            <Button>
              Book Assessment
            </Button>

          </form>

        </div>

      </Container>
    </section>
  );
}