import { LayoutShell } from '@/components/layout-shell';

export default function LoginPage() {
  return (
    <LayoutShell>
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-lg">
        <h2 className="text-xl font-semibold">Login</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Use Supabase Auth UI or custom auth form integration.</p>
      </div>
    </LayoutShell>
  );
}
