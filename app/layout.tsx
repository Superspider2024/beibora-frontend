import TopNav from "@/components/TopNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-white text-black dark:bg-gray-950 dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <TopNav />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}