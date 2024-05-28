import type { Metadata } from 'next';
import { Barlow, Barlow_Semi_Condensed, Space_Mono } from 'next/font/google';
import './globals.css';
import TanstackProvider from '@/providers/TanstackProvider';
import Theme from '@/providers/Theme';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-barlow',
});
const barlowcondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-barlow-condensed',
});
const spacemono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'data thing',
  description: 'another chart app project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // use dark theme between 6pm and 6am
  const time = new Date().getHours();
  const theme = time < 6 || time >= 18 ? 'dark' : 'light';
  return (
    <html lang="en">
      <body
        className={`${barlow.className} ${barlowcondensed.variable} ${spacemono.variable} ${theme}`}
      >
        <Theme mode={theme}>
          <TanstackProvider>{children}</TanstackProvider>
        </Theme>
      </body>
    </html>
  );
}
