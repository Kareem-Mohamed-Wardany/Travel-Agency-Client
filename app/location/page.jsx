"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const OurLocation = () => {
  return (
    <section className=" bg-gray-50 text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <p className="text-lg text-gray-600 mt-4">
          Visit us at our office or reach out to us for any inquiries.
        </p>

        {/* Location Details */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
          {/* Google Maps Embed */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Maps"
              className="w-full h-64 md:h-80"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.8438218628166!2d-122.40127202417948!3d37.78583427197488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b5a0c6e1%3A0xa40bf2c65b8ac2b8!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1616129426111!5m2!1sen!2s"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin size={28} className="text-blue-600" />
              <p className="text-lg font-medium">
                123 Travel St, San Francisco, CA, USA
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={28} className="text-blue-600" />
              <p className="text-lg font-medium">+1 234 567 890</p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail size={28} className="text-blue-600" />
              <p className="text-lg font-medium">contact@travelagency.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <Clock size={28} className="text-blue-600" />
              <p className="text-lg font-medium">
                Mon - Fri: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
