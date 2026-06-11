import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/features/contact/contact";
import { Dashboard } from "@/features/dashboard/dashboard";
import { Experience } from "@/features/experience/experience";
import { Hero } from "@/features/hero/hero";
import { Philosophy } from "@/features/philosophy/philosophy";
import { Projects } from "@/features/projects/projects";
import { Skills } from "@/features/skills/skills";
import { SystemDesign } from "@/features/system-design/system-design";
import { Writing } from "@/features/writing/writing";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <SystemDesign />
        <Skills />
        <Philosophy />
        <Writing />
        <Dashboard />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
