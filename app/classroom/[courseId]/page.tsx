import { LayoutShell } from '@/components/layout-shell';
import { VideoPlayer } from '@/components/video-player';

export default function ClassroomPage({ params }: { params: { courseId: string } }) {
  return (
    <LayoutShell>
      <h1 className="mb-4 text-2xl font-semibold">Classroom</h1>
      <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-lg">
        <VideoPlayer lessonId={params.courseId} watermarkText="Student Name | Index 0000" />
      </div>
    </LayoutShell>
  );
}
