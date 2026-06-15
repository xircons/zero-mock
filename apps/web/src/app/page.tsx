import { HeroSection } from "./_components/sections/HeroSection";
import { FeatureGrid } from "./_components/sections/FeatureGrid";
import { StatisticsSection } from "./_components/sections/StatisticsSection";
import { CenterpieceSection } from "./_components/sections/CenterpieceSection";
import { TestimonialsSection } from "./_components/sections/TestimonialsSection";
import { FaqSection } from "./_components/sections/FaqSection";
import { CliSection } from "./_components/sections/CliSection";
import { FooterSection } from "./_components/sections/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeatureGrid />
      <StatisticsSection />
      <CenterpieceSection />
      <TestimonialsSection />
      <FaqSection />
      <CliSection />
      <FooterSection />
    </div>
  );
}
