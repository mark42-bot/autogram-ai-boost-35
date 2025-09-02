import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/ui/hero-section';
import FeaturesSection from '@/components/ui/features-section';
import TestimonialsSection from '@/components/ui/testimonials-section';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default Home;