// 3. components/contact/Overlay.js
// This is the overlay containing the contact form and details.

'use client';

// Icon component for contact details
const InfoIcon = ({ icon, children }) => (
    <div className="flex items-center gap-4 text-brand-light">
        <div className="text-brand-orange w-6 h-6">{icon}</div>
        <span>{children}</span>
    </div>
);

export default function Overlay() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., by sending the data to an API endpoint.
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        {/* Left Side: Contact Info */}
        <div className="bg-brand-dark/50 backdrop-blur-md p-8 rounded-xl flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-brand-light/80 mb-8">
                Have a project in mind or need technical support? We're here to help. Reach out to us through any of the channels below.
            </p>
            <div className="space-y-6">
                <InfoIcon icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>}>
                    <a href="tel:+263773755716" className="hover:text-brand-orange">+263 773 755 716</a> / <a href="tel:+263773755717" className="hover:text-brand-orange">+263 773 755 717</a>
                </InfoIcon>
                <InfoIcon icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}>
                    <a href="mailto:jambsmash20@gmail.com" className="hover:text-brand-orange">jambsmash20@gmail.com</a>
                </InfoIcon>
                <InfoIcon icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}>
                    7 Tilbury Road, Willowvale, Harare
                </InfoIcon>
            </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-brand-dark/70 backdrop-blur-md p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-light/90">Full Name</label>
                    <input type="text" id="name" name="name" required className="mt-1 block w-full bg-brand-dark/50 border-brand-orange/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-orange focus:border-brand-orange" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-light/90">Email Address</label>
                    <input type="email" id="email" name="email" required className="mt-1 block w-full bg-brand-dark/50 border-brand-orange/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-orange focus:border-brand-orange" />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-light/90">Subject</label>
                    <input type="text" id="subject" name="subject" required className="mt-1 block w-full bg-brand-dark/50 border-brand-orange/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-orange focus:border-brand-orange" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-light/90">Message</label>
                    <textarea id="message" name="message" rows="4" required className="mt-1 block w-full bg-brand-dark/50 border-brand-orange/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-orange focus:border-brand-orange"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-brand-orange text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-brand-accent transition-transform hover:scale-105">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

