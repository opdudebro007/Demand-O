import React from 'react';
import {
  Sparkles,
  Paintbrush,
  ShieldCheck,
  Hammer,
  Car,
  Utensils,
  Wrench,
  Zap,
  Scissors,
  HeartPulse,
  Baby,
  Briefcase
} from 'lucide-react';

export default function ServiceIcon({ name, className = "w-5 h-5" }) {
  switch (name) {
    case 'Sparkles':
    case 'cleaners':
      return <Sparkles className={className} />;
    case 'Brush':
    case 'sweepers':
      return <Paintbrush className={className} />;
    case 'ShieldCheck':
    case 'security-guards':
      return <ShieldCheck className={className} />;
    case 'Hammer':
    case 'labours':
      return <Hammer className={className} />;
    case 'Car':
    case 'drivers':
      return <Car className={className} />;
    case 'Utensils':
    case 'cooks':
      return <Utensils className={className} />;
    case 'Wrench':
    case 'plumbers':
      return <Wrench className={className} />;
    case 'Zap':
    case 'electricians':
      return <Zap className={className} />;
    case 'Scissors':
    case 'barbers':
      return <Scissors className={className} />;
    case 'HeartPulse':
    case 'house-nurses':
      return <HeartPulse className={className} />;
    case 'Baby':
    case 'nannies':
      return <Baby className={className} />;
    default:
      return <Briefcase className={className} />;
  }
}
