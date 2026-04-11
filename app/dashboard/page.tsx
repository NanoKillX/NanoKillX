import { LayoutShell } from '@/components/layout-shell';
import { StudentBottomNav } from '@/components/student-bottom-nav';

export default function StudentDashboard() {
  return (
    <LayoutShell>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">Paid Courses</div>
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">Marks Chart</div>
        <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">Announcements</div>
      </div>
      <StudentBottomNav />
    </LayoutShell>
  );
}
