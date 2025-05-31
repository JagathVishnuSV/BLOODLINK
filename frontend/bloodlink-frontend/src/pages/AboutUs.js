// src/pages/AboutUs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, Heart, Users, Award, Phone, Mail, MapPin, ArrowLeft, Zap, Shield, Calendar } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  // Stats section data
  const stats = [
    { icon: <Droplet className="text-red-500" size={24} />, value: '10,000+', label: 'Donations Facilitated' },
    { icon: <Users className="text-red-500" size={24} />, value: '5,000+', label: 'Active Donors' },
    { icon: <Award className="text-red-500" size={24} />, value: '100+', label: 'Hospital Partners' },
    { icon: <Heart className="text-red-500" size={24} />, value: '8,000+', label: 'Lives Saved' }
  ];

  // Team section data
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former healthcare professional with 15+ years experience, passionate about making blood donation accessible to all.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Medical Officer',
      bio: 'Hematologist with extensive experience in blood banking and transfusion medicine.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Priya Patel',
      role: 'Community Outreach Director',
      bio: 'Dedicated to building partnerships with hospitals and organizing community blood drives.',
      image: '/api/placeholder/300/300'
    }
  ];

  // Core values section data
  const values = [
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and its ability to save lives through voluntary donation.'
    },
    {
      icon: <Shield className="text-red-500" size={24} />,
      title: 'Safety',
      description: 'We maintain the highest standards of safety for both donors and recipients in every aspect of our operation.'
    },
    {
      icon: <Users className="text-red-500" size={24} />,
      title: 'Community',
      description: 'We build and nurture a community of donors, hospitals, and patients working together.'
    },
    {
      icon: <Zap className="text-red-500" size={24} />,
      title: 'Innovation',
      description: 'We continuously improve our platform to make the blood donation process more efficient and accessible.'
    }
  ];

  // Timeline section data
  const timeline = [
    {
      year: '2018',
      event: 'BloodLink Founded',
      description: 'Started with a mission to connect blood donors directly with patients in need.'
    },
    {
      year: '2019',
      event: 'Hospital Network',
      description: 'Built partnerships with 25 hospitals across the region.'
    },
    {
      year: '2020',
      event: 'Emergency Response',
      description: 'Developed rapid response system for urgent blood needs during the pandemic.'
    },
    {
      year: '2022',
      event: 'Mobile App Launch',
      description: 'Expanded our reach with a mobile app for donors and recipients.'
    },
    {
      year: '2024',
      event: 'National Expansion',
      description: 'Now operating in 15 states with over 100 hospital partners.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header/Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Droplet className="text-red-600 mr-2" size={24} />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">BloodLink</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-700 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-40 w-96 h-96 rounded-full bg-red-300"></div>
          <div className="absolute left-40 bottom-10 w-64 h-64 rounded-full bg-red-300"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Lives Through Blood Donation</h1>
          <p className="text-xl max-w-2xl opacity-90 mb-8">
            BloodLink is on a mission to ensure that no life is lost due to lack of blood. We connect donors with those in need quickly and efficiently.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/donate')}
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-200"
            >
              Become a Donor
            </button>
            <button
              onClick={() => navigate('/new-request')}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              Request Blood
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100">
              <div className="mx-auto bg-red-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-red-100 w-full aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="BloodLink Mission" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-xl shadow-lg text-white">
                  <p className="text-2xl font-bold">Every Drop Counts</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                BloodLink was founded with a simple yet powerful mission: to bridge the gap between blood donors and recipients. 
                We believe that no one should lose their life due to lack of timely access to blood transfusions.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Through our innovative platform, we've created an ecosystem where donors can connect directly with patients in need, 
                hospitals can manage their blood inventories efficiently, and individuals can request blood during emergencies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our ultimate goal is to create a world where blood is available to everyone, anywhere, anytime it's needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do at BloodLink, from platform development to community engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey Timeline */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small startup to a nationwide network, see how we've grown over the years.
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute h-full w-1 bg-red-100 left-0 md:left-1/2 transform md:-translate-x-1/2"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <div className={`px-6 py-4 rounded-lg shadow-md bg-white border border-red-100 max-w-sm 
                                    ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.event}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="relative flex justify-center md:w-1/2">
                    <div className="h-8 w-8 bg-red-500 rounded-full z-10 flex items-center justify-center">
                      <Calendar size={14} className="text-white" />
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the passionate people behind BloodLink who work tirelessly to connect donors with those in need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="opacity-90 mb-8 leading-relaxed">
                Have questions about BloodLink or want to partner with us? 
                We'd love to hear from you. Reach out to our team using the contact information below.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">Call Us</p>
                    <p className="font-semibold">+1 (800) BLOOD-LINK</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">Email Us</p>
                    <p className="font-semibold">contact@bloodlink.org</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">Headquarters</p>
                    <p className="font-semibold">123 Health Avenue, Medical District, CA 90001</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <form className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 text-gray-800"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 text-gray-800"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 text-gray-800"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-all duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Droplet className="text-red-500 mr-2" size={24} />
                <h3 className="text-xl font-bold">BloodLink</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting blood donors with those in need, saving lives one donation at a time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Donate Blood</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Request Blood</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Donor Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.7-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.184A4.92 4.92 0 0011.78 8.28 13.985 13.985 0 011.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067A13.9 13.9 0 007.548 22c9.054 0 14.004-7.5 14.004-14.001 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59l-.047-.02z"/></svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
              <p className="text-gray-400">
                Subscribe to our newsletter for updates
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg flex-grow bg-gray-800 border border-gray-700 text-white focus:outline-none"
                />
                <button className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BloodLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;