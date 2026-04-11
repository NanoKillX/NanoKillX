'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', label: 'Home' },
  { href: '/classroom/demo', label: 'Class' },
  { href: '/exams', label: 'Exams' },
  { href: '/marks', label: 'Marks' },
  { href: '/payment', label: 'Pay' }
];

export function StudentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex min-h-12 items-center justify-center text-xs ${pathname.startsWith(item.href) ? 'text-blue-600 dark:text-blue-400' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
