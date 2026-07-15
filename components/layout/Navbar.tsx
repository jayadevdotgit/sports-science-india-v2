export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold text-orange-500">
          Sports Science India
        </h1>

        <div className="flex gap-8 text-white font-medium">
          <a href="#" className="hover:text-orange-500">Home</a>
          <a href="#" className="hover:text-orange-500">Services</a>
          <a href="#" className="hover:text-orange-500">About</a>
          <a href="#" className="hover:text-orange-500">Contact</a>
        </div>
      </div>
    </nav>
  );
}