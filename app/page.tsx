import Link from 'next/link';
import { LayoutShell } from '@/components/layout-shell';

export default function HomePage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-lg transition-colors duration-300">
        <h1 className="text-3xl font-bold">Welcome to DHMaths.lk</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Secure tuition LMS for admin, students and parents.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-3 text-white dark:bg-blue-400 dark:text-gray-900">Login</Link>
        </div>
      </section>
    </LayoutShell>
  );
}
