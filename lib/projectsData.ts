export interface Project {
  id: string;
  title: string;
  date: string; // ISO date, e.g. "2025-03-14"
  image: string;
  description: string;
}

// Placeholder content. Swap this array for a Prismic query once the
// "project" custom type is wired up (see PRISMIC_SETUP.md).
export const projects: Project[] = [
  {
    id: '1',
    title: 'PLC & SCADA Upgrade for a Beverage Bottling Plant',
    date: '2025-06-02',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop',
    description:
      'Replaced an aging relay-based control system with a modern PLC and SCADA setup for a beverage bottling line. The upgrade gave the client real-time visibility into line speed, downtime, and fault codes, cutting unplanned stoppages and making it far easier for their operators to diagnose issues before they became costly.',
  },
  {
    id: '2',
    title: 'Perimeter CCTV and Access Control for a Warehouse Complex',
    date: '2025-04-18',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    description:
      'Designed and installed an HD IP CCTV network with AI-based motion analytics alongside a biometric access control system for a multi-building warehouse complex. The system now gives security staff a single point of monitoring and instant mobile alerts whenever an unauthorized entry is attempted.',
  },
  {
    id: '3',
    title: '25kVA Solar Installation for a Rural Clinic',
    date: '2025-02-10',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
    description:
      'Delivered a 25kVA solar system with battery backup to keep a rural clinic running through load-shedding, powering refrigeration for vaccines, lighting, and essential medical equipment. Includes remote energy monitoring so the facility manager can track battery health and generation from a phone.',
  },
  {
    id: '4',
    title: 'Network Infrastructure Rollout for a Retail Chain',
    date: '2024-11-22',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop',
    description:
      'Rolled out structured cabling, routing, and switching across five retail branches to support point-of-sale systems and head-office connectivity. Standardizing the network design across branches made troubleshooting and future expansion far simpler for the client\'s small IT team.',
  },
  {
    id: '5',
    title: 'Water Quality Monitoring Calibration Program',
    date: '2024-09-05',
    image: 'https://images.unsplash.com/photo-1565608438257-fac3c27beb36?q=80&w=1200&h=800&fit=crop',
    description:
      'Ran an on-site calibration and repair program for a municipal water treatment facility, covering pH meters, conductivity monitors, turbidity meters, and chlorine detection systems. Regular calibration brought all instruments back within compliance tolerances ahead of a regulatory audit.',
  },
];
