import { useState, useEffect, lazy, Suspense } from "react";
import { Search, ArrowDown, Play, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/MobileNavigation";
import { PropertyFilter } from "@/components/PropertyFilter";
import { PropertyGallery } from "@/components/PropertyGallery";
import { VideoLoadingState, PropertyCardSkeleton, PropertySearchLoader } from "@/components/LoadingStates";
import { BookingCalendar } from "@/components/BookingCalendar";
import { InvestmentDashboard } from "@/components/InvestmentDashboard";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

// Lazy load heavy components for better performance
const FAQ = lazy(() => import("@/components/FAQ"));

const Index = () => {
  // State variables for language, video loading, active section, gallery, search, booking, and investment
  const [currentLang, setCurrentLang] = useState<"en" | "ar">("en");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages] = useState([
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop"
  ]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);

  const navItems = [
    { label: currentLang === "en" ? "Home" : "الرئيسية", id: "home" },
    { label: currentLang === "en" ? "Properties" : "العقارات", id: "properties" },
    { label: currentLang === "en" ? "Investment" : "الاستثمار", id: "investment" },
    { label: currentLang === "en" ? "Services" : "الخدمات", id: "services" },
    { label: currentLang === "en" ? "About" : "من نحن", id: "about" },
    { label: currentLang === "en" ? "Contact" : "اتصل بنا", id: "contact" }
  ];

  // Handlers for language toggle, section scrolling, search, property filtering, and booking
  const toggleLanguage = () => {
    setCurrentLang(prev => prev === "en" ? "ar" : "en");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSearchResults([]);
    setIsSearching(false);
  };

  const handlePropertyFilter = (filters: any) => {
    console.log('Filtering properties:', filters);
  };

  const handleBooking = (bookingData: any) => {
    console.log('Booking scheduled:', bookingData);
    alert('Viewing scheduled successfully! We will contact you shortly.');
  };

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Add manifest link
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest.json';
    document.head.appendChild(link);

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      {/* Enhanced Header with Mobile Optimization */}
      <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <div className="text-2xl md:text-3xl font-serif font-light text-slate-900 tracking-wide">
                <span className="text-gradient-gold">Moon</span>scape
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`font-medium transition-all duration-300 hover:text-amber-600 relative group ${
                      activeSection === item.id ? 'text-amber-600' : 'text-slate-700'
                    }`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="text-slate-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-xl transition-all duration-300"
              >
                {currentLang === "en" ? "العربية" : "English"}
              </Button>
              
              <Button
                onClick={() => setShowBooking(!showBooking)}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {currentLang === "en" ? "Book Viewing" : "احجز موعد"}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation
              navItems={navItems}
              lang={currentLang}
              onLanguageToggle={toggleLanguage}
              onNavClick={scrollToSection}
            />
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Premium Video Background */}
        <div className="absolute inset-0 z-0">
          {!videoLoaded && <VideoLoadingState />}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-[20s]"
            poster="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1920&h=1080&fit=crop"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/lovable-uploads/moonscapere.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white leading-tight tracking-wide">
              <span className="block mb-2">
                {currentLang === "en" ? "Luxury" : "الفخامة"}
              </span>
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Redefined" : "معاد تعريفها"}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
              {currentLang === "en" 
                ? "Discover Dubai's most exclusive properties where architectural brilliance meets unparalleled luxury"
                : "اكتشف أكثر العقارات حصرية في دبي حيث تلتقي العبقرية المعمارية بالفخامة المتناهية"
              }
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-slate-400 ml-4 flex-shrink-0" />
                  <Input
                    placeholder={currentLang === "en" ? "Search luxury properties..." : "البحث في العقارات الفاخرة..."}
                    className="flex-1 border-none bg-transparent text-lg placeholder:text-slate-400 focus:ring-0 px-4 py-4"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.currentTarget.value)}
                  />
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    onClick={() => handleSearch('')}
                  >
                    {currentLang === "en" ? "Explore" : "استكشف"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button 
                onClick={() => setGalleryOpen(true)}
                className="group bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-medium transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-95 min-h-[56px]"
              >
                <Play className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                {currentLang === "en" ? "Virtual Tour" : "جولة افتراضية"}
              </Button>
              
              <Button
                onClick={() => scrollToSection('properties')}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-95 min-h-[56px]"
              >
                {currentLang === "en" ? "View Properties" : "عرض العقارات"}
                <ArrowDown className="w-5 h-5 ml-3 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Properties Section */}
      <section id="properties" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6 leading-tight">
              {currentLang === "en" ? "Featured " : "العقارات "}
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Properties" : "المختارة"}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === "en" 
                ? "Handpicked selection of Dubai's most prestigious addresses"
                : "مجموعة مختارة بعناية من أرقى العناوين في دبي"
              }
            </p>
          </div>

          {/* Property Filter */}
          <PropertyFilter onFilterChange={handlePropertyFilter} className="mb-12" />

          {/* Property Grid */}
          {isSearching ? (
            <PropertySearchLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Investment Dashboard Section */}
      <section id="investment" className="py-20 md:py-32 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6 leading-tight">
              {currentLang === "en" ? "Investment " : "أدوات "}
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Tools" : "الاستثمار"}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === "en" 
                ? "Calculate returns and analyze market trends for informed investment decisions"
                : "احسب العوائد وحلل اتجاهات السوق لاتخاذ قرارات استثمارية مدروسة"
              }
            </p>
          </div>

          <InvestmentDashboard />
        </div>
      </section>

      {/* Booking Section */}
      {showBooking && (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingCalendar onBooking={handleBooking} />
          </div>
        </section>
      )}

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6 leading-tight">
              {currentLang === "en" ? "Our " : "خدماتنا "}
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Services" : "الرئيسية"}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === "en"
                ? "Comprehensive real estate solutions tailored to your needs"
                : "حلول عقارية شاملة مصممة خصيصًا لتلبية احتياجاتك"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Example Service Card */}
            <div className="premium-card">
              <div className="p-6 space-y-4">
                <div className="text-2xl font-semibold text-slate-900">Property Management</div>
                <p className="text-slate-600">
                  {currentLang === "en"
                    ? "Hassle-free management of your property portfolio"
                    : "إدارة خالية من المتاعب لمحفظة الممتلكات الخاصة بك"
                  }
                </p>
                <Button className="btn-primary">Learn More</Button>
              </div>
            </div>

            {/* Example Service Card */}
            <div className="premium-card">
              <div className="p-6 space-y-4">
                <div className="text-2xl font-semibold text-slate-900">Investment Consulting</div>
                <p className="text-slate-600">
                  {currentLang === "en"
                    ? "Expert advice on maximizing your real estate investments"
                    : "نصائح الخبراء حول زيادة استثماراتك العقارية"
                  }
                </p>
                <Button className="btn-primary">Explore</Button>
              </div>
            </div>

            {/* Example Service Card */}
            <div className="premium-card">
              <div className="p-6 space-y-4">
                <div className="text-2xl font-semibold text-slate-900">Property Valuation</div>
                <p className="text-slate-600">
                  {currentLang === "en"
                    ? "Accurate and reliable property valuation services"
                    : "خدمات تقييم العقارات دقيقة وموثوقة"
                  }
                </p>
                <Button className="btn-primary">Get Valuation</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6 leading-tight">
              {currentLang === "en" ? "About " : "من "}
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Us" : "نحن"}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === "en"
                ? "Our mission is to redefine luxury real estate in Dubai"
                : "مهمتنا هي إعادة تعريف العقارات الفاخرة في دبي"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* About Content */}
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed">
                {currentLang === "en"
                  ? "At Moonscape, we believe in providing unparalleled service and exclusive properties to our clients. With years of experience in the Dubai real estate market, we have the expertise to guide you through every step of your property journey."
                  : "في مونسكيب، نؤمن بتقديم خدمة لا مثيل لها وعقارات حصرية لعملائنا. مع سنوات من الخبرة في سوق العقارات في دبي، لدينا الخبرة اللازمة لإرشادك خلال كل خطوة في رحلة الممتلكات الخاصة بك."
                }
              </p>
              <p className="text-slate-700 leading-relaxed">
                {currentLang === "en"
                  ? "Our team of dedicated professionals is committed to helping you find the perfect property that meets your unique needs and preferences. Whether you are looking for a luxury villa, a penthouse with stunning views, or a commercial property for investment, we are here to assist you."
                  : "فريقنا من المهنيين المتفانين ملتزم بمساعدتك في العثور على العقار المثالي الذي يلبي احتياجاتك وتفضيلاتك الفريدة. سواء كنت تبحث عن فيلا فاخرة أو بنتهاوس مع إطلالات خلابة أو عقار تجاري للاستثمار، فنحن هنا لمساعدتك."
                }
              </p>
            </div>

            {/* About Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1520231367194-33f9eb4e92e1?w=800&h=600&fit=crop"
                alt="About Us"
                className="rounded-2xl shadow-2xl crisp-edges"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6 leading-tight">
              {currentLang === "en" ? "Contact " : "اتصل "}
              <span className="text-gradient-gold font-medium">
                {currentLang === "en" ? "Us" : "بنا"}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === "en"
                ? "Get in touch with our team for any inquiries or assistance"
                : "تواصل مع فريقنا لأية استفسارات أو مساعدة"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <Input placeholder="Your Name" className="form-input" />
              <Input placeholder="Your Email" className="form-input" />
              <Input placeholder="Your Phone" className="form-input" />
              <Button className="btn-primary">Send Message</Button>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed">
                {currentLang === "en"
                  ? "Our team is ready to assist you with any questions or concerns. Feel free to reach out to us using the contact form or the information below."
                  : "فريقنا على استعداد لمساعدتك في أية أسئلة أو مخاوف. لا تتردد في التواصل معنا باستخدام نموذج الاتصال أو المعلومات أدناه."
                }
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">+971 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">info@moonscape.ae</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">Dubai, United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-6">
              <div className="text-3xl font-serif font-light tracking-wide">
                <span className="text-gradient-gold">Moon</span>scape
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentLang === "en" 
                  ? "Redefining luxury real estate in Dubai with unparalleled service and exclusive properties."
                  : "إعادة تعريف العقارات الفاخرة في دبي بخدمة لا مثيل لها وعقارات حصرية."
                }
              </p>
              <div className="flex items-center gap-4">
                
                <span className="text-sm text-slate-400">5.0 Rating</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              {currentLang === "en" 
                ? "© 2024 Moonscape. All rights reserved. Crafted with precision for luxury."
                : "© 2024 مونسكيب. جميع الحقوق محفوظة. مصنوع بدقة من أجل الفخامة."
              }
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Components */}
      <PropertyGallery
        images={galleryImages}
        title="Luxury Property Tour"
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <PWAInstallPrompt />

      {/* Lazy loaded FAQ */}
      <Suspense fallback={<div className="h-96 bg-slate-50"></div>}>
        <FAQ />
      </Suspense>
    </div>
  );
};

export default Index;
