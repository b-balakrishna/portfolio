import Experience from "./components/Experience";
import Intro from "./components/Intro";
import Links from "./components/Links";
import ReferMe from "./components/ReferMe";
import LightRays from "./ui/LightRays";

const App = () => {
  return (
    <div>
      <div className="w-screen h-screen fixed bg-[#121212] pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          pulsating={true}
        />
      </div>
      <Intro />
      <Experience />
      {/* <Links />
      <ReferMe /> */}
    </div>
  );
};

export default App;
