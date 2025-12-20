import { useState } from "react";
import BlurText from "../ui/BlurText";
import ScrollReveal from "../ui/ScrollReveal";

const ReferMe = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      window.location.href = "mailto:battulabalakrishna063@gmail.com";
      setLoading(false);
    }, 5000);
  };

  return (
    <ScrollReveal>
      <section className="min-h-120 w-full flex flex-col items-center justify-center gap-8 px-4">
        <BlurText
          text="Refer Me"
          className="text-4xl md:text-5xl font-bold text-white text-center"
        />

        <p className="max-w-xl text-center text-lg text-white/70 leading-relaxed">
          I'm actively exploring new opportunities. If you know a company
          looking for full-stack developers skilled in MERN, System Design,
          microservices, and AWS, I’d love a chance!
        </p>

        <button
          onClick={handleClick}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-lg border border-white/20 text-white relative
            hover:bg-white/10 duration-300 active:scale-90 cursor-pointer 
            ${loading ? "opacity-70" : ""}`}
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <span className="loader h-5 w-5 border-t-2 border-white rounded-full animate-spin"></span>
              Sending…
            </span>
          ) : (
            "Refer Me 🙌"
          )}
        </button>
      </section>
    </ScrollReveal>
  );
};

export default ReferMe;
