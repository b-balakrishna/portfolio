import BlurText from "../ui/BlurText";
import LogoLoop from "../ui/LogoLoop";
import ScrollReveal from "../ui/ScrollReveal";
import Timeline from "../ui/Timeline";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiRedis,
  SiApachekafka,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiVite,
  SiShadcnui,
  SiMui,
  SiRedux,
} from "react-icons/si";
import { FaAws, FaJava, FaNode } from "react-icons/fa";

const Experience = () => {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    { node: <FaNode />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiExpress />, title: "Express", href: "https://expressjs.com" },
    { node: <FaJava />, title: "Java", href: "https://www.java.com" },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiRedis />, title: "Redis", href: "https://redis.io" },
    { node: <FaAws />, title: "AWS", href: "https://aws.amazon.com" },
    {
      node: <SiApachekafka />,
      title: "Apache Kafka",
      href: "https://kafka.apache.org",
    },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    // { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiVite />, title: "Vite", href: "https://vite.dev" },
    {
      node: <SiShadcnui />,
      title: "ShadCN UI",
      href: "https://ui.shadcn.com/",
    },
    { node: <SiMui />, title: "MUI", href: "https://mui.com" },
    { node: <SiRedux />, title: "Redux", href: "https://redux.js.org" },
  ];
  return (
    <div>
      <ScrollReveal>
        <BlurText
          text="Experience"
          className="text-4xl md:text-6xl font-bold text-white text-center mt-12 px-24 mx-auto mb-6"
        />
      </ScrollReveal>
      <Timeline />
      <ScrollReveal>
        <div>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Technology partners"
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Experience;
