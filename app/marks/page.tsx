import { LayoutShell } from '@/components/layout-shell';

export default function MarksPage() {
  return (
    <LayoutShell>
      <div className="overflow-x-auto rounded-xl bg-white p-5 shadow-md dark:bg-gray-800 dark:shadow-lg">
        <table className="min-w-[600px] w-full text-sm">
          <thead><tr><th className="text-left">Exam</th><th className="text-left">Marks</th><th className="text-left">Rank</th></tr></thead>
          <tbody><tr><td>Sample</td><td>0</td><td>-</td></tr></tbody>
        </table>
      </div>
    </LayoutShell>
  );
}
