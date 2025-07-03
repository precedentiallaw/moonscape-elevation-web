
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, CheckCircle, Download, Phone, Instagram, Linkedin } from 'lucide-react';
import PropertyFilter from '@/components/PropertyFilter';
import FAQ from '@/components/FAQ';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const properties = [
    {
      title: "Lunar Towers",
      area: "Downtown Dubai",
      type: "Apartments",
      usps: ["Prime Location", "Smart Home Technology", "Panoramic Views", "24/7 Concierge"],
      image: "photo-1487958449943-2429e8be8625"
    },
    {
      title: "Crescent Villas",
      area: "Emirates Hills",
      type: "Villas",
      usps: ["Private Pool", "Golf Course Views", "Premium Finishes", "Gated Community"],
      image: "photo-1527576539890-dfa815648363"
    },
    {
      title: "Celestial Heights",
      area: "Dubai Marina",
      type: "Off-Plan",
      usps: ["Waterfront Living", "Modern Architecture", "Investment Opportunity", "Flexible Payment"],
      image: "photo-1488972685288-c3fd157d7c7a"
    }
  ];

  const filteredProperties = selectedFilter === 'All' 
    ? properties 
    : properties.filter(property => property.type === selectedFilter);

  return (
    <div className="min-h-screen bg-moonscape-ivory text-moonscape-charcoal">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-moonscape-light-gray elegant-shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-moonscape-blue">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('properties')} className="hover:text-moonscape-blue transition-colors font-medium">Properties</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-moonscape-blue transition-colors font-medium">About</button>
            <button onClick={() => scrollToSection('featured-project')} className="hover:text-moonscape-blue transition-colors font-medium">Featured</button>
            <button onClick={() => scrollToSection('dubai')} className="hover:text-moonscape-blue transition-colors font-medium">Why Dubai</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-moonscape-blue transition-colors font-medium">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="text-center z-10 px-6 animate-fade-in-up max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Invest in Dubai's Most<br />Visionary Real Estate
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Elevated Living. Earthly Luxury.
          </p>
          
          <Button 
            className="bg-moonscape-blue hover:bg-moonscape-blue/90 text-white font-semibold px-8 py-6 text-lg elegant-shadow transition-all duration-300"
            onClick={() => scrollToSection('properties')}
          >
            Discover Our Vision
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-moonscape-charcoal">Featured Properties</h2>
            <p className="text-moonscape-platinum text-lg max-w-2xl mx-auto">
              Discover our signature developments that redefine luxury living in Dubai
            </p>
          </div>
          
          <PropertyFilter onFilterChange={setSelectedFilter} />
          
          <div className="space-y-8">
            {filteredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden card-shadow hover:shadow-lg transition-all duration-500 bg-moonscape-charcoal">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${property.image}?w=800&h=600&fit=crop`}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center text-white">
                    <h3 className="font-serif text-3xl font-bold mb-3">{property.title}</h3>
                    <p className="text-white/80 text-lg mb-6">{property.area}</p>
                    
                    <div className="space-y-3 mb-8">
                      {property.usps.map((usp, uspIndex) => (
                        <div key={uspIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-moonscape-gold mr-3" />
                          <span className="text-white/90">{usp}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="bg-moonscape-gold hover:bg-moonscape-gold/90 text-moonscape-charcoal font-semibold self-start px-6 py-3">
                      Explore
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured-project" className="py-20 px-6 premium-gradient">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-moonscape-charcoal">
                Signature Collection:<br />Lunar Residences
              </h2>
              <p className="text-lg text-moonscape-platinum mb-6 leading-relaxed">
                Our flagship development represents the pinnacle of architectural innovation and luxury living. 
                Located in the heart of Downtown Dubai, these residences offer unparalleled views and amenities.
              </p>
              <p className="text-lg text-moonscape-platinum mb-8 leading-relaxed">
                From private sky gardens to smart home integration, every detail has been crafted to exceed expectations 
                and create a truly elevated living experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-moonscape-blue hover:bg-moonscape-blue/90 text-white font-semibold px-6 py-3 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
                <Button variant="outline" className="border-moonscape-blue text-moonscape-blue hover:bg-moonscape-blue hover:text-white font-semibold px-6 py-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                alt="Lunar Residences"
                className="rounded-lg card-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Moonscape */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop"
                alt="Modern architecture"
                className="rounded-lg card-shadow"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-moonscape-charcoal">About Moonscape</h2>
              <p className="text-lg text-moonscape-platinum mb-6 leading-relaxed">
                Moonscape Real Estate represents the convergence of visionary architecture and sustainable development. 
                We don't just create buildings; we craft elevated experiences that reflect Dubai's forward-thinking identity.
              </p>
              <p className="text-lg text-moonscape-platinum mb-8 leading-relaxed">
                Founded with a commitment to excellence and innovation, we focus on creating properties that stand as 
                monuments to architectural sophistication while providing unparalleled living experiences.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif text-3xl font-bold text-moonscape-blue mb-2">2024</h4>
                  <p className="text-moonscape-platinum">Founded with Vision</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-moonscape-blue mb-2">Dubai</h4>
                  <p className="text-moonscape-platinum">Global Gateway</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="py-20 px-6 premium-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-moonscape-charcoal">
              Why Dubai – Where Vision Becomes Skyline
            </h2>
            <p className="text-moonscape-platinum text-lg max-w-3xl mx-auto">
              Dubai stands as the world's premier destination for luxury real estate investment, 
              offering unmatched opportunities for growth and lifestyle enhancement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: "Income Tax", desc: "Tax-free investment returns" },
              { stat: "6-10%", label: "Rental Yields", desc: "Strong annual returns" },
              { stat: "8 Hours", label: "To 80% of the World", desc: "Global connectivity hub" },
              { stat: "Premium", label: "Lifestyle Standard", desc: "World-class amenities" },
              { stat: "Stable", label: "Political Climate", desc: "Secure investment environment" },
              { stat: "Visionary", label: "Urban Planning", desc: "Future-focused development" }
            ].map((item, index) => (
              <Card key={index} className="bg-white p-8 text-center card-shadow hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-4xl font-bold text-moonscape-blue mb-3">{item.stat}</h3>
                <h4 className="font-semibold text-moonscape-charcoal mb-2">{item.label}</h4>
                <p className="text-moonscape-platinum text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-moonscape-charcoal">Let's Talk</h2>
            <p className="text-moonscape-platinum text-lg">
              We'd love to hear from you. Begin your journey to elevated living with a private consultation.
            </p>
          </div>
          
          <Card className="bg-white p-8 card-shadow">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-moonscape-charcoal font-medium">Name</label>
                  <Input 
                    className="border-moonscape-light-gray focus:border-moonscape-blue"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-moonscape-charcoal font-medium">Email</label>
                  <Input 
                    type="email"
                    className="border-moonscape-light-gray focus:border-moonscape-blue"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-moonscape-charcoal font-medium">Phone</label>
                  <Input 
                    className="border-moonscape-light-gray focus:border-moonscape-blue"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-moonscape-charcoal font-medium">Property Type</label>
                  <Select>
                    <SelectTrigger className="border-moonscape-light-gray">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="apartment">Luxury Apartment</SelectItem>
                      <SelectItem value="villa">Signature Villa</SelectItem>
                      <SelectItem value="off-plan">Off-plan Development</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-moonscape-charcoal font-medium">Message</label>
                <Textarea 
                  className="border-moonscape-light-gray focus:border-moonscape-blue min-h-32"
                  placeholder="Tell us about your vision for elevated living..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-moonscape-blue hover:bg-moonscape-blue/90 text-white font-semibold py-4 elegant-shadow transition-all duration-300"
              >
                Book Private Consultation
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-moonscape-charcoal text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl font-bold mb-4">Moonscape</h3>
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Elevated Living. Earthly Luxury.
              </p>
              <p className="text-white/60 leading-relaxed">
                Pioneering visionary real estate development in Dubai, 
                where architectural sophistication meets elevated living standards.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 uppercase tracking-wider">PROPERTIES</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Luxury Apartments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Signature Villas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Off-plan Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investment Options</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 uppercase tracking-wider">COMPANY</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Philosophy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2024 Moonscape Real Estate. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://wa.me/971XXXXXXXXX" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.25 7.15c-.23-.39-.47-.39-.69-.4-.17-.01-.37-.01-.56-.01s-.51.07-.78.35c-.26.28-.99.97-.99 2.35s1.02 2.73 1.16 2.92c.14.2 1.98 3.02 4.8 4.23.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.67-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.2-.54-.35z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
