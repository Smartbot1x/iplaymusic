
import "./globals.css";



export const metadata = {
  title: {
    template: "%s | iPlayMusic",
    default: "iPlayMusic"

  },
  description: "Discover, Play, and Share Your Favorite Tunes with iPlayMusic - spotify clone",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

      >
        <header>
          {/* Header can go here */}


        </header>
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
