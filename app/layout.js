export const metadata = {
  title: 'AI Patent Assistant',
  description: 'Analyze your invention ideas with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
