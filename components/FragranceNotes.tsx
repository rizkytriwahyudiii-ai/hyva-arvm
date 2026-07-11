export default function FragranceNotes() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-[11px] uppercase tracking-[0.4em] text-gray-500">
            Fragrance Notes
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif">
            The Language Of Scent
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="border p-10 text-center">
            <div className="text-5xl mb-6">🍋</div>

            <h3 className="text-xl font-semibold mb-4">
              Top Notes
            </h3>

            <p className="text-gray-600">
              Citrus, Fruity, Fresh
            </p>
          </div>

          <div className="border p-10 text-center">
            <div className="text-5xl mb-6">🌹</div>

            <h3 className="text-xl font-semibold mb-4">
              Heart Notes
            </h3>

            <p className="text-gray-600">
              Floral, Jasmine, Rose
            </p>
          </div>

          <div className="border p-10 text-center">
            <div className="text-5xl mb-6">🌲</div>

            <h3 className="text-xl font-semibold mb-4">
              Base Notes
            </h3>

            <p className="text-gray-600">
              Musk, Amber, Woody
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}