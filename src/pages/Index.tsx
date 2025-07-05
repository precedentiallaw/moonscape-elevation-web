import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Globe,
} from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) =>
      observer.observe(el)
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustSignals = [
    { icon: Award, label: 'Industry Recognition', desc: 'Award-winning developments' },
    { icon: Shield, label: 'RERA Licensed', desc: 'Fully regulated & compliant' },
    { icon: Star, label: 'Client Excellence', desc: '5-star service standards' },
    { icon: TrendingUp, label: 'Market Leadership', desc: 'Proven track record' },
  ];

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === 'ar' ? 'rtl' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-xl font-semibold tracking-tight animate-fadein">
            🌒 Moonscape
          </div>
          <nav className="hidden md:flex space-x-6">
            {['Properties', 'About', 'Dubai', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm text-slate-700 hover:text-slate-900 font-medium transition"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-sm text-slate-500 hover:text-slate-900 transition flex items-center"
            >
              <Globe className="w-4 h-4 mr-1" />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.6]"
          >
            <source
              src="https://videos.pexels.com/video-files/8359173/8359173-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80" />
        </div>

        <div className="text-center z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white leading-tight tracking-tight">
            Luxury Living in the<br />Heart of Dubai
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            A new standard in property development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-100 font-medium px-8 py-3 text-sm"
              onClick={() => scrollToSection('properties')}
            >
              View Properties
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-sm backdrop-blur-sm"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-4 h-4 text-white/70" />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustSignals.map((item, i) => (
            <div key={i} className="text-center reveal">
              <item.icon className="w-8 h-8 text-slate-700 mb-3 mx-auto" />
              <h4 className="font-medium text-sm mb-1">{item.label}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Curated opportunities in Dubai's finest neighborhoods
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden reveal">
                <div className="h-64">
                  <img
                    src={`https://source.unsplash.com/600x400/?dubai,property,${index}`}
                    className="w-full h-full object-cover"
                    alt="Dubai Property"
                  />
                </div>
                <CardContent className="p-6">
                  <span className="text-sm text-slate-500 block mb-1">Dubai Hills</span>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">
                    Modern Villa {index + 1}
                  </h3>
                  <ul className="space-y-2 mb-6 text-sm text-slate-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-slate-400" />
                      Pool & Garden
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-slate-400" />
                      5 Bedrooms
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full text-sm font-medium py-2">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-slate-900 tracking-tight leading-tight">
              Iconic Properties,<br />Visionary Living
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Moonscape Real Estate connects discerning clients with Dubai's most prestigious homes, offering curated experiences, tailored investment strategies, and unparalleled service.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-2xl font-light text-slate-900 mb-2">2024</h4>
                <p className="text-slate-600 text-sm tracking-wide">Established</p>
              </div>
              <div>
                <h4 className="text-2xl font-light text-slate-900 mb-2">Premium</h4>
                <p className="text-slate-600 text-sm tracking-wide">Market Focus</p>
              </div>
            </div>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-sm font-medium tracking-wide">
              Learn More
            </Button>
          </div>
          <div className="reveal">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
              alt="Modern Dubai architecture"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 tracking-tight">
              Why Dubai
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A global hub with 0% tax, 6–10% ROI, and unmatched lifestyle benefits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: "Capital Gains Tax", desc: "Tax-free real estate income" },
              { stat: "6–10%", label: "Rental Yields", desc: "Best-in-class annual returns" },
              { stat: "Global", label: "Connectivity", desc: "Hub between East & West" },
              { stat: "Stable", label: "Economy", desc: "Strong financial infrastructure" },
              { stat: "200+", label: "Nationalities", desc: "Diverse, inclusive society" },
              { stat: "2030", label: "Vision", desc: "Ambitious, future-ready city" },
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center border reveal">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-light mb-4 text-slate-900">{item.stat}</h3>
                  <h4 className="font-medium mb-2 text-slate-800 text-sm tracking-wide">{item.label}</h4>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Reach out to explore opportunities with Moonscape Real Estate.
            </p>
          </div>
          <Card className="bg-white border reveal">
            <CardContent className="p-10">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-slate-900 font-medium mb-2 text-sm">Name *</label>
                    <Input id="name" placeholder="Your name" required className="py-3 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-900 font-medium mb-2 text-sm">Email *</label>
                    <Input id="email" type="email" placeholder="you@example.com" required className="py-3 text-sm" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block text-slate-900 font-medium mb-2 text-sm">Phone</label>
                    <Input id="phone" type="tel" placeholder="+971..." className="py-3 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-slate-900 font-medium mb-2 text-sm">Interest</label>
                    <Select>
                      <SelectTrigger className="py-3 text-sm">
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buying</SelectItem>
                        <SelectItem value="sell">Selling</SelectItem>
                        <SelectItem value="invest">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-slate-900 font-medium mb-2 text-sm">Message</label>
                  <Textarea id="message" placeholder="Tell us what you need..." className="min-h-[120px] text-sm" />
                </div>
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-sm font-medium">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light mb-4">Moonscape</h3>
              <p className="text-white/80 mb-6 text-sm">
                Luxury real estate in the heart of Dubai. Elevated living, exceptional service.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Properties</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {['Apartments', 'Villas', 'Penthouses', 'Off-Plan'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {['About Us', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/20 text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Moonscape Real Estate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
