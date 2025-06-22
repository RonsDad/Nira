import ClientLayout from './client-layout'
import "../src/index.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nira AI Healthcare Solutions',
  description: 'Advanced AI-powered healthcare solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
