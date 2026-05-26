import './globals.css';

export const metadata = {
  title: 'Plataforma Repique IA',
  description: 'MVP de repique de leads com IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
