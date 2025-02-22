import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";

export const metadata = {
  title: "My Reservations",
  description: "Travel Agency Reservations",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Hero text="My Reservations" />
      {children}
      <Footer />
    </>
  );
}
