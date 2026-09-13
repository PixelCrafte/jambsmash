export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

// Placeholder content. Swap this array for a Prismic query once the
// "gallery_image" custom type is wired up (see PRISMIC_SETUP.md).
export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&h=700&fit=crop',
    caption: 'Control panel installation for an industrial automation upgrade',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=700&fit=crop',
    caption: 'HD CCTV camera commissioning at a client site in Harare',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&h=700&fit=crop',
    caption: 'Rooftop solar array wired in for a commercial client',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&h=700&fit=crop',
    caption: 'Structured network cabling for a new office fit-out',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1565608438257-fac3c27beb36?q=80&w=900&h=700&fit=crop',
    caption: 'Field calibration of a water quality analyzer',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1581093458791-9d42e3f6d0f6?w=900&h=700&fit=crop',
    caption: 'Our engineers on site during a switchgear inspection',
  },
];
