import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import BlurText from "../ui/BlurText";
import ElectricBorder from "../ui/ElectricBorder";

const socials = [
  {
    name: "GitHub",
    borderColor: "cyan-400",
    icon: <FaGithub className="text-2xl" />,
    link: "https://github.com/b-balakrishna",
    hover: "hover:border-cyan-400 hover:bg-white/5",
  },
  {
    name: "LinkedIn",
    borderColor: "blue-500",
    icon: <FaLinkedin className="text-2xl text-blue-500" />,
    link: "https://www.linkedin.com/in/balakrishna-bbk/",
    hover: "hover:border-blue-500 hover:bg-white/5",
  },
  {
    name: "LeetCode",
    borderColor: "yellow-400",
    icon: <SiLeetcode className="text-2xl text-yellow-400" />,
    link: "https://leetcode.com/u/balakrishna_battula/",
    hover: "hover:border-yellow-400 hover:bg-white/5",
  },
];

const Links = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center gap-10 my-6">
      <BlurText
        text="Connect With Me"
        className="text-3xl md:text-4xl font-bold text-center text-white"
      />

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {socials.map(({ name, icon, link, hover, borderColor }, index) => (
          <ElectricBorder key={index} color={borderColor}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border border-white/20 transition-all ${hover}`}
            >
              {icon}
              <span className="text-lg">{name}</span>
            </a>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
};

export default Links;
