import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanstackProvider from '../providers/TanstackProvider';
import DataSetProvider from '../providers/DataSetProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'data thing',
  description: 'another chart app project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <DataSetProvider>{children}</DataSetProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
