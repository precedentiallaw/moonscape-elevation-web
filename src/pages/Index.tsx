
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
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="text-xl font-semibold text-slate-900">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Properties', 'About', 'Dubai', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-700 hover:text-slate-900 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
          <Button className="md:hidden bg-slate-900 hover:bg-slate-800 text-white">
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
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        <div className="text-center z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white leading-tight">
            Luxury Living in the<br />Heart of Dubai
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            A new standard in property development
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-white text-slate-900 hover:bg-slate-100 font-medium px-8 py-3"
              onClick={() => scrollToSection('properties')}
            >
              View Properties
            </Button>
            
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown className="w-5 h-5 text-white/60" />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustSignals.map((signal, index) => (
              <div key={index} className="text-center reveal">
                <signal.icon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <h4 className="font-medium text-slate-900 mb-2">
                  {signal.label}
                </h4>
                <p className="text-sm text-slate-600">
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Preview */}
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
              Coming Soon
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
              <Card key={index} className="group overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors reveal">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${property.image}`}
                    alt={`${property.title} - ${property.area}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-slate-500 font-medium">
                      {property.area}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-4 text-slate-900">
                    {property.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    {property.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900">
                Iconic Properties,<br />Visionary Living
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We specialize in connecting discerning clients with Dubai's most exceptional properties, 
                delivering personalized service and unparalleled market expertise.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2">2024</h4>
                  <p className="text-slate-600">Established</p>
                </div>
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2">Premium</h4>
                  <p className="text-slate-600">Focus</p>
                </div>
              </div>
              
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
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
      <section id="dubai" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
              Why Dubai
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
              <Card key={index} className="p-8 text-center border border-slate-200 reveal">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-light mb-3 text-slate-900">
                    {item.stat}
                  </h3>
                  <h4 className="font-medium mb-3 text-slate-900">
                    {item.label}
                  </h4>
                  <p className="text-slate-600">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect with our team to explore Dubai's premier real estate opportunities
            </p>
          </div>
          
          <Card className="bg-white border border-slate-200 reveal">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-900 font-medium mb-2">Name *</label>
                    <Input 
                      id="name"
                      className="border-slate-300 focus:border-slate-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-900 font-medium mb-2">Email *</label>
                    <Input 
                      id="email"
                      type="email"
                      className="border-slate-300 focus:border-slate-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-slate-900 font-medium mb-2">Phone</label>
                    <Input 
                      id="phone"
                      type="tel"
                      className="border-slate-300 focus:border-slate-500"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-slate-900 font-medium mb-2">Interest</label>
                    <Select>
                      <SelectTrigger className="border-slate-300">
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
                  <label htmlFor="message" className="block text-slate-900 font-medium mb-2">Message</label>
                  <Textarea 
                    id="message"
                    className="border-slate-300 focus:border-slate-500 min-h-32"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3"
                >
                  Send Message
                </Button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-600 mb-2">
                  Prefer to call? Speak with our team directly
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
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
      <footer className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-medium mb-4">Moonscape</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
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
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Properties</h4>
              <ul className="space-y-2 text-white/70">
                {['Apartments', 'Villas', 'Penthouses', 'Commercial', 'Off-Plan', 'Investment'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
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
              <p className="text-white/60 mb-1">
                © 2024 Moonscape Real Estate. All rights reserved.
              </p>
              <p className="text-white/50 text-sm">
                RERA Licensed | Dubai, United Arab Emirates
              </p>
            </div>
            
            <div className="flex gap-6 text-sm">
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
