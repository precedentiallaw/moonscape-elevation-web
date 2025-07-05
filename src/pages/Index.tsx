
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, CheckCircle, Download, Phone, Instagram, Linkedin, Star, Shield, Award, TrendingUp } from 'lucide-react';
import PropertyFilter from '@/components/PropertyFilter';
import FAQ from '@/components/FAQ';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    '/lovable-uploads/498a41a4-2b3b-46d3-ad3e-17a2eed7f05c.png',
    '/lovable-uploads/0d41c9e9-6144-4da8-88fd-55d452bb9bfa.png'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Enhanced image rotation
    const imageInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    
    // Enhanced Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stagger animations for child elements
            const children = entry.target.querySelectorAll('.stagger-child');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('active');
              }, index * 150);
            });
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el));
    
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

  const properties = [
    {
      title: "Lunar Towers",
      area: "Downtown Dubai",
      type: "Apartments",
      price: "From AED 2.8M",
      image: "photo-1487958449943-2429e8be8625",
      usps: ["Prime Burj Khalifa Views", "Smart Home Integration", "Private Concierge", "Infinity Pool & Spa"],
      badge: "Best Seller"
    },
    {
      title: "Crescent Villas",
      area: "Emirates Hills", 
      type: "Villas",
      price: "From AED 15M",
      image: "photo-1527576539890-dfa815648363",
      usps: ["Championship Golf Views", "Private Beach Access", "Bespoke Interior Design", "24/7 Security"],
      badge: "Exclusive"
    },
    {
      title: "Celestial Heights",
      area: "Dubai Marina",
      type: "Off-Plan",
      price: "From AED 1.9M",
      image: "photo-1488972685288-c3fd157d7c7a",
      usps: ["Waterfront Living", "Flexible Payment Plans", "Guaranteed ROI 8%", "Ready Q4 2025"],
      badge: "Launch Offer"
    }
  ];

  const filteredProperties = selectedFilter === 'All' 
    ? properties 
    : properties.filter(property => property.type === selectedFilter);

  const trustSignals = [
    { icon: Award, label: "Dubai Real Estate Awards 2024", desc: "Best Luxury Developer" },
    { icon: Shield, label: "RERA Licensed", desc: "Fully Licensed & Regulated" },
    { icon: Star, label: "5-Star Client Rating", desc: "Over 500 Happy Clients" },
    { icon: TrendingUp, label: "AED 2B+ Portfolio", desc: "Track Record of Excellence" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-border/50 luxury-shadow transition-all duration-500">
        <div className="container mx-auto container-padding py-4 sm:py-5 flex items-center justify-between">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-moonscape-navy">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-8 lg:space-x-10">
            {['Properties', 'About', 'Featured', 'Dubai', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="relative hover:text-moonscape-navy transition-all duration-300 font-medium text-base lg:text-lg group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-moonscape-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <Button className="md:hidden bg-moonscape-navy hover:bg-moonscape-charcoal text-white px-6 py-2">
            Menu
          </Button>
        </div>
      </header>

      {/* Luxury Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-3000 ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.25}px)`,
              }}
            >
              <img 
                src={image}
                alt={`Moonscape Dubai luxury development ${index + 1}`}
                className="hero-image scale-105"
              />
              <div className="absolute inset-0 hero-gradient"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center z-10 container-padding max-w-7xl animate-fade-in-up">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block px-4 py-2 bg-moonscape-gold/20 text-moonscape-navy font-semibold rounded-full text-sm sm:text-base backdrop-blur-sm border border-moonscape-gold/30">
              Dubai's Premier Luxury Real Estate
            </span>
          </div>
          
          <h1 className="font-serif font-bold mb-8 sm:mb-10 text-white leading-[0.9] text-balance drop-shadow-2xl hero-title">
            Where Vision Meets<br />Dubai's Skyline
          </h1>
          
          <p className="hero-subtitle text-white/90 mb-10 sm:mb-14 font-light max-w-4xl mx-auto leading-relaxed">
            Discover Dubai's most prestigious properties through our curated collection of luxury developments, 
            where architectural excellence meets investment opportunity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button 
              className="btn-primary w-full sm:w-auto min-w-[200px]"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </Button>
            
            <Button 
              variant="outline"
              className="btn-secondary w-full sm:w-auto min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white hover:text-moonscape-navy backdrop-blur-sm"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Private Consultation
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7 text-white/70" />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 sm:py-20 bg-moonscape-pearl">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {trustSignals.map((signal, index) => (
              <div key={index} className="text-center reveal stagger-child">
                <signal.icon className="w-8 h-8 sm:w-10 sm:h-10 text-moonscape-gold mx-auto mb-4" />
                <h4 className="font-serif font-semibold text-moonscape-navy mb-2 text-sm sm:text-base">
                  {signal.label}
                </h4>
                <p className="text-moonscape-platinum text-xs sm:text-sm">
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Enhanced */}
      <section id="properties" className="section-spacing bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-20 sm:mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-moonscape-gold/10 text-moonscape-navy font-semibold rounded-full text-sm">
                Signature Collection
              </span>
            </div>
            <h2 className="font-serif font-bold mb-8 sm:mb-10 text-foreground text-balance">
              Exceptional Properties,<br />Extraordinary Living
            </h2>
            <p className="lead text-muted-foreground max-w-4xl mx-auto">
              Each property in our portfolio represents the pinnacle of luxury living, 
              carefully selected for their architectural significance, prime locations, and investment potential.
            </p>
          </div>
          
          <div className="reveal mb-16">
            <PropertyFilter onFilterChange={setSelectedFilter} />
          </div>
          
          <div className="space-y-12 sm:space-y-16">
            {filteredProperties.map((property, index) => (
              <Card key={index} className="property-card reveal-scale group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden order-2 lg:order-1">
                    {property.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-moonscape-gold text-moonscape-navy px-3 py-1 rounded-full text-sm font-semibold">
                        {property.badge}
                      </div>
                    )}
                    <img 
                      src={`https://images.unsplash.com/${property.image}?w=1000&h=800&fit=crop&q=90`}
                      alt={`${property.title} - Luxury ${property.type.toLowerCase()} in ${property.area}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-moonscape-charcoal text-white order-1 lg:order-2">
                    <div className="mb-6">
                      <span className="text-moonscape-gold font-medium text-lg sm:text-xl">
                        {property.area}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
                      {property.title}
                    </h3>
                    
                    <p className="text-2xl sm:text-3xl font-bold text-moonscape-gold mb-8 sm:mb-10">
                      {property.price}
                    </p>
                    
                    <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                      {property.usps.map((usp, uspIndex) => (
                        <div key={uspIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-moonscape-gold mr-4 sm:mr-5 flex-shrink-0" />
                          <span className="text-white/90 text-lg sm:text-xl">{usp}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="btn-primary bg-moonscape-gold hover:bg-moonscape-gold/90 text-moonscape-charcoal flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" className="border-moonscape-gold text-moonscape-gold hover:bg-moonscape-gold hover:text-moonscape-charcoal flex-1">
                        Schedule Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project - Enhanced */}
      <section id="featured-project" className="section-spacing premium-gradient">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-20 lg:gap-24 items-center">
            <div className="reveal">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-moonscape-navy/10 text-moonscape-navy font-semibold rounded-full text-sm">
                  Flagship Development
                </span>
              </div>
              
              <h2 className="font-serif font-bold mb-8 sm:mb-10 text-foreground text-balance">
                Lunar Residences:<br />Redefining Luxury Living
              </h2>
              
              <p className="lead text-muted-foreground mb-8 sm:mb-10">
                Our flagship development represents the convergence of architectural innovation and luxury lifestyle. 
                Strategically positioned in Downtown Dubai's most coveted address, offering unparalleled Burj Khalifa and fountain views.
              </p>
              
              <div className="space-y-6 mb-10 sm:mb-12">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-moonscape-gold/20 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-moonscape-navy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Sky Gardens & Terraces</h4>
                    <p className="text-muted-foreground">Private outdoor spaces on every level</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-moonscape-gold/20 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-moonscape-navy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Intelligent Home Systems</h4>
                    <p className="text-muted-foreground">AI-powered comfort and security</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-moonscape-gold/20 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-moonscape-navy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Exclusive Amenities</h4>
                    <p className="text-muted-foreground">Private cinema, spa, and rooftop infinity pool</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button className="btn-primary flex items-center justify-center">
                  <Download className="w-5 h-5 mr-3" />
                  Download Brochure
                </Button>
                <Button className="btn-secondary flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-3" />
                  Private Tour
                </Button>
              </div>
            </div>
            
            <div className="relative reveal-scale">
              <div className="relative rounded-3xl overflow-hidden premium-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80"
                  alt="Lunar Residences - Flagship luxury development featuring sky gardens and Dubai skyline views"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moonscape-navy/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Moonscape - Enhanced */}
      <section id="about" className="section-spacing bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-20 lg:gap-24 items-center">
            <div className="relative reveal-scale order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden premium-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop&q=80"
                  alt="Moonscape Real Estate - Architectural excellence and visionary design philosophy"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 reveal">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-moonscape-navy/10 text-moonscape-navy font-semibold rounded-full text-sm">
                  Our Story
                </span>
              </div>
              
              <h2 className="font-serif font-bold mb-8 sm:mb-10 text-foreground text-balance">
                Crafting Dubai's<br />Architectural Legacy
              </h2>
              
              <p className="lead text-muted-foreground mb-8 sm:mb-10">
                Founded with an unwavering commitment to architectural excellence, Moonscape Real Estate stands at the forefront of Dubai's luxury property renaissance. We don't just develop buildings—we create landmarks that define the city's evolving skyline.
              </p>
              
              <p className="text-lg text-muted-foreground mb-10 sm:mb-12 leading-relaxed">
                Our philosophy centers on the belief that exceptional properties must seamlessly blend innovative design with sustainable practices, creating spaces that inspire while respecting the environment. Every project reflects our dedication to pushing the boundaries of what luxury living can achieve.
              </p>
              
              <div className="grid grid-cols-2 gap-8 sm:gap-12 mb-10">
                <div className="text-center">
                  <h4 className="font-serif text-4xl sm:text-5xl font-bold text-moonscape-navy mb-3">2024</h4>
                  <p className="text-muted-foreground text-lg">Founded with Vision</p>
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-4xl sm:text-5xl font-bold text-moonscape-navy mb-3">AED 2B+</h4>
                  <p className="text-muted-foreground text-lg">Portfolio Value</p>
                </div>
              </div>
              
              <Button className="btn-primary">
                Discover Our Vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dubai - Enhanced */}
      <section id="dubai" className="section-spacing premium-gradient">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-20 sm:mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-moonscape-navy/10 text-moonscape-navy font-semibold rounded-full text-sm">
                Investment Opportunity
              </span>
            </div>
            <h2 className="font-serif font-bold mb-8 sm:mb-10 text-foreground text-balance">
              Dubai: Where Global Capital<br />Meets Unmatched Returns
            </h2>
            <p className="lead text-muted-foreground max-w-5xl mx-auto">
              As the world's premier destination for luxury real estate investment, Dubai offers an unprecedented combination 
              of tax advantages, strong yields, and strategic global positioning that attracts the world's most sophisticated investors.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {[
              { 
                stat: "0%", 
                label: "Tax on Rental Income", 
                desc: "Complete tax-free environment for all property investment returns and capital gains",
                highlight: true
              },
              { 
                stat: "6-10%", 
                label: "Annual Rental Yields", 
                desc: "Consistently strong returns across prime locations with growing demand" 
              },
              { 
                stat: "8 Hours", 
                label: "Flight to 80% of World", 
                desc: "Unparalleled global connectivity making Dubai the ultimate business hub" 
              },
              { 
                stat: "$600B", 
                label: "Economy Value", 
                desc: "Robust economic foundation with continuous government investment in infrastructure" 
              },
              { 
                stat: "200+", 
                label: "Nationalities", 
                desc: "Truly cosmopolitan environment attracting global talent and investment" 
              },
              { 
                stat: "2030", 
                label: "Vision Goals", 
                desc: "Ambitious development plans ensuring continued growth and world-class amenities",
                highlight: true 
              }
            ].map((item, index) => (
              <Card key={index} className={`p-8 sm:p-10 text-center luxury-shadow hover:premium-shadow transition-all duration-500 reveal group ${item.highlight ? 'bg-moonscape-navy text-white' : 'bg-white'}`}>
                <CardContent className="p-0">
                  <h3 className={`font-serif text-5xl sm:text-6xl font-bold mb-4 sm:mb-5 transition-colors duration-300 ${item.highlight ? 'text-moonscape-gold' : 'text-moonscape-navy group-hover:text-moonscape-gold'}`}>
                    {item.stat}
                  </h3>
                  <h4 className={`font-bold mb-4 sm:mb-5 text-xl sm:text-2xl ${item.highlight ? 'text-white' : 'text-foreground'}`}>
                    {item.label}
                  </h4>
                  <p className={`leading-relaxed text-base sm:text-lg ${item.highlight ? 'text-white/90' : 'text-muted-foreground'}`}>
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section - Enhanced */}
      <section id="contact" className="section-spacing bg-white">
        <div className="container mx-auto container-padding max-w-6xl">
          <div className="text-center mb-20 sm:mb-24 reveal">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-moonscape-navy/10 text-moonscape-navy font-semibold rounded-full text-sm">
                Get In Touch
              </span>
            </div>
            <h2 className="font-serif font-bold mb-8 sm:mb-10 text-foreground text-balance">
              Begin Your Journey to<br />Exceptional Living
            </h2>
            <p className="lead text-muted-foreground max-w-4xl mx-auto">
              Connect with our luxury property specialists for a personalized consultation tailored to your investment goals. 
              Whether you're seeking a primary residence, investment opportunity, or portfolio diversification, we're here to guide your journey.
            </p>
          </div>
          
          <Card className="bg-white premium-shadow reveal-scale">
            <CardContent className="p-10 sm:p-12 lg:p-16">
              <form className="space-y-8 sm:space-y-10" role="form" aria-label="Luxury property consultation form">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="name" className="text-foreground font-semibold text-lg sm:text-xl">Full Name *</label>
                    <Input 
                      id="name"
                      name="name"
                      className="border-border focus:border-moonscape-gold text-lg sm:text-xl py-4 sm:py-5 transition-all duration-300 rounded-xl"
                      placeholder="Enter your full name"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="email" className="text-foreground font-semibold text-lg sm:text-xl">Email Address *</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      className="border-border focus:border-moonscape-gold text-lg sm:text-xl py-4 sm:py-5 transition-all duration-300 rounded-xl"
                      placeholder="your@email.com"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="phone" className="text-foreground font-semibold text-lg sm:text-xl">Phone Number</label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      className="border-border focus:border-moonscape-gold text-lg sm:text-xl py-4 sm:py-5 transition-all duration-300 rounded-xl"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <label htmlFor="budget" className="text-foreground font-semibold text-lg sm:text-xl">Investment Budget</label>
                    <Select name="budget" aria-label="Select investment budget range">
                      <SelectTrigger id="budget" className="border-border text-lg sm:text-xl py-4 sm:py-5 transition-all duration-300 rounded-xl">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-xl">
                        <SelectItem value="1-3m">AED 1M - 3M</SelectItem>
                        <SelectItem value="3-5m">AED 3M - 5M</SelectItem>
                        <SelectItem value="5-10m">AED 5M - 10M</SelectItem>
                        <SelectItem value="10m+">AED 10M+</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <label htmlFor="property-interest" className="text-foreground font-semibold text-lg sm:text-xl">Property Interest</label>
                  <Select name="property-interest" aria-label="Select property type of interest">
                    <SelectTrigger id="property-interest" className="border-border text-lg sm:text-xl py-4 sm:py-5 transition-all duration-300 rounded-xl">
                      <SelectValue placeholder="What type of property interests you?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="apartment">Luxury Apartments</SelectItem>
                      <SelectItem value="villa">Signature Villas</SelectItem>
                      <SelectItem value="penthouse">Exclusive Penthouses</SelectItem>
                      <SelectItem value="off-plan">Off-Plan Developments</SelectItem>
                      <SelectItem value="investment">Investment Portfolio</SelectItem>
                      <SelectItem value="commercial">Commercial Properties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <label htmlFor="message" className="text-foreground font-semibold text-lg sm:text-xl">Tell Us About Your Vision</label>
                  <Textarea 
                    id="message"
                    name="message"
                    className="border-border focus:border-moonscape-gold min-h-40 sm:min-h-48 text-lg sm:text-xl transition-all duration-300 rounded-xl"
                    placeholder="Share your requirements, preferred locations, timeline, or any specific questions about Dubai's luxury real estate market..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full btn-primary py-6 sm:py-8 text-xl sm:text-2xl font-bold"
                >
                  Schedule Private Consultation
                </Button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-border/50 text-center">
                <p className="text-muted-foreground text-base sm:text-lg mb-4">
                  Prefer to speak directly? Call our luxury property specialists
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="tel:+971-4-XXX-XXXX" className="text-moonscape-navy font-bold text-xl hover:text-moonscape-gold transition-colors">
                    +971 4 XXX XXXX
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Available 7 days a week, 9 AM - 9 PM GST</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-20 sm:py-24 bg-moonscape-charcoal text-white">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-20">
            <div className="md:col-span-2">
              <h3 className="font-serif text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">Moonscape</h3>
              <p className="text-white/80 text-xl sm:text-2xl mb-8 sm:mb-10 font-light leading-relaxed">
                Where Vision Meets Dubai's Skyline
              </p>
              <p className="text-white/60 leading-relaxed max-w-lg text-lg sm:text-xl mb-8">
                Pioneering Dubai's luxury real estate landscape through visionary developments that redefine architectural excellence and elevated living standards.
              </p>
              <div className="flex space-x-6 sm:space-x-8">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/moonscape_dubai", label: "Instagram" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/moonscape-realestate", label: "LinkedIn" },
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-moonscape-gold transition-all duration-300 hover:scale-110 transform"
                    aria-label={`Follow Moonscape on ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 sm:mb-8 uppercase tracking-wider text-sm sm:text-base">PROPERTIES</h4>
              <ul className="space-y-4 sm:space-y-5 text-white/70">
                {['Luxury Apartments', 'Signature Villas', 'Exclusive Penthouses', 'Off-Plan Projects', 'Commercial Properties', 'Investment Opportunities'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg sm:text-xl hover:text-moonscape-gold">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 sm:mb-8 uppercase tracking-wider text-sm sm:text-base">COMPANY</h4>
              <ul className="space-y-4 sm:space-y-5 text-white/70">
                {['About Moonscape', 'Our Philosophy', 'Leadership Team', 'Awards & Recognition', 'Careers', 'Press Centre'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-300 text-lg sm:text-xl hover:text-moonscape-gold">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 sm:pt-12 border-t border-white/20">
            <div className="mb-6 sm:mb-8 md:mb-0 text-center md:text-left">
              <p className="text-white/60 text-lg sm:text-xl mb-2">
                © 2024 Moonscape Real Estate LLC. All rights reserved.
              </p>
              <p className="text-white/50 text-base sm:text-lg">
                RERA License: [License Number] | Dubai, United Arab Emirates
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base sm:text-lg">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base sm:text-lg">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-base sm:text-lg">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
