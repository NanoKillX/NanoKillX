import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 transition-colors duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="font-semibold text-blue-600 dark:text-blue-400">DHMaths.lk</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
