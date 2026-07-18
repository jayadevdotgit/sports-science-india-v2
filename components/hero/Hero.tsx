import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section
    id="home"
     className="min-h-screen bg-black text-white flex items-center pt-24 lg:pt-32">
      <Container>
        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          lg:gap-20
          items-center
          "
        >

          {/* Left Side */}
          <div>
            <p className="text-orange-500 uppercase tracking-[0.25em] mb-4">
              Elite Sports Performance
            </p>

            <h1 className="
                text-3xl
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
                font-extrabold
                leading-[1.05]
               "
            >
               <span className="block text-5xl lg:text-6xl xl:text-7xl">
                Maximize
              </span>

              <span className="block text-orange-500 text-4xl lg:text-5xl xl:text-6xl">
               Performance.
              </span>

              <span className="block text-5xl lg:text-6xl xl:text-7xl">
               Prevent Injuries.
              </span>
            </h1>

            <p className="mt-6 text-gray-400 text-base lg:text-lg leading-8 max-w-md">
              India's first comprehensive Sports Science platform helping
              athletes improve performance, recover faster, and extend careers.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
              className=" w-full max-w-md lg:max-w-xl rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}