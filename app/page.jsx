import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import Trips from "@/components/Home/Trips";
import Footer from "@/components/Home/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <Hero text="Explore the World with Us" />
      <Trips />
      <Footer />
    </>
  );
}
//  const fullName = clientUser?.userName;
