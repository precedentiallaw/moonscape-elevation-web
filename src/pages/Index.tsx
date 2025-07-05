
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Phone, Instagram, Linkedin, Star, Shield, Award, TrendingUp, CheckCircle } from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
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
    { icon: Star, label: "Client Excellence", desc: "5-star service standards" },
    { icon: TrendingUp, label: "Market Leadership", desc: "Proven track record" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-xl font-medium text-slate-900 tracking-tight">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-10">
            {['Properties', 'About', 'Dubai', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium tracking-wide"
              >
                {item}
              </button>
            ))}
          </nav>
          <Button className="md:hidden bg-slate-900 hover:bg-slate-800 text-white text-sm">
            Menu
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=900&fit=crop&q=80"
            alt="Dubai luxury development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/30"></div>
        </div>
        
        <div className="text-center z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white leading-tight tracking-tight">
            Luxury Living in the<br />Heart of Dubai
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            A new standard in property development
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-white text-slate-900 hover:bg-slate-50 font-medium px-8 py-3 text-sm tracking-wide"
              onClick={() => scrollToSection('properties')}
            >
              View Properties
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-sm tracking-wide backdrop-blur-sm"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-4 h-4 text-white/60" />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {trustSignals.map((signal, index) => (
              <div key={index} className="text-center reveal">
                <signal.icon className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <h4 className="font-medium text-slate-900 mb-2 text-sm tracking-wide">
                  {signal.label}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {signal.desc}
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
              Coming Soon
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Curated properties in Dubai's most sought-after locations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Marina Collection",
                area: "Dubai Marina",
                image: "photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&q=80",
                features: ["Waterfront Views", "Premium Finishes", "World-Class Amenities"]
              },
              {
                title: "Downtown Residences",
                area: "Downtown Dubai", 
                image: "photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80",
                features: ["City Skyline", "Prime Location", "Investment Grade"]
              },
              {
                title: "Emirates Collection",
                area: "Emirates Hills",
                image: "photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&q=80",
                features: ["Golf Course Views", "Private Gardens", "Exclusive Community"]
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
                    {property.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full text-sm font-medium tracking-wide py-3">
                    Learn More
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
                Iconic Properties,<br />Visionary Living
              </h2>
              
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                We specialize in connecting discerning clients with Dubai's most exceptional properties, 
                delivering personalized service and unparalleled market expertise.
              </p>
              
              <div className="grid grid-cols-2 gap-12 mb-10">
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">2024</h4>
                  <p className="text-slate-600 text-sm tracking-wide">Established</p>
                </div>
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">Premium</h4>
                  <p className="text-slate-600 text-sm tracking-wide">Focus</p>
                </div>
              </div>
              
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-sm font-medium tracking-wide">
                Learn More
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
              Why Dubai
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A global destination offering unmatched investment returns and lifestyle opportunities
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                stat: "0%", 
                label: "Capital Gains Tax", 
                desc: "Tax-free environment for property investments"
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
                desc: "Ambitious development goals and infrastructure"
              }
            ].map((item, index) => (
              <Card key={index} className="p-8 text-center border border-slate-200 hover:border-slate-300 transition-colors duration-300 reveal">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-light mb-4 text-slate-900 tracking-tight">
                    {item.stat}
                  </h3>
                  <h4 className="font-medium mb-4 text-slate-900 text-sm tracking-wide">
                    {item.label}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
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
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect with our team to explore Dubai's premier real estate opportunities
            </p>
          </div>
          
          <Card className="bg-white border border-slate-200 reveal">
            <CardContent className="p-10">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">Name *</label>
                    <Input 
                      id="name"
                      className="border-slate-300 focus:border-slate-500 py-3 text-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">Email *</label>
                    <Input 
                      id="email"
                      type="email"
                      className="border-slate-300 focus:border-slate-500 py-3 text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">Phone</label>
                    <Input 
                      id="phone"
                      type="tel"
                      className="border-slate-300 focus:border-slate-500 py-3 text-sm"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">Interest</label>
                    <Select>
                      <SelectTrigger className="border-slate-300 py-3">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buying Property</SelectItem>
                        <SelectItem value="invest">Investment Opportunities</SelectItem>
                        <SelectItem value="sell">Selling Property</SelectItem>
                        <SelectItem value="consult">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">Message</label>
                  <Textarea 
                    id="message"
                    className="border-slate-300 focus:border-slate-500 min-h-32 text-sm"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-sm font-medium tracking-wide"
                >
                  Send Message
                </Button>
              </form>
              
              <div className="mt-10 pt-8 border-t border-slate-200 text-center">
                <p className="text-slate-600 mb-3 text-sm">
                  Prefer to call? Speak with our team directly
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm">
                  <a href="tel:+971-4-XXX-XXXX" className="text-slate-900 font-medium hover:text-slate-700 transition-colors">
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
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light mb-6 tracking-tight">Moonscape</h3>
              <p className="text-white/80 mb-8 leading-relaxed text-sm">
                Your gateway to Dubai's most prestigious properties and investment opportunities.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-sm tracking-wide">Properties</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                {['Apartments', 'Villas', 'Penthouses', 'Commercial', 'Off-Plan', 'Investment'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-sm tracking-wide">Company</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                {['About Us', 'Our Team', 'Careers', 'News', 'Contact', 'Legal'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
            <div className="mb-4 md:mb-0">
              <p className="text-white/60 mb-1 text-sm">
                © 2024 Moonscape Real Estate. All rights reserved.
              </p>
              <p className="text-white/50 text-xs">
                RERA Licensed | Dubai, United Arab Emirates
              </p>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
