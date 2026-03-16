import './globals.css'

export const metadata = {
  title: 'MagMount Pro',
  description: 'Professional magnetic mounting solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}