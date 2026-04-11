import { LayoutShell } from '@/components/layout-shell';

export default function ParentDashboardPage() {
  return (
    <LayoutShell>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800">Student Marks</div>
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800">Payment Status</div>
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800">SMS Preferences</div>
      </div>
    </LayoutShell>
  );
}
