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

const SITE_URL = 'https://vinod-kumar-maurya-portfolio.vercel.app';
const TITLE = 'Vinod Kumar Maurya — Software Engineer, Shayar & Builder';
const DESCRIPTION =
  'Portfolio of Vinod Kumar Maurya — Software Engineer at Machani Group, IIT Kharagpur dual-degree, shayar and startup builder. React, Next.js, Django & FastAPI.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Vinod Kumar Maurya',
  authors: [{ name: 'Vinod Kumar Maurya', url: SITE_URL }],
  creator: 'Vinod Kumar Maurya',
  keywords: [
    'Vinod Kumar Maurya',
    'Software Engineer',
    'Full Stack Developer',
    'IIT Kharagpur',
    'React',
    'Next.js',
    'Django',
    'FastAPI',
    'Shayari',
    'Portfolio',
    'Bengaluru',
  ],
  themeColor: '#0b0b18',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Vinod Kumar Maurya',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vinod Kumar Maurya — Software Engineer, Shayar & Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
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
