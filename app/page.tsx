import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-orange-500">
          Sports Science India
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Prevent Injury. Prolong Career.
        </p>

        <button className="mt-10 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full text-lg font-semibold">
          Coming Soon 🚀
        </button>
      </main>
    </>
  );
}