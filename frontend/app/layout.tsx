import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Synergia Event Booking',
  description: 'Book your tickets for Synergia - The ultimate tech event',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
