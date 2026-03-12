import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "sudo hack --target=world | Sudeep Ravichandran",
  description:
    "Offensive Security & Cybersecurity Risk Management. MS @ Indiana University Bloomington. AI-driven security researcher and full-stack developer.",
  keywords: ["cybersecurity", "offensive security", "penetration testing", "AI security", "full stack"],
  authors: [{ name: "Sudeep Ravichandran" }],
  openGraph: {
    title: "sudo hack --target=world | Sudeep Ravichandran",
    description: "Offensive Security & Cybersecurity Risk Management. MS @ IUB.",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          FAVICON — >_ terminal-prompt style (current, inline SVG, no file needed)
          To use a proper multi-size favicon instead:
          1. Go to https://favicon.io/emoji-favicons/
          2. Search for 💀 or 🔐 and download the pack
          3. Drop favicon.ico into /public/ and remove this <link> tag
        */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23060a0f' rx='14'/><text y='62' x='8' font-size='52' font-family='monospace' font-weight='bold' fill='%2300d4ff'>%3E_</text></svg>"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
