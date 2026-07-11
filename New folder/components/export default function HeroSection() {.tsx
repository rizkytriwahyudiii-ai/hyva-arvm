export default function HeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 mb-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/50"></div> 
      <div className="relative z-10 text-center px-4">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">New Collection</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">Hyva Signature</h1>
        <a 
          href="#products" 
          className="border border-white text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}