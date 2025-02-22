"use client";
import {
  Users,
  Globe,
  Star,
  MapPin,
  Briefcase,
  MessageCircle,
} from "lucide-react";

const AboutUs = () => {
  return (
    <section className=" bg-gray-50 text-gray-800">
      {/* Our Mission */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600">
          At <span className="font-semibold">Travel Agency</span>, we are
          committed to crafting unforgettable journeys, making travel seamless,
          adventurous, and enriching.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
              <Globe size={40} className="text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">
                Global Destinations
              </h3>
              <p className="text-gray-600 mt-2">
                Explore amazing places around the world.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
              <Star size={40} className="text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Top-Rated Service</h3>
              <p className="text-gray-600 mt-2">
                We provide 5-star experiences for all travelers.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
              <MapPin size={40} className="text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">
                Tailored Experiences
              </h3>
              <p className="text-gray-600 mt-2">
                Customized trips to fit your travel style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center">
            <Briefcase size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center">
            <Users size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Jane Smith</h3>
            <p className="text-gray-600">Travel Expert</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xs text-center">
            <MapPin size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Michael Brown</h3>
            <p className="text-gray-600">Tour Guide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
