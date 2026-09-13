import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/prismicio';
import { galleryItems as fallbackGalleryItems } from '@/lib/galleryData';

export const metadata: Metadata = {
  title: 'Gallery | Jambsmash Investments',
  description:
    'A look at Jambsmash Investments in the field — automation, security, solar, and telecommunications work captured on site.',
  alternates: {
    canonical: 'https://jambsmash.co.zw/gallery',
  },
  openGraph: {
    title: 'Gallery | Jambsmash Investments',
    description:
      'A look at Jambsmash Investments in the field — automation, security, solar, and telecommunications work captured on site.',
    type: 'website',
  },
};

export default async function GalleryPage() {
  const client = createClient();
  const documents = await client.getAllByType('gallery_image');

  const galleryItems = documents.length
    ? documents.map((doc) => ({
        id: doc.id,
        image: doc.data.gallery_image.url ?? '',
        alt: doc.data.gallery_image.alt ?? doc.data.fig_caption_for_image ?? 'Gallery image',
        caption: doc.data.fig_caption_for_image ?? '',
      }))
    : fallbackGalleryItems.map((item) => ({
        id: item.id,
        image: item.image,
        alt: item.caption,
        caption: item.caption,
      }));

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-orange to-brand-accent">
                Gallery
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-orange to-brand-accent mx-auto rounded-full mb-8" />
            <p className="max-w-2xl mx-auto text-lg text-brand-light/80 leading-relaxed">
              A glimpse of our work on site — installations, commissioning, and the team behind them.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item) => (
              <figure
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-500 bg-brand-dark/10"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/10 to-transparent" />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-brand-light font-medium leading-snug">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
