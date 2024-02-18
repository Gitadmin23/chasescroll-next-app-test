import type { Metadata } from 'next' 
import { Providers } from './Provider'
import './globals.css'; 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { StyledEngineProvider } from '@mui/material/styles';

const APP_NAME = "Chasescroll";
const APP_DEFAULT_TITLE = "Creating Unforgetable Memories";
const APP_TITLE_TEMPLATE = "%s - Chasescroll App";
const APP_DESCRIPTION = "Creating Unforgetable Memories";


export const metadata: Metadata = {
  // title: {
  //   default: APP_DEFAULT_TITLE,
  //   template: APP_TITLE_TEMPLATE
  // },
  title: APP_DEFAULT_TITLE,
  description: 'Creating Unforgetable Memories',
  manifest: '/manifest.json',
  applicationName: 'Chasescroll',
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: APP_DEFAULT_TITLE,
  //   // startUpImage: [],
  // },
  // formatDetection: {
  //   telephone: false,
  // },
  // openGraph: {
  //   type: "website",
  //   siteName: APP_NAME,
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
  // twitter: {
  //   card: "summary",
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },

}

// export const viewport: Viewport = {
//   maximumScale: 1,
//   minimumScale: 1.5,
//   initialScale: 1,
//   viewportFit: 'cover',

// };

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
    <StyledEngineProvider injectFirst>
          {children}
          </StyledEngineProvider>
        </Providers>
      </body>
    </html>

  )
}
