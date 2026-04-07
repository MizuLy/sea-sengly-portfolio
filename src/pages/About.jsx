import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPhp,
  DiBootstrap,
  DiLaravel,
  DiGithubBadge,
  DiGit,
  DiJava,
  DiMongodb,
  DiMysql,
} from "react-icons/di";
import { SiVuedotjs, SiTailwindcss, SiExpress, SiSqlite } from "react-icons/si";

const stacks = [
  {
    category: "Frontend",
    items: [
      { icon: <DiHtml5 />, name: "HTML" },
      { icon: <DiCss3 />, name: "CSS" },
      { icon: <DiJavascript1 />, name: "JS" }, // Shortened for cleaner UI
      { icon: <SiVuedotjs />, name: "Vue.js" },
      { icon: <DiReact />, name: "React" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
    ],
  },
  {
    category: "Backend & DB", // Combined to save vertical space
    items: [
      { icon: <DiNodejs />, name: "Node.js" },
      { icon: <SiExpress />, name: "Express" },
      { icon: <DiJava />, name: "Java" },
      { icon: <DiLaravel />, name: "Laravel" },
      { icon: <DiMongodb />, name: "MongoDB" },
      { icon: <DiMysql />, name: "MySQL" },
    ],
  },
  {
    category: "Utility",
    items: [
      { icon: <DiGithubBadge />, name: "Github" },
      { icon: <DiGit />, name: "Git" },
    ],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center pt-24 pb-12 bg-black text-white"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />

      <div className="max-w-3xl w-full px-6 z-10">
        {/* Intro Section - Fades up as a whole */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-5xl font-light tracking-tighter mb-6">
            About <span className="font-serif italic text-zinc-400">Me</span>
          </h1>
          <p className="text-gray-400 leading-relaxed text-lg max-w-xl mx-auto">
            A fullstack developer focused on building end-to-end digital
            experiences. Blending technical logic with refined aesthetics.
          </p>
        </div>

        {/* Fading Separator - Expands from center */}
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-16"
          data-aos="zoom-in"
          data-aos-delay="200"
        />

        {/* Skills Section */}
        <div className="space-y-12">
          <h3
            className="text-xs uppercase tracking-[0.3em] text-zinc-500 text-center font-semibold"
            data-aos="fade-up"
          >
            Technical Foundation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stacks.map((group, groupIndex) => (
              <div
                key={group.category}
                className="flex flex-col items-center md:items-start"
                // Stagger each category column
                data-aos="fade-up"
                data-aos-delay={groupIndex * 150}
              >
                <h4 className="text-sm font-medium text-zinc-300 mb-6 border-b border-zinc-800 pb-2 w-full text-center md:text-left">
                  {group.category}
                </h4>

                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  {group.items.map((s, itemIndex) => (
                    <div
                      key={s.name}
                      className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
                      // Optional: deeper stagger for every single icon
                      data-aos="fade-in"
                      data-aos-delay={groupIndex * 100 + itemIndex * 50}
                    >
                      <span className="text-3xl text-zinc-500 group-hover:text-white transition-colors">
                        {s.icon}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-900 to-transparent" />
    </section>
  );
}
