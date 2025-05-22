import "./globals.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Boston Gaming",
  description: "Boston Gaming web-shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
