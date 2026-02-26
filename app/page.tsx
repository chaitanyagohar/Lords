import HeroSection from './components/HeroSection';
import BrandMarquee from './components/BrandMarquee';
import ServicesGrid from './components/ServicesGrid';
import GuidingPrinciples from './components/GuidingPrinciples';
import FeaturedProperties from './components/FeaturedProperties';
import NRIServices from './components/NRIServices';
import KeyFigures from './components/KeyFigures';
import Testimonials from './components/Testimonials';
import KnowledgePill from './components/KnowledgePill';
import BlogSection from './components/BlogSection';
import TrustExpertiseSection from './components/TrustExpertiseSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <BrandMarquee />
      <FeaturedProperties />
      <NRIServices />
      <KeyFigures />
      <GuidingPrinciples />
      <Testimonials />
      <KnowledgePill />
      <BlogSection />
      <TrustExpertiseSection />
    </main>
  );
}