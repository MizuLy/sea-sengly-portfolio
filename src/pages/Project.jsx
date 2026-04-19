const projects = [
  {
    title: "Taffy",
    category: "Social Networking Platform",
    image: "/kuku.jpeg",
    tech: ["React", "Tailwind", "MySQL"],
    description: "A minimalist social space focused on clean interaction.",
  },
  {
    title: "Cafe Jor",
    category: "Service Management System",
    image: "/cafejor.png",
    tech: ["React", "Node", "MySQL"],
    description:
      "Streamlined point-of-sale system for modern cafe environments.",
  },
  {
    title: "L'Essence",
    category: "High-Fashion Brand",
    image: "/lessencekh.png",
    tech: ["React", "Tailwind"],
    description:
      "A luxury clothing store that import all high-fashion clothes from popular brands.",
  },
  {
    title: "Mizurage",
    category: "Car Store",
    image: "/huuu.jpeg",
    tech: ["PHP", "MySQL"],
    description: "My final project during freshman year, 2nd semester.",
  },
  {
    title: "KS GROUP",
    category: "Inventory Management System",
    image: "/chill.jpg",
    tech: ["React", "Node", "MySQL"],
    description: "My personal project for my current business.",
  },
];

export default function Project() {
  return (
    <section
      id="project"
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-900 to-transparent" />
      {/* Visual background detail - a very faint vertical line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-zinc-900 -translate-x-1/2 hidden md:block" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Title */}
        <div className="mb-24 text-center md:text-left" data-aos="fade-right">
          <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 font-bold mb-4">
            Creative Portfolio
          </p>
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white">
            Project{" "}
            <span className="font-serif italic text-zinc-500">List</span>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900 rounded-sm mb-8 border border-white/5 group-hover:border-white/10 transition-all duration-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                />

                {/* Tech Stack floating on bottom right */}
                <div className="absolute bottom-6 right-6 flex flex-wrap justify-end gap-2 max-w-[200px]">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[7px] uppercase tracking-widest bg-white text-black px-2 py-1 font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Information */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-3xl font-light tracking-tight text-white group-hover:tracking-normal transition-all duration-500">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                    {project.category}
                  </p>
                </div>

                {/* View Project Action */}
                <a
                  href="#"
                  className="mt-2 text-[10px] uppercase tracking-widest font-bold text-zinc-600 hover:text-white border-b border-zinc-800 hover:border-white pb-1 transition-all"
                >
                  View Case
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-900 to-transparent opacity-50" />
    </section>
  );
}
