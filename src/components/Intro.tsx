import BlurText from "../ui/BlurText";

const Intro = () => {
  const startDate: Date = new Date("2023-01-01");
  const now: Date = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const diffYears = Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 gap-12 text-white z-10">
      {/* Left side: Name & Designation */}
      <div className="flex flex-col items-start md:items-start gap-4">
        <BlurText
          text="Balakrishna Battula"
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
        />

        <BlurText
          text="Software Developer"
          className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-medium"
          direction="bottom"
        />
      </div>

      {/* Right side: Brief */}
      <div className="max-w-lg md:max-w-md text-left">
        <BlurText
          text={`I'm a software developer with ${diffYears}+ years of experience, specializing in building scalable web applications, intuitive user interfaces, and efficient backend services.`}
          className="text-2xl"
          direction="bottom"
          delay={0}
        />
      </div>
    </section>
  );
};

export default Intro;
