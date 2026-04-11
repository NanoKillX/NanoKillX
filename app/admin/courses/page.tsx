import { AdminLayout } from '@/components/admin-layout';

export default function Page() {
  return (
    <AdminLayout>
      <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">
        Admin courses management page.
      </div>
    </AdminLayout>
  );
}
