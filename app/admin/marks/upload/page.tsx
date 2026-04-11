import { AdminLayout } from '@/components/admin-layout';

export default function MarksUploadPage() {
  return (
    <AdminLayout>
      <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">
        Upload Excel/CSV marks with validation preview and error highlighting.
      </div>
    </AdminLayout>
  );
}
