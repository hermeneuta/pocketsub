import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pocket',
  description: 'Manage your subs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
