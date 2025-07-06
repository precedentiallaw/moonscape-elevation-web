
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { PropertyGallery } from "@/components/PropertyGallery";
import { VideoLoadingState, PropertyCardSkeleton } from "@/components/LoadingStates";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const navItems = [
    { label: t("Properties", "العقارات"), id: "properties" },
    { label: t("About", "حول"), id: "about" },
    { label: t("Dubai", "لماذا دبي"), id: "dubai" },
    { label: t("Contact", "اتصل بنا"), id: "contact" },
  ];

  const propertyImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&q=80",
  ];

  const properties = [
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
      status: t("Coming Soon", "قريباً")
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
      status: t("Pre-Launch", "ما قبل الإطلاق")
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
      status: t("Exclusive", "حصري")
    }
  ];

  const openGallery = (property: any) => {
    setSelectedProperty(property);
    setGalleryOpen(true);
  };

  return (
    <div className={`min-h-screen ${lang === "ar" ? "rtl text-right" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-2xl font-serif font-light text-slate-900 tracking-wide">
            Moonscape
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 hover:text-slate-900 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="hidden md:flex text-sm font-medium"
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {!videoLoaded && <VideoLoadingState />}
        
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&h=1080&fit=crop&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/8359173/8359173-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        
        <div className="text-center z-10 px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-6 text-white leading-[1.1] tracking-tight reveal">
            {t("Luxury Living in the", "العيش الفاخر في")} <br />
            <span className="text-amber-400 font-light">{t("Heart of Dubai", "قلب دبي")}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-3xl mx-auto leading-relaxed reveal">
            {t(
              "A new standard in property development",
              "معيار جديد في تطوير العقارات"
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-50 font-medium px-10 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => scrollToSection("properties")}
            >
              {t("View Properties", "عرض العقارات")}
            </Button>
            
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-base tracking-wide backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("contact")}
            >
              <Phone className="w-5 h-5 mr-2" />
              {t("Contact Us", "اتصل بنا")}
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Award, label: t("Industry Recognition", "الاعتراف الصناعي"), desc: t("Award-winning developments", "مشاريع حائزة على جوائز"), color: "text-amber-600" },
              { icon: Shield, label: t("RERA Licensed", "مرخص من قبل RERA"), desc: t("Fully regulated & compliant", "متوافق ومنظم بالكامل"), color: "text-blue-600" },
              { icon: Star, label: t("Client Excellence", "تميز العملاء"), desc: t("5-star service standards", "معايير خدمة 5 نجوم"), color: "text-emerald-600" },
              { icon: TrendingUp, label: t("Market Leadership", "الريادة السوقية"), desc: t("Proven track record", "سجل حافل بالإنجازات"), color: "text-purple-600" }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300 reveal">
                <div className={`w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h4 className="font-serif font-medium text-slate-900 mb-3 text-lg tracking-wide">
                  {item.label}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Preview */}
      <section id="properties" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              {t("Exceptional Properties", "عقارات استثنائية")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("Curated collection of Dubai's most prestigious addresses", "مجموعة مختارة من أرقى العناوين في دبي")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : (
              properties.map((property, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 reveal bg-white">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={property.image}
                      alt={`${property.title} - ${property.area}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {property.status}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => openGallery(property)}
                          className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t("View", "عرض")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500 font-medium tracking-wide">
                        {property.area}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-medium mb-2 text-slate-900 tracking-tight">
                      {property.title}
                    </h3>
                    
                    <p className="text-xl font-medium text-amber-600 mb-6">
                      {property.price}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {property.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 font-medium tracking-wide hover:bg-slate-50 transition-colors duration-200"
                        onClick={() => scrollToSection("contact")}
                      >
                        {t("Learn More", "المزيد")}
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => openGallery(property)}
                        className="px-3"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-slate-900 tracking-tight leading-[1.1]">
                {t("Iconic Properties,", "عقارات مميزة،")}<br />
                <span className="text-amber-600">{t("Visionary Living", "أسلوب حياة رؤيوي")}</span>
              </h2>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                {t(
                  "We specialize in connecting discerning clients with Dubai's most exceptional properties, delivering personalized service and unparalleled market expertise.",
                  "نحن متخصصون في ربط العملاء المميزين بأرقى العقارات في دبي، مع تقديم خدمة شخصية وخبرة سوق لا مثيل لها."
                )}
              </p>
              
              <div className="grid grid-cols-2 gap-12 mb-10">
                <div className="text-center">
                  <h4 className="text-3xl font-serif font-light text-slate-900 mb-2 tracking-tight">2024</h4>
                  <p className="text-slate-600 text-sm tracking-wide uppercase">{t("Established", "تأسست")}</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-serif font-light text-slate-900 mb-2 tracking-tight">{t("Premium", "فاخر")}</h4>
                  <p className="text-slate-600 text-sm tracking-wide uppercase">{t("Focus", "التركيز")}</p>
                </div>
              </div>
              
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 text-base font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105">
                {t("Our Story", "قصتنا")}
              </Button>
            </div>
            
            <div className="relative reveal">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop&q=80"
                  alt="Modern Dubai architecture"
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              {t("Why Dubai", "لماذا دبي")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                "A global destination offering unmatched investment returns and lifestyle opportunities",
                "وجهة عالمية تقدم عوائد استثمارية لا مثيل لها وفرص نمط حياة استثنائية"
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: t("Capital Gains Tax", "ضريبة الأرباح"), desc: t("Tax-free environment for property investments", "بيئة خالية من الضرائب للاستثمار العقاري"), color: "text-emerald-600" },
              { stat: "6–10%", label: t("Annual Yields", "عوائد سنوية"), desc: t("Strong rental returns across prime locations", "عوائد إيجارية قوية في مواقع متميزة"), color: "text-blue-600" },
              { stat: t("Global", "عالمية"), label: t("Connectivity", "الربط العالمي"), desc: t("Strategic location connecting major markets", "موقع استراتيجي يربط بين الأسواق الكبرى"), color: "text-purple-600" },
              { stat: t("Stable", "مستقرة"), label: t("Economy", "اقتصاد"), desc: t("Robust foundation with continuous growth", "أساس قوي ونمو مستمر"), color: "text-amber-600" },
              { stat: "200+", label: t("Nationalities", "جنسيات"), desc: t("Truly international business environment", "بيئة أعمال دولية بحق"), color: "text-rose-600" },
              { stat: "2030", label: t("Vision", "رؤية"), desc: t("Ambitious development goals and infrastructure", "أهداف تنموية طموحة وبنية تحتية متميزة"), color: "text-indigo-600" }
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 reveal bg-white">
                <CardContent className="p-0">
                  <h3 className={`text-4xl font-serif font-light mb-4 ${item.color} tracking-tight`}>{item.stat}</h3>
                  <h4 className="font-medium mb-4 text-slate-900 text-lg tracking-wide">{item.label}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              {t("Get In Touch", "تواصل معنا")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("Connect with our team to explore Dubai's premier real estate opportunities", "تواصل مع فريقنا لاكتشاف أفضل فرص العقارات في دبي")}
            </p>
          </div>

          <Card className="bg-white border-0 shadow-xl reveal">
            <CardContent className="p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-slate-900 font-medium mb-3 text-base tracking-wide">{t("Name", "الاسم")} *</label>
                    <Input 
                      id="name" 
                      className="border-slate-200 focus:border-amber-500 focus:ring-amber-500 py-4 text-base rounded-lg transition-colors duration-200" 
                      placeholder={t("Your name", "اسمك")} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-900 font-medium mb-3 text-base tracking-wide">{t("Email", "البريد الإلكتروني")} *</label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="border-slate-200 focus:border-amber-500 focus:ring-amber-500 py-4 text-base rounded-lg transition-colors duration-200" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block text-slate-900 font-medium mb-3 text-base tracking-wide">{t("Phone", "رقم الهاتف")}</label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      className="border-slate-200 focus:border-amber-500 focus:ring-amber-500 py-4 text-base rounded-lg transition-colors duration-200" 
                      placeholder="+971 XX XXX XXXX" 
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-slate-900 font-medium mb-3 text-base tracking-wide">{t("Interest", "الاهتمام")}</label>
                    <Select>
                      <SelectTrigger className="border-slate-200 py-4 rounded-lg">
                        <SelectValue placeholder={t("Select your interest", "اختر اهتمامك")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">{t("Buying Property", "شراء عقار")}</SelectItem>
                        <SelectItem value="invest">{t("Investment Opportunities", "فرص استثمارية")}</SelectItem>
                        <SelectItem value="sell">{t("Selling Property", "بيع عقار")}</SelectItem>
                        <SelectItem value="consult">{t("General Consultation", "استشارة عامة")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-slate-900 font-medium mb-3 text-base tracking-wide">{t("Message", "رسالة")}</label>
                  <Textarea 
                    id="message" 
                    className="border-slate-200 focus:border-amber-500 focus:ring-amber-500 min-h-36 text-base rounded-lg transition-colors duration-200" 
                    placeholder={t("Tell us about your requirements...", "أخبرنا عن متطلباتك...")} 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 text-base font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105"
                >
                  {t("Send Message", "إرسال الرسالة")}
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-600 mb-4 text-base">
                  {t("Prefer to call? Speak with our team directly", "تفضل الاتصال؟ تحدث مباشرة مع فريقنا")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a 
                    href="tel:+971-4-XXX-XXXX" 
                    className="text-slate-900 font-medium hover:text-amber-600 transition-colors duration-200 text-lg"
                  >
                    +971 4 XXX XXXX
                  </a>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <span className="text-slate-600">{t("Available 9 AM - 6 PM GST", "متاح من 9 صباحًا إلى 6 مساءً بتوقيت الخليج")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-serif font-light mb-6 tracking-tight">Moonscape</h3>
              <p className="text-white/80 mb-8 leading-relaxed text-lg">
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
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg tracking-wide">{t("Properties", "العقارات")}</h4>
              <ul className="space-y-4 text-white/70">
                {["Apartments", "Villas", "Penthouses", "Commercial", "Off-Plan", "Investment"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">{t(item, "—")}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg tracking-wide">{t("Company", "الشركة")}</h4>
              <ul className="space-y-4 text-white/70">
                {["About Us", "Our Team", "Careers", "News", "Contact", "Legal"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">{t(item, "—")}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
            <div className="mb-4 md:mb-0 text-white/60">
              <p className="text-base">© 2024 Moonscape Real Estate. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
              <p className="text-sm text-white/50 mt-1">{t("RERA Licensed | Dubai, United Arab Emirates", "مرخص من RERA | دبي، الإمارات العربية المتحدة")}</p>
            </div>
            <div className="flex gap-8">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <a key={link} href="#" className="text-white/60 hover:text-white transition-colors duration-200">{t(link, "—")}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Property Gallery Modal */}
      {selectedProperty && (
        <PropertyGallery
          images={selectedProperty.gallery}
          title={selectedProperty.title}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
