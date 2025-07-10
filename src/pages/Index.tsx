import { useEffect, useState, useCallback, useMemo, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  Phone,
  Instagram,
  Linkedin,
  Star,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  MapPin,
  Calendar,
  Eye,
  Sparkles,
  Home,
  Building2,
  Users,
} from "lucide-react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyFilter } from "@/components/PropertyFilter";
import { VideoLoadingState, PropertyCardSkeleton, MobileOptimizedLoader } from "@/components/LoadingStates";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load components for better performance
const LazyPropertyGallery = lazy(() => import("@/components/PropertyGallery").then(module => ({ default: module.PropertyGallery })));

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const isMobile = useIsMobile();

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!window.requestAnimationFrame) return;
    
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      
      // Enhanced parallax with performance optimization
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      parallaxElements.forEach((el) => {
        const speed = isMobile ? 0.3 : 0.5; // Reduced parallax on mobile
        const yPos = -(window.scrollY * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    });
  }, [isMobile]);

  // Intersection Observer for animations
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, []);

  const staggerObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const staggerElements = entry.target.querySelectorAll('.reveal-stagger');
        staggerElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("active");
          }, index * 100); // Staggered animation
        });
      }
    });
  }, []);

  useEffect(() => {
    // Optimized scroll listener
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Intersection observers with improved options
    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1, 
      rootMargin: isMobile ? "30px" : "50px" 
    });

    const staggerObserver = new IntersectionObserver(staggerObserverCallback, { 
      threshold: 0.1,
      rootMargin: isMobile ? "20px" : "30px"
    });

    // Observe elements
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.querySelectorAll(".stagger-container").forEach((el) => staggerObserver.observe(el));
    
    // Optimized loading simulation
    const loadingTimer = setTimeout(() => setIsLoading(false), isMobile ? 800 : 1200);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      observer.disconnect();
      staggerObserver.disconnect();
      clearTimeout(loadingTimer);
    };
  }, [handleScroll, observerCallback, staggerObserverCallback, isMobile]);

  // Performance optimized scroll function
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 60 : 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, [isMobile]);

  const t = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);

  const navItems = useMemo(() => [
    { label: t("Properties", "العقارات"), id: "properties" },
    { label: t("About", "حول"), id: "about" },
    { label: t("Dubai", "لماذا دبي"), id: "dubai" },
    { label: t("Contact", "اتصل بنا"), id: "contact" },
  ], [t]);

  const propertyImages = useMemo(() => [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&q=80",
  ], []);

  const properties = useMemo(() => [
    {
      title: t("Marina Collection", "مجموعة المارينا"),
      area: t("Dubai Marina", "دبي مارينا"),
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&q=80",
      price: t("From AED 2.5M", "من 2.5 مليون درهم"),
      features: [
        t("Waterfront Views", "إطلالات على الواجهة البحرية"),
        t("Premium Finishes", "تشطيبات فاخرة"),
        t("World-Class Amenities", "وسائل راحة عالمية")
      ],
      gallery: propertyImages,
      status: t("Coming Soon", "قريباً"),
      roi: "8.2%"
    },
    {
      title: t("Downtown Residences", "شقق وسط المدينة"),
      area: t("Downtown Dubai", "وسط مدينة دبي"),
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80",
      price: t("From AED 1.8M", "من 1.8 مليون درهم"),
      features: [
        t("City Skyline", "أفق المدينة"),
        t("Prime Location", "موقع متميز"),
        t("Investment Grade", "فرصة استثمارية")
      ],
      gallery: propertyImages,
      status: t("Pre-Launch", "ما قبل الإطلاق"),
      roi: "9.1%"
    },
    {
      title: t("Emirates Collection", "مجموعة الإمارات"),
      area: t("Emirates Hills", "تلال الإمارات"),
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&q=80",
      price: t("From AED 4.2M", "من 4.2 مليون درهم"),
      features: [
        t("Golf Course Views", "إطلالات على ملاعب الغولف"),
        t("Private Gardens", "حدائق خاصة"),
        t("Exclusive Community", "مجتمع حصري")
      ],
      gallery: propertyImages,
      status: t("Exclusive", "حصري"),
      roi: "7.8%"
    }
  ], [t, propertyImages]);

  // Initialize filtered properties
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const openGallery = useCallback((property: any) => {
    setSelectedProperty(property);
    setGalleryOpen(true);
  }, []);

  const handleFilterChange = useCallback((filters: any) => {
    // Filter logic implementation
    let filtered = properties;
    
    if (filters.search) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.area.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.area.includes(filters.location)
      );
    }
    
    setFilteredProperties(filtered);
  }, [properties]);

  // Show loading screen
  if (isLoading) {
    return <MobileOptimizedLoader />;
  }

  return (
    <div className={`min-h-screen ${lang === "ar" ? "rtl text-right" : ""} gpu-layer`}>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl">
          <div className="text-xl sm:text-2xl font-serif font-light text-slate-900 tracking-wide hover-scale-subtle cursor-pointer">
            <span className="text-gradient-gold">Moon</span>scape
          </div>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link-premium reveal-stagger text-sm md:text-base`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="hidden md:flex text-sm font-medium hover-scale-subtle px-3 py-2"
            >
              {lang === "en" ? "العربية" : "English"}
            </Button>
            
            <MobileNavigation
              navItems={navItems}
              lang={lang}
              onLanguageToggle={() => setLang(lang === "en" ? "ar" : "en")}
              onNavClick={scrollToSection}
            />
          </div>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {!videoLoaded && <VideoLoadingState />}
        
        <video
          className="absolute inset-0 w-full h-full object-cover parallax-slow"
          autoPlay
          loop
          muted
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&h=1080&fit=crop&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/8359173/8359173-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="text-center z-10 px-4 sm:px-6 max-w-6xl">
          <div className="reveal fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-6 sm:mb-8 text-white leading-[1.1] tracking-tight">
              {t("Luxury Living in the", "العيش الفاخر في")} <br />
              <span className="text-gradient-gold inline-block float-animation">
                {t("Heart of Dubai", "قلب دبي")}
              </span>
            </h1>
          </div>
          
          <div className="reveal slide-in-left" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 sm:mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              {t(
                "Where architectural excellence meets unparalleled lifestyle",
                "حيث يلتقي التميز المعماري بأسلوب الحياة الذي لا مثيل له"
              )}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center reveal zoom-in-subtle" style={{ animationDelay: '0.6s' }}>
            <Button
              className="btn-premium group w-full sm:w-auto min-h-[48px] px-6 sm:px-8"
              onClick={() => scrollToSection("properties")}
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {t("Explore Properties", "استكشف العقارات")}
            </Button>
            
            <Button
              variant="outline"
              className="btn-secondary-premium group w-full sm:w-auto min-h-[48px] px-6 sm:px-8"
              onClick={() => scrollToSection("contact")}
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {t("Schedule Viewing", "حدد موعد المعاينة")}
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-slate-900">
              {t("Trusted Excellence", "التميز الموثوق")}
            </h2>
            <div className="section-divider w-24 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 stagger-container">
            {[
              { 
                icon: Award, 
                label: t("Industry Recognition", "الاعتراف الصناعي"), 
                desc: t("Award-winning developments", "مشاريع حائزة على جوائز"), 
                color: "text-amber-600",
                metric: "15+",
                subtext: t("Awards", "جوائز")
              },
              { 
                icon: Shield, 
                label: t("RERA Licensed", "مرخص من قبل RERA"), 
                desc: t("Fully regulated & compliant", "متوافق ومنظم بالكامل"), 
                color: "text-blue-600",
                metric: "100%",
                subtext: t("Compliant", "متوافق")
              },
              { 
                icon: Star, 
                label: t("Client Excellence", "تميز العملاء"), 
                desc: t("5-star service standards", "معايير خدمة 5 نجوم"), 
                color: "text-emerald-600",
                metric: "4.9★",
                subtext: t("Rating", "تقييم")
              },
              { 
                icon: TrendingUp, 
                label: t("Market Leadership", "الريادة السوقية"), 
                desc: t("Proven track record", "سجل حافل بالإنجازات"), 
                color: "text-purple-600",
                metric: "2024",
                subtext: t("Since", "منذ")
              }
            ].map((item, index) => (
              <div key={index} className="text-center group hover-lift-premium reveal-stagger card-premium p-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300 ${item.color}`}>
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <div className={`text-2xl font-bold ${item.color} mb-2`}>{item.metric}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">{item.subtext}</div>
                <h4 className="font-serif font-medium text-slate-900 mb-3 text-lg tracking-wide">
                  {item.label}
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="properties" className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-24 reveal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 tracking-tight">
              {t("Exceptional Properties", "عقارات استثنائية")}
            </h2>
            <div className="section-divider w-24 sm:w-32 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("Curated collection of Dubai's most prestigious addresses", "مجموعة مختارة من أرقى العناوين في دبي")}
            </p>
          </div>

          <div className="mb-8 sm:mb-12 reveal">
            <PropertyFilter 
              onFilterChange={handleFilterChange}
              className="max-w-4xl mx-auto"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 stagger-container">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : (
              filteredProperties.map((property, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 reveal-stagger card-premium bg-white">
                  <div className="relative h-60 sm:h-64 md:h-80 overflow-hidden image-premium">
                    <img
                      src={property.image}
                      alt={`${property.title} - ${property.area}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                      <span className="bg-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium pulse-glow">
                        {property.status}
                      </span>
                      <span className="bg-emerald-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {property.roi} ROI
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => openGallery(property)}
                          className="bg-white/95 text-slate-900 hover:bg-white backdrop-blur-md hover-scale-subtle text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {t("Gallery", "معرض")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                      <span className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
                        {property.area}
                      </span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium mb-2 sm:mb-3 text-slate-900 tracking-tight hover:text-amber-600 transition-colors duration-300">
                      {property.title}
                    </h3>
                    
                    <p className="text-xl sm:text-2xl font-bold text-gradient-gold mb-4 sm:mb-6">
                      {property.price}
                    </p>
                    
                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {property.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center text-xs sm:text-sm group/feature">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mr-2 sm:mr-3 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 sm:gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 font-medium tracking-wide hover:bg-slate-50 transition-colors duration-200 hover-scale-subtle text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3"
                        onClick={() => scrollToSection("contact")}
                      >
                        {t("Schedule Viewing", "حدد موعد المعاينة")}
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => openGallery(property)}
                        className="px-2 sm:px-3 hover-scale-subtle"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="about" className="py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            <div className="reveal slide-in-left">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-slate-900 tracking-tight leading-[1.1]">
                {t("Visionary", "رؤيوي")}<br />
                <span className="text-gradient-gold">{t("Real Estate", "العقارات")}</span>
              </h2>
              
              <div className="section-divider w-16 mb-8"></div>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                {t(
                  "We specialize in connecting discerning clients with Dubai's most exceptional properties, delivering personalized service and unparalleled market expertise.",
                  "نحن متخصصون في ربط العملاء المميزين بأرقى العقارات في دبي، مع تقديم خدمة شخصية وخبرة سوق لا مثيل لها."
                )}
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-12 stagger-container">
                {[
                  { icon: Home, metric: "500+", label: t("Properties", "عقارات") },
                  { icon: Building2, metric: "50+", label: t("Projects", "مشاريع") },
                  { icon: Users, metric: "1000+", label: t("Clients", "عملاء") }
                ].map((stat, index) => (
                  <div key={index} className="text-center reveal-stagger">
                    <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.metric}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button className="btn-premium group">
                <Award className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {t("Our Story", "قصتنا")}
              </Button>
            </div>
            
            <div className="relative reveal slide-in-right">
              <div className="relative overflow-hidden rounded-2xl image-premium">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop&q=80"
                  alt="Modern Dubai architecture"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl opacity-20 float-animation"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="dubai" className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              {t("Why Dubai", "لماذا دبي")}
            </h2>
            <div className="section-divider w-32 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                "A global destination offering unmatched investment returns and lifestyle opportunities",
                "وجهة عالمية تقدم عوائد استثمارية لا مثيل لها وفرص نمط حياة استثنائية"
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
            {[
              { 
                stat: "0%", 
                label: t("Capital Gains Tax", "ضريبة الأرباح"), 
                desc: t("Tax-free environment for property investments", "بيئة خالية من الضرائب للاستثمار العقاري"), 
                color: "text-emerald-600",
                bgColor: "from-emerald-50 to-emerald-100"
              },
              { 
                stat: "6–10%", 
                label: t("Annual Yields", "عوائد سنوية"), 
                desc: t("Strong rental returns across prime locations", "عوائد إيجارية قوية في مواقع متميزة"), 
                color: "text-blue-600",
                bgColor: "from-blue-50 to-blue-100"
              },
              { 
                stat: t("Global", "عالمية"), 
                label: t("Connectivity", "الربط العالمي"), 
                desc: t("Strategic location connecting major markets", "موقع استراتيجي يربط بين الأسواق الكبرى"), 
                color: "text-purple-600",
                bgColor: "from-purple-50 to-purple-100"
              },
              { 
                stat: t("Stable", "مستقرة"), 
                label: t("Economy", "اقتصاد"), 
                desc: t("Robust foundation with continuous growth", "أساس قوي ونمو مستمر"), 
                color: "text-amber-600",
                bgColor: "from-amber-50 to-amber-100"
              },
              { 
                stat: "200+", 
                label: t("Nationalities", "جنسيات"), 
                desc: t("Truly international business environment", "بيئة أعمال دولية بحق"), 
                color: "text-rose-600",
                bgColor: "from-rose-50 to-rose-100"
              },
              { 
                stat: "2030", 
                label: t("Vision", "رؤية"), 
                desc: t("Ambitious development goals and infrastructure", "أهداف تنموية طموحة وبنية تحتية متميزة"), 
                color: "text-indigo-600",
                bgColor: "from-indigo-50 to-indigo-100"
              }
            ].map((item, index) => (
              <Card key={index} className={`p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift-premium reveal-stagger card-premium bg-gradient-to-br ${item.bgColor}`}>
                <CardContent className="p-0">
                  <div className={`text-4xl font-serif font-light mb-4 ${item.color} tracking-tight`}>
                    {item.stat}
                  </div>
                  <h4 className="font-medium mb-4 text-slate-900 text-lg tracking-wide">{item.label}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              {t("Get In Touch", "تواصل معنا")}
            </h2>
            <div className="section-divider w-32 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("Connect with our team to explore Dubai's premier real estate opportunities", "تواصل مع فريقنا لاكتشاف أفضل فرص العقارات في دبي")}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl reveal hover-lift-premium">
            <CardContent className="p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-slate-900 font-medium text-base tracking-wide">{t("Name", "الاسم")} *</label>
                    <Input 
                      id="name" 
                      className="input-premium" 
                      placeholder={t("Your name", "اسمك")} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-slate-900 font-medium text-base tracking-wide">{t("Email", "البريد الإلكتروني")} *</label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="input-premium" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-slate-900 font-medium text-base tracking-wide">{t("Phone", "رقم الهاتف")}</label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      className="input-premium" 
                      placeholder="+971 XX XXX XXXX" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-slate-900 font-medium text-base tracking-wide">{t("Interest", "الاهتمام")}</label>
                    <Select>
                      <SelectTrigger className="input-premium">
                        <SelectValue placeholder={t("Select your interest", "اختر اهتمامك")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl">
                        <SelectItem value="buy">{t("Buying Property", "شراء عقار")}</SelectItem>
                        <SelectItem value="invest">{t("Investment Opportunities", "فرص استثمارية")}</SelectItem>
                        <SelectItem value="sell">{t("Selling Property", "بيع عقار")}</SelectItem>
                        <SelectItem value="consult">{t("General Consultation", "استشارة عامة")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-slate-900 font-medium text-base tracking-wide">{t("Message", "رسالة")}</label>
                  <Textarea 
                    id="message" 
                    className="input-premium min-h-36" 
                    placeholder={t("Tell us about your requirements...", "أخبرنا عن متطلباتك...")} 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-premium group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {t("Send Message", "إرسال الرسالة")}
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-600 mb-6 text-base">
                  {t("Prefer to call? Speak with our team directly", "تفضل الاتصال؟ تحدث مباشرة مع فريقنا")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="tel:+971-4-XXX-XXXX" 
                    className="text-slate-900 font-semibold hover:text-amber-600 transition-colors duration-300 text-lg group flex items-center"
                  >
                    <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    +971 4 XXX XXXX
                  </a>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <span className="text-slate-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("Available 9 AM - 6 PM GST", "متاح من 9 صباحًا إلى 6 مساءً بتوقيت الخليج")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-serif font-light mb-6 tracking-tight">
                <span className="text-gradient-gold">Moon</span>scape
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed text-lg max-w-md">
                {t("Your gateway to Dubai's most prestigious properties and investment opportunities.", "بوابتك إلى أرقى العقارات وفرص الاستثمار في دبي.")}
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover-glow"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg tracking-wide">{t("Properties", "العقارات")}</h4>
              <ul className="space-y-4 text-white/70">
                {[
                  { en: "Apartments", ar: "شقق" },
                  { en: "Villas", ar: "فيلل" },
                  { en: "Penthouses", ar: "بنتهاوس" },
                  { en: "Commercial", ar: "تجاري" },
                  { en: "Off-Plan", ar: "على الخارطة" },
                  { en: "Investment", ar: "استثمار" }
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block nav-link-premium">
                      {t(item.en, item.ar)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg tracking-wide">{t("Company", "الشركة")}</h4>
              <ul className="space-y-4 text-white/70">
                {[
                  { en: "About Us", ar: "من نحن" },
                  { en: "Our Team", ar: "فريقنا" },
                  { en: "Careers", ar: "الوظائف" },
                  { en: "News", ar: "الأخبار" },
                  { en: "Contact", ar: "اتصل بنا" },
                  { en: "Legal", ar: "قانوني" }
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block nav-link-premium">
                      {t(item.en, item.ar)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="section-divider opacity-20 mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-white/60">
              <p className="text-base">© 2024 Moonscape Real Estate. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
              <p className="text-sm text-white/50 mt-1 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {t("RERA Licensed | Dubai, United Arab Emirates", "مرخص من RERA | دبي، الإمارات العربية المتحدة")}
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { en: "Privacy", ar: "الخصوصية" },
                { en: "Terms", ar: "الشروط" },
                { en: "Cookies", ar: "ملفات تعريف الارتباط" }
              ].map((link, index) => (
                <a key={index} href="#" className="text-white/60 hover:text-white transition-colors duration-300 nav-link-premium">
                  {t(link.en, link.ar)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Property Gallery Modal with Suspense */}
      {selectedProperty && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
          <LazyPropertyGallery
            images={selectedProperty.gallery}
            title={selectedProperty.title}
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
