export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function extractYouTubeVideoId(input: string) {
  const trimmed = input.trim();
  const idRegex = /^[A-Za-z0-9_-]{11}$/;
  if (idRegex.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  throw new Error('Invalid YouTube URL/ID');
}

export function md5(input: string) {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(input).digest('hex').toUpperCase();
}
