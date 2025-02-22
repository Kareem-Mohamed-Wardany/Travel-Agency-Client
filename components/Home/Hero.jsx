import Image from "next/image";
import heroImg from "@/assets/images/hero.jpg";
const Hero = ({ text }) => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[420px] lg:h-[450px] xl:h-[600px] overflow-hidden">
        <Image
          src={heroImg}
          alt="Explore the World"
          layout="fill"
          objectFit="cover"
          loading="eager"
          priority
        />
        {/* Responsive text overlay */}
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center drop-shadow-md">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
