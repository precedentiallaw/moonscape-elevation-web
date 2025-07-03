
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
    
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const properties = [
    {
      title: "Lunar Towers",
      area: "Downtown Dubai",
      type: "Apartments",
      image: "photo-1487958449943-2429e8be8625",
      usps: ["Prime Location", "Smart Home Technology", "Panoramic Views", "24/7 Concierge"]
    },
    {
      title: "Crescent Villas",
      area: "Emirates Hills",
      type: "Villas", 
      image: "photo-1527576539890-dfa815648363",
      usps: ["Private Pool", "Golf Course Views", "Premium Finishes", "Gated Community"]
    },
    {
      title: "Celestial Heights",
      area: "Dubai Marina",
      type: "Off-Plan",
      image: "photo-1488972685288-c3fd157d7c7a",
      usps: ["Waterfront Living", "Modern Architecture", "Investment Opportunity", "Flexible Payment"]
    }
  ];

  const filteredProperties = selectedFilter === 'All' 
    ? properties 
    : properties.filter(property => property.type === selectedFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-border luxury-shadow transition-all duration-300">
        <div className="container mx-auto container-padding py-4 flex items-center justify-between">
          <div className="font-serif text-3xl font-bold text-primary">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Properties', 'About', 'Featured', 'Dubai', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&q=80)',
            transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        
        <div className="text-center z-10 container-padding max-w-5xl animate-fade-in-up">
          <h1 className="font-serif font-bold mb-8 text-white leading-[0.9] text-balance drop-shadow-lg">
            Invest in Dubai's Most<br />Visionary Real Estate
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Elevated Living. Earthly Luxury.
          </p>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg luxury-shadow transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('properties')}
          >
            Discover Our Vision
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/80" />
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="section-spacing bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-20 reveal">
            <h2 className="font-serif font-bold mb-8 text-foreground text-balance">
              Featured Properties
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our signature developments that redefine luxury living in Dubai's most prestigious locations
            </p>
          </div>
          
          <div className="reveal">
            <PropertyFilter onFilterChange={setSelectedFilter} />
          </div>
          
          <div className="space-y-12">
            {filteredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden luxury-shadow hover:premium-shadow transition-all duration-500 bg-moonscape-charcoal reveal group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-96 overflow-hidden order-2 lg:order-1">
                    <img 
                      src={`https://images.unsplash.com/${property.image}?w=800&h=600&fit=crop&q=80`}
                      alt={`${property.title} - Luxury property in ${property.area}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-12 lg:p-16 flex flex-col justify-center text-white order-1 lg:order-2">
                    <h3 className="font-serif text-4xl font-bold mb-4 text-balance">{property.title}</h3>
                    <p className="text-white/80 text-xl mb-8 font-medium">{property.area}</p>
                    
                    <div className="space-y-4 mb-10">
                      {property.usps.map((usp, uspIndex) => (
                        <div key={uspIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-moonscape-gold mr-4 flex-shrink-0" />
                          <span className="text-white/90 text-lg">{usp}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="bg-moonscape-gold hover:bg-moonscape-gold/90 text-moonscape-charcoal font-semibold self-start px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                      Explore Property
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured-project" className="section-spacing premium-gradient">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="font-serif font-bold mb-10 text-foreground text-balance">
                Signature Collection:<br />Lunar Residences
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our flagship development represents the pinnacle of architectural innovation and luxury living. 
                Located in the heart of Downtown Dubai, these residences offer unparalleled views and world-class amenities.
              </p>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                From private sky gardens to intelligent home systems, every detail has been meticulously crafted to exceed expectations 
                and create a truly elevated living experience that defines the future of luxury residential development.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg flex items-center luxury-shadow transition-all duration-300 hover:scale-105">
                  <Download className="w-5 h-5 mr-3" />
                  Download Brochure
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 text-lg flex items-center transition-all duration-300 hover:scale-105">
                  <Phone className="w-5 h-5 mr-3" />
                  Schedule a Call
                </Button>
              </div>
            </div>
            <div className="relative reveal">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80"
                alt="Lunar Residences - Flagship luxury development in Downtown Dubai"
                className="rounded-2xl luxury-shadow w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Moonscape */}
      <section id="about" className="section-spacing bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative reveal order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop&q=80"
                alt="Modern architectural design representing Moonscape's vision"
                className="rounded-2xl luxury-shadow w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2 reveal">
              <h2 className="font-serif font-bold mb-10 text-foreground text-balance">About Moonscape</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Moonscape Real Estate represents the convergence of visionary architecture and sustainable development. 
                We don't just create buildings; we craft elevated experiences that reflect Dubai's forward-thinking identity.
              </p>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Founded with an unwavering commitment to excellence and innovation, we focus on creating properties that stand as 
                monuments to architectural sophistication while providing unparalleled living experiences for discerning residents and investors.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="font-serif text-4xl font-bold text-primary mb-3">2024</h4>
                  <p className="text-muted-foreground text-lg">Founded with Vision</p>
                </div>
                <div>
                  <h4 className="font-serif text-4xl font-bold text-primary mb-3">Dubai</h4>
                  <p className="text-muted-foreground text-lg">Global Gateway</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="section-spacing premium-gradient">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-20 reveal">
            <h2 className="font-serif font-bold mb-8 text-foreground text-balance">
              Why Dubai – Where Vision Becomes Skyline
            </h2>
            <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
              Dubai stands as the world's premier destination for luxury real estate investment, 
              offering unmatched opportunities for growth and lifestyle enhancement in a tax-free environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: "Income Tax", desc: "Complete tax-free investment returns and rental income" },
              { stat: "6-10%", label: "Rental Yields", desc: "Consistently strong annual returns across all property types" },
              { stat: "8 Hours", label: "To 80% of the World", desc: "Unparalleled global connectivity and business hub access" },
              { stat: "Premium", label: "Lifestyle Standard", desc: "World-class amenities, dining, and entertainment options" },
              { stat: "Stable", label: "Political Climate", desc: "Secure and transparent investment environment with strong governance" },
              { stat: "Visionary", label: "Urban Planning", desc: "Future-focused sustainable development and smart city initiatives" }
            ].map((item, index) => (
              <Card key={index} className="bg-white p-8 text-center luxury-shadow hover:premium-shadow transition-all duration-300 reveal group hover:scale-105">
                <CardContent className="p-0">
                  <h3 className="font-serif text-5xl font-bold text-primary mb-4 group-hover:text-moonscape-gold transition-colors duration-300">{item.stat}</h3>
                  <h4 className="font-semibold text-foreground mb-3 text-lg">{item.label}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="section-spacing bg-white">
        <div className="container mx-auto container-padding max-w-5xl">
          <div className="text-center mb-20 reveal">
            <h2 className="font-serif font-bold mb-8 text-foreground text-balance">Let's Talk</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Begin your journey to elevated living with a private consultation 
              tailored to your investment goals and lifestyle aspirations.
            </p>
          </div>
          
          <Card className="bg-white luxury-shadow reveal">
            <CardContent className="p-12">
              <form className="space-y-8" role="form" aria-label="Contact form">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-foreground font-semibold text-lg">Full Name *</label>
                    <Input 
                      id="name"
                      name="name"
                      className="border-border focus:border-primary text-lg py-4 transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-foreground font-semibold text-lg">Email Address *</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      className="border-border focus:border-primary text-lg py-4 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-foreground font-semibold text-lg">Phone Number</label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      className="border-border focus:border-primary text-lg py-4 transition-all duration-300"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="property-type" className="text-foreground font-semibold text-lg">Property Interest</label>
                    <Select name="property-type" aria-label="Select property type">
                      <SelectTrigger id="property-type" className="border-border text-lg py-4 transition-all duration-300">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="apartment">Luxury Apartment</SelectItem>
                        <SelectItem value="villa">Signature Villa</SelectItem>
                        <SelectItem value="off-plan">Off-plan Development</SelectItem>
                        <SelectItem value="investment">Investment Property</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="message" className="text-foreground font-semibold text-lg">Message</label>
                  <Textarea 
                    id="message"
                    name="message"
                    className="border-border focus:border-primary min-h-40 text-lg transition-all duration-300"
                    placeholder="Tell us about your vision for elevated living in Dubai..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg luxury-shadow transition-all duration-300 hover:scale-[1.02]"
                >
                  Book Private Consultation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-moonscape-charcoal text-white">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-serif text-4xl font-bold mb-6">Moonscape</h3>
              <p className="text-white/80 text-xl mb-8 font-light max-w-md leading-relaxed">
                Elevated Living. Earthly Luxury.
              </p>
              <p className="text-white/60 leading-relaxed max-w-lg text-lg">
                Pioneering visionary real estate development in Dubai, 
                where architectural sophistication meets elevated living standards for the discerning global investor.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">PROPERTIES</h4>
              <ul className="space-y-4 text-white/70">
                {['Luxury Apartments', 'Signature Villas', 'Off-plan Projects', 'Investment Opportunities'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">COMPANY</h4>
              <ul className="space-y-4 text-white/70">
                {['About Us', 'Our Philosophy', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/20">
            <p className="text-white/60 mb-6 md:mb-0 text-lg">
              © 2024 Moonscape Real Estate LLC. All rights reserved.
            </p>
            
            <div className="flex space-x-8">
              {[
                { icon: Instagram, href: "https://www.instagram.com/moonscape_dubai", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/moonscape-realestate", label: "LinkedIn" },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
