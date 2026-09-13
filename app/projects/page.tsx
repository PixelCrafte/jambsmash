import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/prismicio';
import { projects as fallbackProjects } from '@/lib/projectsData';

export const metadata: Metadata = {
  title: 'Projects | Jambsmash Investments',
  description:
    'Recent automation, security, solar, and telecommunications projects delivered by Jambsmash Investments.',
  alternates: {
    canonical: 'https://jambsmash.co.zw/projects',
  },
  openGraph: {
    title: 'Projects | Jambsmash Investments',
    description:
      'Recent automation, security, solar, and telecommunications projects delivered by Jambsmash Investments.',
    type: 'website',
  },
};

function formatDate(dateString: string | null) {
  if (!dateString) return 'Undated';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ProjectsPage() {
  const client = createClient();
  const documents = await client.getAllByType('project', {
    orderings: { field: 'my.project.date', direction: 'desc' },
  });

  const sortedProjects = documents.length
    ? documents.map((doc) => ({
        id: doc.id,
        title: doc.data.title ?? 'Untitled project',
        date: doc.data.date,
        image: doc.data.image.url ?? '',
        alt: doc.data.image.alt ?? doc.data.title ?? 'Project image',
        description: doc.data.description ?? '',
      }))
    : [...fallbackProjects]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((project) => ({ ...project, alt: project.title }));

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-orange to-brand-accent">
                Projects
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-orange to-brand-accent mx-auto rounded-full mb-8" />
            <p className="max-w-2xl mx-auto text-lg text-brand-light/80 leading-relaxed">
              A record of engineering work we&apos;ve delivered for our clients.
            </p>
          </header>

          <div className="space-y-10">
            {sortedProjects.map((project) => (
              <article
                key={project.id}
                className="group grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-500 bg-brand-dark/10 backdrop-blur-xl"
              >
                <div className="relative md:col-span-2 aspect-[4/3] md:aspect-auto">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <time
                    dateTime={project.date}
                    className="text-sm font-semibold tracking-wide text-brand-accent uppercase mb-3"
                  >
                    {formatDate(project.date)}
                  </time>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-brand-light/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
