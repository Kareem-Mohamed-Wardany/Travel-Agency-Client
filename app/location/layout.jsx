import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";

export const metadata = {
  title: "Location",
  description: "Travel Agency Location",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Hero text="Our Location" />
      {children}
      <Footer />
    </>
  );
}
