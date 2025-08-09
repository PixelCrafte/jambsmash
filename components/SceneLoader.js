// Premium loading component
const PremiumLoader = () => (
<div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-dark">
  <div className="relative">
    {/* Outer ring */}
    <div className="w-20 h-20 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
    {/* Inner ring */}
    <div className="absolute inset-2 w-16 h-16 border-4 border-brand-accent border-b-transparent rounded-full animate-spin animat  e-reverse"></div>
    {/* Core */}
    <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full animate-pulse"></div  >
    {/* Glow effect */}
    <div className="absolute inset-0 w-20 h-20 bg-brand-orange/20 rounded-full blur-xl animate-pulse"></div>
  </div>
</div>
);

export default PremiumLoader;
