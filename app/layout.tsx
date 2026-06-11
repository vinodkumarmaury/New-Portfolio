import './globals.css';
import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Vinod Kumar Maurya - Playground OS Portfolio',
  description: 'A neon glass portfolio with gaming-inspired motion and interactive project showcases',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} dark`}>
        {children}
      </body>
    </html>
  );
}