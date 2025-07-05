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
  Menu,
} from "lucide-react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<"en" | "ar">("en");

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

  return (
    <div className={`min-h-screen ${lang === "ar" ? "rtl text-right" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-xl font-semibold text-slate-900 tracking-tight fade-in">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-700 hover:text-slate-900 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
            >
              {lang === "en" ? "العربية" : "EN"}
            </Button>
            <Button className="md:hidden bg-slate-900 text-white">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/8359173/8359173-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="text-center z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white leading-tight reveal">
            {t("Luxury Living in the", "العيش الفاخر في")} <br />
            {t("Heart of Dubai", "قلب دبي")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto reveal">
            {t(
              "A new standard in property development",
              "معيار جديد في تطوير العقارات"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-50 font-medium px-8 py-3 text-sm tracking-wide"
              onClick={() => scrollToSection("properties")}
            >
              {t("View Properties", "عرض العقارات")}
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-sm tracking-wide backdrop-blur-sm"
              onClick={() => scrollToSection("contact")}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t("Contact Us", "اتصل بنا")}
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-4 h-4 text-white/70" />
        </div>
      </section>
      {/* Trust Signals */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Award, label: t("Industry Recognition", "الاعتراف الصناعي"), desc: t("Award-winning developments", "مشاريع حائزة على جوائز") },
              { icon: Shield, label: t("RERA Licensed", "مرخص من قبل RERA"), desc: t("Fully regulated & compliant", "متوافق ومنظم بالكامل") },
              { icon: Star, label: t("Client Excellence", "تميز العملاء"), desc: t("5-star service standards", "معايير خدمة 5 نجوم") },
              { icon: TrendingUp, label: t("Market Leadership", "الريادة السوقية"), desc: t("Proven track record", "سجل حافل بالإنجازات") }
            ].map((item, index) => (
              <div key={index} className="text-center reveal">
                <item.icon className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <h4 className="font-medium text-slate-900 mb-2 text-sm tracking-wide">
                  {item.label}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
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
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 tracking-tight">
              {t("Coming Soon", "قريباً")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("Curated properties in Dubai's most sought-after locations", "عقارات مختارة في أكثر المواقع تميزاً في دبي")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("Marina Collection", "مجموعة المارينا"),
                area: t("Dubai Marina", "دبي مارينا"),
                image: "photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&q=80",
                features: [
                  t("Waterfront Views", "إطلالات على الواجهة البحرية"),
                  t("Premium Finishes", "تشطيبات فاخرة"),
                  t("World-Class Amenities", "وسائل راحة عالمية")
                ]
              },
              {
                title: t("Downtown Residences", "شقق وسط المدينة"),
                area: t("Downtown Dubai", "وسط مدينة دبي"),
                image: "photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80",
                features: [
                  t("City Skyline", "أفق المدينة"),
                  t("Prime Location", "موقع متميز"),
                  t("Investment Grade", "فرصة استثمارية")
                ]
              },
              {
                title: t("Emirates Collection", "مجموعة الإمارات"),
                area: t("Emirates Hills", "تلال الإمارات"),
                image: "photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&q=80",
                features: [
                  t("Golf Course Views", "إطلالات على ملاعب الغولف"),
                  t("Private Gardens", "حدائق خاصة"),
                  t("Exclusive Community", "مجتمع حصري")
                ]
              }
            ].map((property, index) => (
              <Card key={index} className="group overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 reveal">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${property.image}`}
                    alt={`${property.title} - ${property.area}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="mb-3">
                    <span className="text-sm text-slate-500 font-medium tracking-wide">
                      {property.area}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-6 text-slate-900 tracking-tight">
                    {property.title}
                  </h3>
                  <div className="space-y-3 mb-8">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full text-sm font-medium tracking-wide py-3">
                    {t("Learn More", "المزيد")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-light mb-8 text-slate-900 tracking-tight leading-tight">
                {t("Iconic Properties,", "عقارات مميزة،")}<br />
                {t("Visionary Living", "أسلوب حياة رؤيوي")}
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                {t(
                  "We specialize in connecting discerning clients with Dubai's most exceptional properties, delivering personalized service and unparalleled market expertise.",
                  "نحن متخصصون في ربط العملاء المميزين بأرقى العقارات في دبي، مع تقديم خدمة شخصية وخبرة سوق لا مثيل لها."
                )}
              </p>
              <div className="grid grid-cols-2 gap-12 mb-10">
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">2024</h4>
                  <p className="text-slate-600 text-sm tracking-wide">{t("Established", "تأسست")}</p>
                </div>
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">{t("Premium", "فاخر")}</h4>
                  <p className="text-slate-600 text-sm tracking-wide">{t("Focus", "التركيز")}</p>
                </div>
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-sm font-medium tracking-wide">
                {t("Learn More", "المزيد")}
              </Button>
            </div>
            <div className="relative reveal">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&q=80"
                alt="Modern Dubai architecture"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Why Dubai */}
      <section id="dubai" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 tracking-tight">
              {t("Why Dubai", "لماذا دبي")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t(
                "A global destination offering unmatched investment returns and lifestyle opportunities",
                "وجهة عالمية تقدم عوائد استثمارية لا مثيل لها وفرص نمط حياة استثنائية"
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: t("Capital Gains Tax", "ضريبة الأرباح"), desc: t("Tax-free environment for property investments", "بيئة خالية من الضرائب للاستثمار العقاري") },
              { stat: "6–10%", label: t("Annual Yields", "عوائد سنوية"), desc: t("Strong rental returns across prime locations", "عوائد إيجارية قوية في مواقع متميزة") },
              { stat: t("Global", "عالمية"), label: t("Connectivity", "الربط العالمي"), desc: t("Strategic location connecting major markets", "موقع استراتيجي يربط بين الأسواق الكبرى") },
              { stat: t("Stable", "مستقرة"), label: t("Economy", "اقتصاد"), desc: t("Robust foundation with continuous growth", "أساس قوي ونمو مستمر") },
              { stat: "200+", label: t("Nationalities", "جنسيات"), desc: t("Truly international business environment", "بيئة أعمال دولية بحق") },
              { stat: "2030", label: t("Vision", "رؤية"), desc: t("Ambitious development goals and infrastructure", "أهداف تنموية طموحة وبنية تحتية متميزة") }
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center border border-slate-200 hover:border-slate-300 transition-colors duration-300 reveal">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-light mb-4 text-slate-900 tracking-tight">{item.stat}</h3>
                  <h4 className="font-medium mb-4 text-slate-900 text-sm tracking-wide">{item.label}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 tracking-tight">
              {t("Get In Touch", "تواصل معنا")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("Connect with our team to explore Dubai's premier real estate opportunities", "تواصل مع فريقنا لاكتشاف أفضل فرص العقارات في دبي")}
            </p>
          </div>

          <Card className="bg-white border border-slate-200 reveal">
            <CardContent className="p-10">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">{t("Name", "الاسم")} *</label>
                    <Input id="name" className="border-slate-300 focus:border-slate-500 py-3 text-sm" placeholder={t("Your name", "اسمك")} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">{t("Email", "البريد الإلكتروني")} *</label>
                    <Input id="email" type="email" className="border-slate-300 focus:border-slate-500 py-3 text-sm" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">{t("Phone", "رقم الهاتف")}</label>
                    <Input id="phone" type="tel" className="border-slate-300 focus:border-slate-500 py-3 text-sm" placeholder="+971 XX XXX XXXX" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">{t("Interest", "الاهتمام")}</label>
                    <Select>
                      <SelectTrigger className="border-slate-300 py-3">
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
                  <label htmlFor="message" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">{t("Message", "رسالة")}</label>
                  <Textarea id="message" className="border-slate-300 focus:border-slate-500 min-h-32 text-sm" placeholder={t("Tell us about your requirements...", "أخبرنا عن متطلباتك...")} />
                </div>
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-sm font-medium tracking-wide">
                  {t("Send Message", "إرسال الرسالة")}
                </Button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-200 text-center">
                <p className="text-slate-600 mb-3 text-sm">
                  {t("Prefer to call? Speak with our team directly", "تفضل الاتصال؟ تحدث مباشرة مع فريقنا")}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm">
                  <a href="tel:+971-4-XXX-XXXX" className="text-slate-900 font-medium hover:text-slate-700 transition-colors">+971 4 XXX XXXX</a>
                  <span className="hidden sm:inline text-slate-400">|</span>
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
              <h3 className="text-2xl font-light mb-6 tracking-tight">Moonscape</h3>
              <p className="text-white/80 mb-8 leading-relaxed text-sm">
                {t("Your gateway to Dubai's most prestigious properties and investment opportunities.", "بوابتك إلى أرقى العقارات وفرص الاستثمار في دبي.")}
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a key={social.label} href={social.href} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-6 text-sm tracking-wide">{t("Properties", "العقارات")}</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                {["Apartments", "Villas", "Penthouses", "Commercial", "Off-Plan", "Investment"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{t(item, "—")}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-6 text-sm tracking-wide">{t("Company", "الشركة")}</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                {["About Us", "Our Team", "Careers", "News", "Contact", "Legal"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{t(item, "—")}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
            <div className="mb-4 md:mb-0 text-sm text-white/60">
              <p>© 2024 Moonscape Real Estate. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
              <p className="text-xs text-white/50">{t("RERA Licensed | Dubai, United Arab Emirates", "مرخص من RERA | دبي، الإمارات العربية المتحدة")}</p>
            </div>
            <div className="flex gap-8 text-sm">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <a key={link} href="#" className="text-white/60 hover:text-white transition-colors">{t(link, "—")}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
