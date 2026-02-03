
import "./globals.css";
import Footer from "../components/footer";
import ThemeProvider from "@/contexts/ThemeContext";



export const metadata = {
  title: {
    template: "%s | iPlayMusic",
    default: "iPlayMusic"

  },
  description: "Discover, Play, and Share Your Favorite Tunes with iPlayMusic - spotify clone",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <header>



          </header>
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
