import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center pt-32">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>
            <p className="text-orange-500 uppercase tracking-widest mb-4">
              Elite Sports Performance
            </p>

            <h1 className="text-7xl font-extrabold leading-tight">
              Maximize
              <br />
              <span className="text-orange-500">
                Performance.
              </span>
              <br />
              Prevent Injuries.
            </h1>

            <p className="mt-8 text-gray-400 text-xl leading-8 max-w-md">
              India's first comprehensive Sports Science platform helping
              athletes improve performance, recover faster, and extend careers.
            </p>

            <div className="mt-12 flex gap-6">
              <Button>
                Book Assessment →
              </Button>

              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <img
              src="/athlete.jpg"
              alt="Athlete"
              className="w-full max-w-xl rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}