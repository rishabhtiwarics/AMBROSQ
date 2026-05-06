import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FragranceExcellence from '../components/home/FragranceExcellence';
import ServiceHighlights from '../components/home/ServiceHighlights';
import ProductShowcase from '../components/home/ProductShowcase';
import BannerSection from '../components/home/BannerSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SocialSection from '../components/home/SocialSection';

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero with Video */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Section 3: Brand Excellence (Icon Columns) */}
      <FragranceExcellence />

      {/* Section 4: Service Highlights (USP Section) */}
      <ServiceHighlights />

      {/* New Product Showcase Section */}
      <ProductShowcase />

      {/* Section 5: Banner Slide */}
      <BannerSection />

      {/* Section 5: Featured 2x6 Grid */}
      <FeaturedProducts />
      
      {/* Section 6: Instagram Social Gallery */}
      <SocialSection />
    </>
  );
}
