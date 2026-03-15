import "./globals.css";
import Navigation from "../components/Navigation";
import ClientScripts from "../components/ClientScripts";

export const metadata = {
  title: "Ravish Productions — SMM Agency",
  description: "Ravish Productions — SMM-агентство полного цикла. Сторис, фото, видео и продвижение в социальных сетях.",
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navigation />
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}
