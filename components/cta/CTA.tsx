import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="bg-orange-500 py-24">
      <Container>
        <div className="text-center max-w-4xl mx-auto">

          <h2 className="text-5xl font-bold text-black">
            Ready to Elevate Your Performance?
          </h2>

          <p className="text-black/80 text-xl mt-8 leading-8">
            Book your comprehensive sports science assessment today and
            unlock your true athletic potential.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">

            <Button variant="dark">
                Book Assessment →
            </Button>

            <button className="px-8 py-4 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300">
              Contact Us
            </button>

          </div>

        </div>
      </Container>
    </section>
  );
}