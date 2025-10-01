import Image from "next/image";
import BlurText from "../../components/BlurText";
import ThemeToggle from "../../components/ThemeToggle";



const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Home() {
  return (
    <main>
      <BlurText
        text="Isn't this so cool?!"
        delay={150}
        animateBy="words"
        direction="top"
        // onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
      />
    </main>
  );
}
