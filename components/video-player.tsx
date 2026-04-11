'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  lessonId: string;
  watermarkText: string;
};

export function VideoPlayer({ lessonId, watermarkText }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [position, setPosition] = useState({ top: '20%', left: '15%' });

  useEffect(() => {
    fetch(`/api/lesson/${lessonId}`)
      .then(async (res) => {
        if (res.status === 403) {
          setBlocked(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.videoId) setVideoId(data.videoId);
      });
  }, [lessonId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const top = `${10 + Math.random() * 70}%`;
      const left = `${5 + Math.random() * 80}%`;
      setPosition({ top, left });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const embedUrl = useMemo(() => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  }, [videoId]);

  if (blocked) {
    return <div className="rounded-xl bg-gray-200 p-10 text-center dark:bg-gray-800">Pay to unlock</div>;
  }

  return (
    <div
      className="relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {embedUrl ? (
        <iframe
          className="h-[220px] w-full rounded-xl md:h-[480px]"
          src={embedUrl}
          title="Lesson video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="h-[220px] w-full rounded-xl bg-gray-200 dark:bg-gray-800 md:h-[480px]" />
      )}
      <div
        className="pointer-events-none absolute text-xl font-bold text-white"
        style={{
          opacity: 0.18,
          transform: 'rotate(-25deg)',
          top: position.top,
          left: position.left
        }}
      >
        {watermarkText}
      </div>
    </div>
  );
}
