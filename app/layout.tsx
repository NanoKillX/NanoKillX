import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata = {
  title: 'DHMaths.lk LMS',
  description: 'Secure LMS for Sri Lankan mathematics tuition'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
