import { Footer } from './footer';
import { Navbar } from './navbar';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
