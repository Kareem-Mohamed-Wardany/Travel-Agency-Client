import React from "react";
import { X, User } from "lucide-react";
const ReservationModel = ({ setIsModalOpen, trip }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Reservations
        </h2>

        {/* Reservations List */}
        {trip.reservedBy.length > 0 ? (
          <ul className="space-y-3">
            {trip.reservedBy.map((res) => (
              <li
                key={res._id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <User size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium">{res.userId.fullName}</p>
                  <p className="text-gray-500 text-sm">
                    Reserved At: {new Date(res.reservedAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No reservations yet.</p>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
        >
          <X size={18} />
          Close
        </button>
      </div>
    </div>
  );
};

export default ReservationModel;
