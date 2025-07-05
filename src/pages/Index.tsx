import { useState, useEffect } from 'react';
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
} from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formSuccess, setFormSuccess] = useState(false);

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
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trustSignals = [
    { icon: Award, label: 'Industry Recognition', desc: 'Award-winning developments' },
    { icon: Shield, label: 'RERA Licensed', desc: 'Fully regulated & compliant' },
    { icon: Star, label: 'Client Excellence', desc: '5-star service standards' },
    { icon: TrendingUp, label: 'Market Leadership', desc: 'Proven track record' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-2xl font-semibold tracking-tight text-slate-900">Moonscape</div>
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
          <Button className="md:hidden bg-slate-900 hover:bg-slate-800 text-white text-sm px-4 py-2">
            Menu
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552350005-84f8c2e2f59d?fit=crop&w=1600&q=80"
            alt="Dubai skyline"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
        <div className="z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight tracking-tighter">
            Experience Elevated<br />Living in Dubai
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
            Luxury properties, iconic locations, exceptional returns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-white text-slate-900 hover:bg-slate-100 font-medium px-8 py-3 text-sm tracking-wide"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-sm tracking-wide backdrop-blur-sm"
              onClick={() => scrollToSection('contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Speak to an Advisor
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </section>

      {/* Why Dubai */}
      <section id="dubai" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-slate-900 tracking-tight">
              Why Dubai
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              A global destination offering unmatched investment returns
              and lifestyle opportunities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {[
              { stat: '0%', label: 'Capital Gains Tax', desc: 'Tax-free environment for property investments' },
              { stat: '6–10%', label: 'Annual Yields', desc: 'Strong rental returns across prime locations' },
              { stat: 'Global', label: 'Connectivity', desc: 'Strategic location connecting major markets' },
              { stat: 'Stable', label: 'Economy', desc: 'Robust foundation with continuous growth' },
              { stat: '200+', label: 'Nationalities', desc: 'Truly international business environment' },
              { stat: '2030', label: 'Vision', desc: 'Ambitious development goals and infrastructure' },
            ].map((item, index) => (
              <StatCard key={index} stat={item.stat} label={item.label} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-slate-900 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Connect with our team to explore Dubai’s premier real estate opportunities
            </p>
          </div>

          {formSuccess ? (
            <div className="bg-white p-10 border border-slate-200 rounded-lg text-center text-slate-700">
              <h3 className="text-xl font-medium mb-4">Thank you!</h3>
              <p>Your message has been received. A Moonscape advisor will reach out shortly.</p>
            </div>
          ) : (
            <Card className="bg-white border border-slate-200 reveal">
              <CardContent className="p-10">
                <form
                  className="space-y-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSuccess(true);
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">
                        Name *
                      </label>
                      <Input id="name" required placeholder="Your name" className="py-3 text-sm border-slate-300" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">
                        Email *
                      </label>
                      <Input id="email" required type="email" placeholder="your@email.com" className="py-3 text-sm border-slate-300" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-900 font-medium mb-3 text-sm tracking-wide">
                      Message
                    </label>
                    <Textarea id="message" className="min-h-32 text-sm border-slate-300" placeholder="Tell us about your requirements…" />
                  </div>

                  <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-sm font-medium tracking-wide">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

// ✅ Animated stat card (CSS-only reveal)
const StatCard = ({
  stat,
  label,
  desc,
}: {
  stat: string;
  label: string;
  desc: string;
}) => {
  return (
    <div className="reveal transform transition-all duration-700 opacity-0 translate-y-6">
      <div className="bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md p-8 text-center rounded-lg transition">
        <h3 className="text-4xl font-light text-slate-900 mb-2 tracking-tight">{stat}</h3>
        <h4 className="text-sm text-slate-700 font-medium mb-3 uppercase tracking-wide">
          {label}
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

export default Index;
