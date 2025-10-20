export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center h-[90vh]">
      <div className="space-y-10">
        <h1 className="text-[3.5rem] md:text-[5rem] font-light text-gray-900 leading-tight">
          Creative Technologist <br /> & Designer
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
          Exploring how humans interact with machines — emotionally, socially, and physically. <br />
          I merge design, technology, and materials to craft meaningful experiences.
        </p>

        <div className="flex justify-center space-x-6 mt-10">
          <a
            href="#projects"
            className="px-8 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="/assets/home/CORENTIN CHANTEREAU.pdf"
            download
            className="px-8 py-3 border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
