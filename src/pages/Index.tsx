
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Phone, Instagram, Linkedin, Star, Shield, Award, TrendingUp, CheckCircle } from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    '/lovable-uploads/498a41a4-2b3b-46d3-ad3e-17a2eed7f05c.png',
    '/lovable-uploads/0d41c9e9-6144-4da8-88fd-55d452bb9bfa.png'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const imageInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageInterval);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const trustSignals = [
    { icon: Award, label: "Industry Recognition", desc: "Award-winning developments" },
    { icon: Shield, label: "RERA Licensed", desc: "Fully regulated & compliant" },
    { icon: Star, label: "Client Excellence", desc: "Premium service standards" },
    { icon: TrendingUp, label: "Market Leadership", desc: "Proven track record" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-500">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
          <div className="font-serif text-3xl font-bold text-slate-900">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-10">
            {['Properties', 'About', 'Dubai', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative hover:text-amber-600 transition-all duration-300 font-medium text-lg group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <Button className="md:hidden bg-slate-900 hover:bg-slate-800 text-white px-6 py-2">
            Menu
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <img 
                src={image}
                alt="Luxury Dubai development"
                className="w-full h-screen object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center z-10 px-6 max-w-6xl animate-fade-in">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-amber-500/20 text-amber-700 font-semibold rounded-full text-sm backdrop-blur-md border border-amber-400/30">
              Premium Real Estate
            </span>
          </div>
          
          <h1 className="font-serif font-bold mb-10 text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
            Discover Elevated<br />Living
          </h1>
          
          <p className="text-2xl sm:text-3xl text-white/90 mb-14 font-light max-w-4xl mx-auto leading-relaxed">
            Signature properties in the heart of Dubai's most prestigious neighborhoods
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto min-w-[200px]"
              onClick={() => scrollToSection('properties')}
            >
              View Properties
            </Button>
            
            <Button 
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-md px-8 py-4 text-lg rounded-xl w-full sm:w-auto min-w-[200px]"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {trustSignals.map((signal, index) => (
              <div key={index} className="text-center reveal">
                <signal.icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h4 className="font-serif font-semibold text-slate-900 mb-2 text-lg">
                  {signal.label}
                </h4>
                <p className="text-slate-600 text-sm">
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Preview */}
      <section id="properties" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-700 font-semibold rounded-full text-sm">
                Signature Collection
              </span>
            </div>
            <h2 className="font-serif font-bold mb-10 text-slate-900 text-4xl sm:text-5xl md:text-6xl">
              Coming Soon
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Curated real estate opportunities in Dubai's most sought-after locations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Marina Collection",
                area: "Dubai Marina",
                image: "photo-1487958449943-2429e8be8625",
                features: ["Waterfront Views", "Premium Finishes", "World-Class Amenities"]
              },
              {
                title: "Downtown Residences",
                area: "Downtown Dubai", 
                image: "photo-1545324418-cc1a3fa10c00",
                features: ["City Skyline", "Prime Location", "Investment Grade"]
              },
              {
                title: "Emirates Collection",
                area: "Emirates Hills",
                image: "photo-1527576539890-dfa815648363",
                features: ["Golf Course Views", "Private Gardens", "Exclusive Community"]
              }
            ].map((property, index) => (
              <Card key={index} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 reveal">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${property.image}?w=800&h=600&fit=crop&q=80`}
                    alt={`${property.title} - ${property.area}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
                
                <CardContent className="p-8">
                  <div className="mb-4">
                    <span className="text-amber-600 font-medium text-lg">
                      {property.area}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-6 text-slate-900">
                    {property.title}
                  </h3>
                  
                  <div className="space-y-3 mb-8">
                    {property.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-slate-900/10 text-slate-900 font-semibold rounded-full text-sm">
                  Our Approach
                </span>
              </div>
              
              <h2 className="font-serif font-bold mb-10 text-slate-900 text-4xl sm:text-5xl">
                Redefining Excellence in Dubai Real Estate
              </h2>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                We specialize in connecting discerning clients with Dubai's most exceptional properties, 
                delivering personalized service and unparalleled market expertise.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="text-center">
                  <h4 className="font-serif text-4xl font-bold text-slate-900 mb-3">2024</h4>
                  <p className="text-slate-600">Established</p>
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-4xl font-bold text-slate-900 mb-3">Premium</h4>
                  <p className="text-slate-600">Focus</p>
                </div>
              </div>
              
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg">
                Discover More
              </Button>
            </div>
            
            <div className="relative reveal">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop&q=80"
                  alt="Modern Dubai architecture"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-700 font-semibold rounded-full text-sm">
                Investment Opportunity
              </span>
            </div>
            <h2 className="font-serif font-bold mb-10 text-slate-900 text-4xl sm:text-5xl md:text-6xl">
              Why Dubai
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              A global destination offering unmatched investment returns and lifestyle opportunities
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                stat: "0%", 
                label: "Capital Gains Tax", 
                desc: "Tax-free environment for property investments",
                highlight: true
              },
              { 
                stat: "6-10%", 
                label: "Annual Yields", 
                desc: "Strong rental returns across prime locations" 
              },
              { 
                stat: "Global", 
                label: "Connectivity", 
                desc: "Strategic location connecting major markets" 
              },
              { 
                stat: "Stable", 
                label: "Economy", 
                desc: "Robust foundation with continuous growth" 
              },
              { 
                stat: "200+", 
                label: "Nationalities", 
                desc: "Truly international business environment" 
              },
              { 
                stat: "2030", 
                label: "Vision", 
                desc: "Ambitious development goals and infrastructure",
                highlight: true 
              }
            ].map((item, index) => (
              <Card key={index} className={`p-10 text-center shadow-lg hover:shadow-xl transition-all duration-500 reveal ${item.highlight ? 'bg-slate-900 text-white' : 'bg-white'}`}>
                <CardContent className="p-0">
                  <h3 className={`font-serif text-5xl font-bold mb-5 ${item.highlight ? 'text-amber-400' : 'text-slate-900'}`}>
                    {item.stat}
                  </h3>
                  <h4 className={`font-bold mb-5 text-xl ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {item.label}
                  </h4>
                  <p className={`leading-relaxed ${item.highlight ? 'text-white/90' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-slate-900/10 text-slate-900 font-semibold rounded-full text-sm">
                Get In Touch
              </span>
            </div>
            <h2 className="font-serif font-bold mb-10 text-slate-900 text-4xl sm:text-5xl">
              Start Your Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connect with our team to explore Dubai's premier real estate opportunities
            </p>
          </div>
          
          <Card className="bg-white shadow-2xl reveal">
            <CardContent className="p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label htmlFor="name" className="text-slate-900 font-semibold text-lg">Name *</label>
                    <Input 
                      id="name"
                      className="border-slate-300 focus:border-amber-500 text-lg py-4 transition-all duration-300 rounded-xl"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="email" className="text-slate-900 font-semibold text-lg">Email *</label>
                    <Input 
                      id="email"
                      type="email"
                      className="border-slate-300 focus:border-amber-500 text-lg py-4 transition-all duration-300 rounded-xl"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label htmlFor="phone" className="text-slate-900 font-semibold text-lg">Phone</label>
                    <Input 
                      id="phone"
                      type="tel"
                      className="border-slate-300 focus:border-amber-500 text-lg py-4 transition-all duration-300 rounded-xl"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="interest" className="text-slate-900 font-semibold text-lg">Interest</label>
                    <Select>
                      <SelectTrigger className="border-slate-300 text-lg py-4 transition-all duration-300 rounded-xl">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-xl">
                        <SelectItem value="buy">Buying Property</SelectItem>
                        <SelectItem value="invest">Investment Opportunities</SelectItem>
                        <SelectItem value="sell">Selling Property</SelectItem>
                        <SelectItem value="consult">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label htmlFor="message" className="text-slate-900 font-semibold text-lg">Message</label>
                  <Textarea 
                    id="message"
                    className="border-slate-300 focus:border-amber-500 min-h-32 text-lg transition-all duration-300 rounded-xl"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-xl font-bold rounded-xl"
                >
                  Send Message
                </Button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-slate-200 text-center">
                <p className="text-slate-600 text-lg mb-4">
                  Prefer to call? Speak with our team directly
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="tel:+971-4-XXX-XXXX" className="text-slate-900 font-bold text-xl hover:text-amber-600 transition-colors">
                    +971 4 XXX XXXX
                  </a>
                  <span className="hidden sm:inline text-slate-400">|</span>
                  <span className="text-slate-600">Available 9 AM - 6 PM GST</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-serif text-4xl font-bold mb-6">Moonscape</h3>
              <p className="text-white/80 text-xl mb-8 font-light leading-relaxed">
                Discover Elevated Living
              </p>
              <p className="text-white/60 leading-relaxed max-w-lg text-lg mb-8">
                Your gateway to Dubai's most prestigious properties and investment opportunities.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-amber-500 transition-all duration-300 hover:scale-110 transform"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">PROPERTIES</h4>
              <ul className="space-y-4 text-white/70">
                {['Apartments', 'Villas', 'Penthouses', 'Commercial', 'Off-Plan', 'Investment'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-amber-400">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">COMPANY</h4>
              <ul className="space-y-4 text-white/70">
                {['About Us', 'Our Team', 'Careers', 'News', 'Contact', 'Legal'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-amber-400">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/20">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <p className="text-white/60 text-lg mb-2">
                © 2024 Moonscape Real Estate. All rights reserved.
              </p>
              <p className="text-white/50 text-base">
                RERA Licensed | Dubai, United Arab Emirates
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-center">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
