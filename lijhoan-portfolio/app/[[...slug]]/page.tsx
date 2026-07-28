import ClientPage from './client-page';

const SECTIONS = ['about', 'projects', 'skills', 'experience', 'certifications', 'contact'];

// Pre-renderiza la raíz y las 6 secciones para el export estático (Azure).
export function generateStaticParams() {
  return [{ slug: undefined }, ...SECTIONS.map((section) => ({ slug: [section] }))];
}

export default function SlugPage() {
  return <ClientPage />;
}
