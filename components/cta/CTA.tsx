import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="bg-orange-500 py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-black sm:text-5xl">
            Ready to Elevate Your Performance?
          </h2>

          <p className="mt-8 text-xl leading-8 text-black/80">
            Book your comprehensive sports science assessment today and unlock
            your true athletic potential.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
            <a href="#booking" className="inline-flex justify-center">
              <Button variant="dark">Book Assessment →</Button>
            </a>

            <a
              href="#contact"
              className="rounded-full border-2 border-black px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
