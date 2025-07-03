
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, ArrowUp, Instagram, Linkedin } from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-moonscape-charcoal text-moonscape-ivory overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-moonscape-charcoal/90 backdrop-blur-md border-b border-moonscape-platinum/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-moonscape-platinum">
            Moonscape
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('properties')} className="hover:text-moonscape-blue transition-colors">Properties</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-moonscape-blue transition-colors">About</button>
            <button onClick={() => scrollToSection('philosophy')} className="hover:text-moonscape-blue transition-colors">Philosophy</button>
            <button onClick={() => scrollToSection('dubai')} className="hover:text-moonscape-blue transition-colors">Why Dubai</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-moonscape-blue transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center gradient-bg">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-moonscape-blue/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="text-center z-10 px-6 animate-fade-in-up">
          <div className="mb-8 animate-float">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-moonscape-blue to-moonscape-platinum glow-effect flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-moonscape-ivory opacity-60"></div>
            </div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-glow">
            Moonscape
          </h1>
          <p className="text-xl md:text-2xl text-moonscape-platinum mb-8 font-light">
            Elevated Living. Earthly Luxury.
          </p>
          
          <Button 
            className="bg-moonscape-blue hover:bg-moonscape-blue/80 text-moonscape-charcoal font-semibold px-8 py-6 text-lg glow-effect transition-all duration-300"
            onClick={() => scrollToSection('properties')}
          >
            Discover Our Vision
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-moonscape-blue" />
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 px-6 bg-moonscape-charcoal/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Featured Properties</h2>
            <p className="text-moonscape-platinum text-lg max-w-2xl mx-auto">
              Discover our signature developments that redefine luxury living in Dubai
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lunar Towers",
                location: "Downtown Dubai",
                type: "Luxury Apartments",
                image: "photo-1487958449943-2429e8be8625"
              },
              {
                title: "Crescent Villas",
                location: "Emirates Hills",
                type: "Signature Villas",
                image: "photo-1527576539890-dfa815648363"
              },
              {
                title: "Celestial Heights",
                location: "Dubai Marina",
                type: "Off-plan Tower",
                image: "photo-1488972685288-c3fd157d7c7a"
              }
            ].map((property, index) => (
              <Card key={index} className="bg-moonscape-charcoal border-moonscape-platinum/20 overflow-hidden group hover:glow-effect transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${property.image}?w=600&h=400&fit=crop`}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moonscape-charcoal/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{property.title}</h3>
                  <p className="text-moonscape-platinum mb-1">{property.location}</p>
                  <p className="text-moonscape-blue text-sm">{property.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Moonscape */}
      <section id="about" className="py-20 px-6 gradient-bg">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">About Moonscape</h2>
              <p className="text-lg text-moonscape-platinum mb-6 leading-relaxed">
                Moonscape Real Estate represents the convergence of visionary architecture and sustainable development. 
                We don't just create buildings; we craft elevated experiences that reflect Dubai's forward-thinking identity.
              </p>
              <p className="text-lg text-moonscape-platinum mb-8 leading-relaxed">
                Inspired by the serene beauty of lunar landscapes and the infinite possibilities of space, 
                our developments embody a unique aesthetic that marries futuristic design with earthly luxury.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-moonscape-blue mb-2">2024</h4>
                  <p className="text-moonscape-platinum">Founded with Vision</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-moonscape-blue mb-2">Dubai</h4>
                  <p className="text-moonscape-platinum">Global Gateway</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop"
                alt="Futuristic architecture"
                className="rounded-lg glow-effect"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section id="philosophy" className="py-20 px-6 bg-moonscape-charcoal/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-moonscape-blue text-xl italic mb-8">
              "We don't just develop properties — we create perspectives."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Vision",
                description: "Forward-thinking design that anticipates tomorrow's living standards today."
              },
              {
                title: "Integrity",
                description: "Transparent partnerships built on trust, quality, and unwavering commitment."
              },
              {
                title: "Innovation",
                description: "Pioneering sustainable solutions that elevate both lifestyle and environment."
              },
              {
                title: "Experience",
                description: "Curating spaces that transcend the ordinary and inspire the extraordinary."
              }
            ].map((pillar, index) => (
              <Card key={index} className="bg-moonscape-charcoal/70 border-moonscape-platinum/20 p-6 text-center hover:glow-effect transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-moonscape-blue/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-moonscape-blue animate-glow-pulse"></div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 text-moonscape-blue">{pillar.title}</h3>
                <p className="text-moonscape-platinum leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="relative py-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop)',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="absolute inset-0 bg-moonscape-charcoal/80"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-glow">
              Why Dubai – Where Vision Becomes Skyline
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "0%", label: "Income Tax" },
              { stat: "6-10%", label: "Rental Yields" },
              { stat: "8 Hours", label: "To 80% of the World" },
              { stat: "Luxury", label: "Lifestyle Standard" },
              { stat: "Stable", label: "Political Climate" },
              { stat: "Visionary", label: "Urban Planning" }
            ].map((item, index) => (
              <Card key={index} className="bg-moonscape-charcoal/90 border-moonscape-blue/30 p-6 text-center backdrop-blur-sm glow-effect">
                <h3 className="font-serif text-3xl font-bold text-moonscape-blue mb-2">{item.stat}</h3>
                <p className="text-moonscape-platinum">{item.label}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-moonscape-blue hover:bg-moonscape-blue/80 text-moonscape-charcoal font-semibold px-8 py-4 glow-effect"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties in Dubai
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 gradient-bg">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Let's Talk</h2>
            <p className="text-moonscape-platinum text-lg">
              Begin your journey to elevated living with a private consultation
            </p>
          </div>
          
          <Card className="bg-moonscape-charcoal/70 border-moonscape-platinum/20 p-8 glow-effect">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-moonscape-platinum font-medium">Name</label>
                  <Input 
                    className="bg-moonscape-charcoal/50 border-moonscape-platinum/30 text-moonscape-ivory focus:border-moonscape-blue"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-moonscape-platinum font-medium">Email</label>
                  <Input 
                    type="email"
                    className="bg-moonscape-charcoal/50 border-moonscape-platinum/30 text-moonscape-ivory focus:border-moonscape-blue"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-moonscape-platinum font-medium">Phone</label>
                  <Input 
                    className="bg-moonscape-charcoal/50 border-moonscape-platinum/30 text-moonscape-ivory focus:border-moonscape-blue"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-moonscape-platinum font-medium">Property Type</label>
                  <Select>
                    <SelectTrigger className="bg-moonscape-charcoal/50 border-moonscape-platinum/30 text-moonscape-ivory">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="bg-moonscape-charcoal border-moonscape-platinum/30">
                      <SelectItem value="apartment">Luxury Apartment</SelectItem>
                      <SelectItem value="villa">Signature Villa</SelectItem>
                      <SelectItem value="off-plan">Off-plan Development</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-moonscape-platinum font-medium">Message</label>
                <Textarea 
                  className="bg-moonscape-charcoal/50 border-moonscape-platinum/30 text-moonscape-ivory focus:border-moonscape-blue min-h-32"
                  placeholder="Tell us about your vision for elevated living..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-moonscape-blue hover:bg-moonscape-blue/80 text-moonscape-charcoal font-semibold py-4 glow-effect transition-all duration-300"
              >
                Book Private Consultation
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-moonscape-charcoal border-t border-moonscape-platinum/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="font-serif text-2xl font-bold text-moonscape-platinum mb-2">Moonscape</h3>
              <p className="text-moonscape-platinum/70">Elevated Living. Earthly Luxury.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-moonscape-platinum hover:text-moonscape-blue transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-moonscape-platinum hover:text-moonscape-blue transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://wa.me/971XXXXXXXXX" className="text-moonscape-platinum hover:text-moonscape-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.25 7.15c-.23-.39-.47-.39-.69-.4-.17-.01-.37-.01-.56-.01s-.51.07-.78.35c-.26.28-.99.97-.99 2.35s1.02 2.73 1.16 2.92c.14.2 1.98 3.02 4.8 4.23.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.67-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.2-.54-.35z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-moonscape-platinum/10 mt-8 pt-8 text-center">
            <p className="text-moonscape-platinum/70">
              © 2024 Moonscape Real Estate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
