import type { Metadata } from 'next' 
import { Providers } from './Provider'
import './globals.css'; 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const metadata: Metadata = {
  title: 'Chasescroll',
  description: 'Making your events great!',
  manifest: '/manifest.json',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    // <Providers>
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" /> 
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </head>
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>

  )
}
