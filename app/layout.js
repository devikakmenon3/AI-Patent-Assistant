import './globals.css';

export const metadata = {
  title: 'AI Patent Assistant',
  description: 'Intelligent patent search',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
