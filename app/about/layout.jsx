import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";

export const metadata = {
  title: "About Us",
  description: "Travel Agency About Us",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Hero text="About Us" />
      {children}
      <Footer />
    </>
  );
}
