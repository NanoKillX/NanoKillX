'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LayoutShell } from './layout-shell';

const links = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/courses', 'Courses'],
  ['/admin/recordings', 'Recordings'],
  ['/admin/students', 'Students'],
  ['/admin/marks/upload', 'Marks Upload'],
  ['/admin/exams', 'Exams'],
  ['/admin/payments', 'Payments'],
  ['/admin/announcements', 'Announcements']
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LayoutShell>
      <button onClick={() => setOpen((v) => !v)} className="mb-3 min-h-12 rounded-lg bg-blue-600 px-4 text-white md:hidden">Menu</button>
      <div className="grid gap-4 md:grid-cols-[220px,1fr]">
        <aside className={`${open ? 'block' : 'hidden'} rounded-xl bg-white p-3 shadow-md dark:bg-gray-800 md:block`}>
          <ul className="space-y-2">
            {links.map(([href, label]) => (
              <li key={href}><Link className="block min-h-12 rounded-lg px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" href={href}>{label}</Link></li>
            ))}
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </LayoutShell>
  );
}
