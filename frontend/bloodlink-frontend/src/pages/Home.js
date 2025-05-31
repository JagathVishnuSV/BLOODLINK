import React, { useState, useEffect } from 'react';
import { Heart, Droplet, Award, Users, Calendar, Map, Bell } from 'lucide-react';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: <Droplet className="text-red-500" size={24} />, value: "10K+", label: "Donations" },
    { icon: <Users className="text-red-500" size={24} />, value: "5K+", label: "Donors" },
    { icon: <Heart className="text-red-500" size={24} />, value: "8K+", label: "Lives Saved" },
    { icon: <Award className="text-red-500" size={24} />, value: "12K+", label: "Members" }
  ];
  
  const features = [
    { 
      icon: <Map size={32} className="text-red-600" />, 
      title: "Find Nearby Centers", 
      description: "Locate blood donation centers and hospitals in your area with our interactive map."
    },
    { 
      icon: <Calendar size={32} className="text-red-600" />, 
      title: "Schedule Donations", 
      description: "Book your next donation appointment with just a few clicks."
    },
    { 
      icon: <Bell size={32} className="text-red-600" />, 
      title: "Urgent Requests", 
      description: "Receive notifications for emergency blood donation needs in your community."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-100 via-red-200 to-rose-400 text-red-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -left-64 w-96 h-96 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-64 w-96 h-96 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-48 w-96 h-96 rounded-full bg-rose-500/15 blur-3xl"></div>
      </div>
      
      {/* Header/Navigation */}
      <header className="relative z-10 px-8 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet size={32} className="text-red-700" />
            <span className="text-2xl font-bold text-red-800">BloodLink</span>
          </div>
          
          <nav className="hidden lg:flex gap-8 text-red-900 font-medium">
            <a href="/about" className="hover:text-red-700 transition-colors">About Us</a>
            <a href="/login" className="hover:text-red-700 transition-colors">Donate</a>
            <a href="/login" className="hover:text-red-700 transition-colors">Find Centers</a>
            <a href="/contact" className="hover:text-red-700 transition-colors">Contact</a>
          </nav>
          
          <div className="flex gap-4">
            <a href="/login" className="px-5 py-2 bg-white text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">Login</a>
            <a href="/register" className="px-5 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition-colors">Register</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 py-16 z-10">
        <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-600 leading-tight mb-6">
            Donate Blood.<br />Save Lives.
          </h1>
          
          <p className="text-lg text-gray-800 mb-8 max-w-lg">
            BloodLink connects <strong className="text-red-700">blood donors</strong> and recipients seamlessly. Join our community of heroes and make a difference today.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="/register"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Become a Donor
            </a>
            
            <a
              href="/login"
              className="px-8 py-3 border-2 border-red-600 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-all transform hover:-translate-y-1"
            >
              Urgent Requests
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center mb-2">
                  {stat.icon}
                  <div className="ml-2 text-2xl font-bold text-red-700">{stat.value}</div>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hero Image */}
        <div className={`flex justify-end transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative">
            <div className="w-96 h-96 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <Droplet size={36} className="text-red-600" />
              </div>
              <div className="absolute top-20 right-12 w-16 h-16 rounded-full bg-rose-200 flex items-center justify-center">
                <Heart size={28} className="text-red-500" />
              </div>
              <div className="absolute bottom-16 left-12 w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                <Award size={40} className="text-red-400" />
              </div>
              <div className="absolute bottom-24 right-20 w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                <Users size={28} className="text-red-500" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <Droplet size={48} className="text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/30 backdrop-blur-sm py-20 z-10 relative">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-red-800 text-center mb-16">How BloodLink Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="container mx-auto px-8 py-16 z-10 relative">
        <h2 className="text-3xl font-bold text-red-800 text-center mb-12">What Our Heroes Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <User size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-700 italic mb-3">"BloodLink connected me with a donor just when I needed it most. This platform is literally saving lives every day."</p>
                <p className="font-semibold text-red-700">— Sarah Johnson, Recipient</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <User size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-700 italic mb-3">"Being able to schedule donations on my own time makes it so much easier to give regularly. The reminders are great too!"</p>
                <p className="font-semibold text-red-700">— Michael Chen, Regular Donor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-12 z-10">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplet size={24} className="text-white" />
                <span className="text-xl font-bold">BloodLink</span>
              </div>
              <p className="text-white/80">Connecting donors and recipients since 2022. Making blood donation accessible to everyone.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Find Centers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Urgent Requests</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Become a Donor</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-white/80 mb-4">Subscribe to get updates on urgent blood requests and news.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full" />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/80 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white hover:text-red-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const User = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
};

export default Home;