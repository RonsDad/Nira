import { Providers } from './providers'
import "@/index.css";

export const metadata = {
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
