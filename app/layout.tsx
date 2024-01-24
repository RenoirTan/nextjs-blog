import { siteTitle } from '../components/layout';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}