import LandingNav      from "@/features/landing/LandingNav";
import HeroSection     from "@/features/landing/HeroSection";
import DashboardPreview from "@/features/landing/DashboardPreview";
import TechStrip       from "@/features/landing/TechStrip";
import HowItWorks      from "@/features/landing/HowItWorks";
import TrustStats      from "@/features/landing/TrustStats";
import PrivacyCircuit  from "@/features/landing/PrivacyCircuit";
import LandingFooter   from "@/features/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f1a16] overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <DashboardPreview />
      <TechStrip />
      <HowItWorks />
      <TrustStats />
      <PrivacyCircuit />
      <LandingFooter />
    </div>
  );
}
