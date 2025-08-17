'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Interactive map component (simplified version - in production you'd use actual map service)

const InteractiveMapFinal = () => {
  const [isHovered, setIsHovered] = useState(false);

  // The 'View on Google Maps' button can link to the actual map
  const googleMapsUrl = "https://www.google.com/maps/place/7+Tilbury+Rd,+Harare,+Zimbabwe/@-17.8631114,30.9889131,17z";

  return (
    <div className="relative group">
      <div
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
          isHovered ? 'border-brand-orange scale-105' : 'border-brand-orange/30'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* --- Map Section --- */}
        <div className="relative h-64">
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.7789131!2d30.9889131!3d-17.8631114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a1496feded1d%3A0xb65a732e02c1411c!2s7%20Tilbury%20Rd%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2sin!4v1691418612345!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of Jambstronics Technologies"
          ></iframe>

          {/* Location info overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-brand-dark/80 backdrop-blur-sm rounded-lg p-3 z-10">
            <p className="text-brand-orange font-semibold">📍 Jambstronics Technologies</p>
            <p className="text-brand-light/80 text-sm">7 Tilbury Road, Willowvale, Harare</p>
          </div>
        </div>

        {/* --- Hover Overlay --- */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


// Animated contact info card
const ContactInfoCard = ({ icon, title, info, links, delay = 0 }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => inView !== entry.isIntersecting && setTimeout(() => setInView(entry.isIntersecting), delay),
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay, inView]);

  return (
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden bg-gradient-to-br from-brand-dark/80 to-brand-dark/60 backdrop-blur-xl p-6 rounded-2xl border border-brand-orange/30 hover:border-brand-orange/60 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-brand-orange/20 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-brand-orange to-brand-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        <div className="space-y-2">
          {info.map((item, i) => (
            <div key={i} className="text-brand-light/90 group-hover:text-white transition-colors duration-300">
              {links && links[i] ? (
                <a 
                  href={links[i]}
                  className="hover:text-brand-orange transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>{item}</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span>{item}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced form with real-time validation
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    urgent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceOptions = [
    'Telecommunications Systems',
    'Industrial Automation',
    'Electrical Engineering',
    'Instrumentation & Control',
    'Technical Consultation',
    'System Integration',
    'Maintenance & Support',
    'Other'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'phone':
        return value.length >= 10 ? '' : 'Phone number must be at least 10 digits';
      case 'name':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'message':
        return value.trim().length >= 10 ? '' : 'Message must be at least 10 characters';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: inputValue }));
    
    // Real-time validation
    if (value.trim()) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'urgent' && key !== 'company') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.table(formData);
      const response = await axios.post('/api/contact', formData);
      
      if (response.status === 200 && response.data.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          urgent: false
        });
        setErrors({});
      } else {
        throw new Error(response.data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      // Show error message to user
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send message. Please try again.';
      setErrors({ submit: errorMessage });
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-brand-dark/90 to-brand-dark/70 backdrop-blur-xl p-8 rounded-3xl border border-brand-orange/50 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
        <p className="text-brand-light/80 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-gradient-to-r from-brand-orange to-brand-accent text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-light/90 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full bg-brand-dark/50 border-2 rounded-xl py-3 px-4 text-white placeholder-brand-light/50 focus:outline-none transition-all duration-300 ${
              errors.name ? 'border-red-500' : 'border-brand-orange/30 focus:border-brand-orange'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-light/90 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-brand-dark/50 border-2 rounded-xl py-3 px-4 text-white placeholder-brand-light/50 focus:outline-none transition-all duration-300 ${
              errors.email ? 'border-red-500' : 'border-brand-orange/30 focus:border-brand-orange'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-light/90 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full bg-brand-dark/50 border-2 rounded-xl py-3 px-4 text-white placeholder-brand-light/50 focus:outline-none transition-all duration-300 ${
              errors.phone ? 'border-red-500' : 'border-brand-orange/30 focus:border-brand-orange'
            }`}
            placeholder="+263 xxx xxx xxx"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-brand-light/90 mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full bg-brand-dark/50 border-2 border-brand-orange/30 rounded-xl py-3 px-4 text-white placeholder-brand-light/50 focus:outline-none focus:border-brand-orange transition-all duration-300"
            placeholder="Optional"
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-brand-light/90 mb-2">
          Service Interest *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className="w-full bg-brand-dark/50 border-2 border-brand-orange/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-orange transition-all duration-300"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service, i) => (
            <option key={i} value={service}>{service}</option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-light/90 mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full bg-brand-dark/50 border-2 rounded-xl py-3 px-4 text-white placeholder-brand-light/50 focus:outline-none transition-all duration-300 resize-none ${
            errors.message ? 'border-red-500' : 'border-brand-orange/30 focus:border-brand-orange'
          }`}
          placeholder="Tell us about your project, requirements, timeline, and any specific challenges you're facing..."
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Urgent Checkbox */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="urgent"
          name="urgent"
          checked={formData.urgent}
          onChange={handleInputChange}
          className="w-5 h-5 text-brand-orange bg-brand-dark border-brand-orange/50 rounded focus:ring-brand-orange focus:ring-2"
        />
        <label htmlFor="urgent" className="text-brand-light/90 font-medium">
          This is an urgent project requiring immediate attention
        </label>
      </div>

      {/* Error Display */}
      {errors.submit && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.submit}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
          isSubmitting
            ? 'bg-brand-gray cursor-not-allowed'
            : 'bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-accent hover:to-brand-orange transform hover:scale-105 shadow-2xl hover:shadow-brand-orange/50'
        } text-white`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending Message...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>Send Message</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        )}
      </button>
    </form>
  );
};

// Business hours component
const BusinessHours = () => {
  const hours = [
    { day: 'Monday - Friday', time: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 1:00 PM' },
    { day: 'Sunday', time: 'Emergency Only' },
  ];

  return (
    <div className="bg-gradient-to-br from-brand-dark/80 to-brand-dark/60 backdrop-blur-xl p-6 rounded-2xl border border-brand-orange/30">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Business Hours
      </h3>
      <div className="space-y-3">
        {hours.map((hour, i) => (
          <div key={i} className="flex justify-between items-center text-brand-light/90">
            <span className="font-medium">{hour.day}</span>
            <span className="text-brand-accent">{hour.time}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-brand-orange/20">
        <p className="text-brand-light/70 text-sm">
          <span className="text-brand-orange font-semibold">24/7 Emergency Support</span> available for critical infrastructure projects
        </p>
      </div>
    </div>
  );
};

export default function Overlay() {
  const phoneIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
    </svg>
  );

  const emailIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const locationIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-brand-dark/50 border border-brand-orange/30 rounded-full text-brand-accent font-semibold text-sm tracking-wide uppercase mb-6 animate-fade-in">
            Ready to Connect
          </div>
          
          <h1 className="text-5xl bg-brand-dark/20 md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">
              Let&#39;s Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h1>
          
          <p className="text-xl text-brand-light/80 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into reality? Our expert engineering team is here to provide world-class solutions tailored to your unique needs.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <ContactInfoCard
              icon={phoneIcon}
              title="Phone Support"
              info={['+263 773 755 716', '+263 773 755 717', '+263 776 641 687']}
              links={['tel:+263773755716', 'tel:+263773755717', 'tel:+263776641687']}
              delay={0}
            />
            
            <ContactInfoCard
              icon={emailIcon}
              title="Email Contact"
              info={['jambsmash20@gmail.com', 'Response within 4 hours']}
              links={['mailto:jambsmash20@gmail.com', null]}
              delay={200}
            />
            
            <ContactInfoCard
              icon={locationIcon}
              title="Visit Our Office"
              info={['7 Tilbury Road, Willowvale', 'Harare, Zimbabwe']}
              links={[null, null]}
              delay={400}
            />
            
            <BusinessHours />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-brand-dark/90 to-brand-dark/70 backdrop-blur-xl p-8 rounded-3xl border border-brand-orange/40 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Start Your Project</h2>
                <p className="text-brand-light/80">
                  Fill out the form below and we&#39;ll get back to you with a detailed consultation within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-4">
              Find Us
            </h2>
            <p className="text-brand-light/80">Located in the heart of Harare&#39;s business district</p>
          </div>
          <InteractiveMapFinal />
        </div>

        {/* Additional Services CTA */}
        <div className="text-center bg-gradient-to-r from-brand-dark/80 to-brand-dark/60 backdrop-blur-xl p-12 rounded-3xl border border-brand-orange/30">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-brand-light/80 mb-8 max-w-2xl mx-auto">
            For urgent technical support or emergency services, our 24/7 hotline is always available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+263773755716"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5l4-4m0 0l4-4m-4 4H4" />
              </svg>
              <span>Emergency Hotline</span>
            </a>
            <Link 
              href="/services"
              className="group inline-flex items-center space-x-2 border-2 border-brand-orange hover:border-brand-accent text-brand-orange hover:text-brand-accent px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-orange/10 transition-all duration-300"
            >
              <span>View All Services</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        <Footer />
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 2s ease-out;
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
}
