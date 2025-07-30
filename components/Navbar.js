// 2. Create this file at: components/Navbar.js

'use client';

export default function Navbar({ onSectionChange }) {
  return (
    <nav className="fixed top-0 left-0 z-20 w-full p-4 bg-brand-dark/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-brand-orange">
          Jambsmash
        </div>
        <div className="hidden md:flex space-x-6 text-brand-light items-center">
          <button onClick={() => onSectionChange(0)} className="hover:text-brand-orange transition-colors">Home</button>
          <button onClick={() => onSectionChange(1)} className="hover:text-brand-orange transition-colors">Vision</button>
          <button onClick={() => onSectionChange(2)} className="hover:text-brand-orange transition-colors">Services</button>
          <button onClick={() => onSectionChange(3)} className="hover:text-brand-orange transition-colors">Team</button>
          <button onClick={() => onSectionChange(4)} className="hover:text-brand-orange transition-colors bg-brand-orange/20 px-4 py-2 rounded-md">Contact</button>
        </div>
      </div>
    </nav>
  );
}
