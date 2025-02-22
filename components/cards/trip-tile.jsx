import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import MoneyFormat from "@/utils/MoneyFormat";
import ReservationModel from "../common/ReservationModel";
import {
  Calendar,
  MapPin,
  Clock,
  BusFront,
  Users,
  Info,
  BookMarkedIcon,
  X,
  User,
} from "lucide-react";

function TripTile({
  trip,
  setFormData,
  setOpenCreateTripsDialog,
  setCurrentEditedId,
  handleDelete,
  isAdmin,
  setReFetch,
  reFetch,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Book = trip.availableSeats > trip.reservations;
  let userBooked = false;

  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    userBooked = trip.reservedBy.some(
      (reservation) => reservation.userId === user.id
    );
  }

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/v1/user/reservation/book/${trip._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    if (!res.success) {
      if (res.statusCode === 401)
        toast.error("Guests | Admins Can not Book Trips");
      return;
    }
    toast.success(res.msg);
    setReFetch(!reFetch);
  };

  const handleCancelBook = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/v1/user/reservation/cancel/${trip._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    if (!res.success) {
      toast.error(res.msg);
      return;
    }
    toast.success(res.msg);
    setReFetch(!reFetch);
  };

  return (
    <>
      <Card className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="relative">
          <img
            src={trip?.image}
            alt={trip?.Name}
            className="w-full h-[300px] object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-red-900 mb-2 text-center">
            {trip?.Name}
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            {trip?.description}
          </p>

          <div className="flex flex-col gap-2 text-gray-700 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-700" />
              <span className="font-medium">Location:</span>
              <span className="font-semibold">{trip?.location}</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-700" />
              <span className="font-medium">Departure:</span>
              <span className="font-semibold">{trip?.departureDate}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-700" />
              <span className="font-medium">Duration:</span>
              <span className="font-semibold">{trip?.duration}</span>
            </p>
            <p className="flex items-center gap-2">
              <BusFront className="w-4 h-4 text-purple-700" />
              <span className="font-medium">Transport:</span>
              <span className="font-semibold">{trip?.transportation}</span>
            </p>
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-700" />
              <span className="font-medium">Seats:</span>
              <span className="font-semibold">{trip?.availableSeats}</span>
            </p>
            <p className="flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-700" />
              <span className="font-medium">Extra:</span>
              <span className="font-semibold">{trip?.extra || "N/A"}</span>
            </p>
          </div>

          <div className="mt-4 flex justify-center">
            <span className="text-xl font-bold text-primary">
              EGP {MoneyFormat(trip?.price)}
            </span>
          </div>
        </CardContent>
        {isAdmin ? (
          <CardFooter className="p-4 flex justify-between items-center bg-gray-100 rounded-b-lg">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 text-white hover:bg-gray-900 rounded-lg px-4 py-2"
            >
              Reservations
            </Button>
            <Button
              onClick={() => {
                setOpenCreateTripsDialog(true);
                setCurrentEditedId(trip?._id);
                setFormData(trip);
              }}
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(trip?._id)}
              className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2"
            >
              Delete
            </Button>
          </CardFooter>
        ) : (
          <CardFooter className="p-4 flex justify-center bg-gray-100 rounded-b-lg">
            <Button
              onClick={() => (userBooked ? handleCancelBook() : handleBook())}
              disabled={!userBooked && !Book}
              className={`text-white rounded-lg px-4 py-2 w-full flex items-center gap-2 ${
                userBooked
                  ? "bg-red-600 hover:bg-red-700"
                  : Book
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-gray-900 cursor-not-allowed"
              }`}
            >
              <BookMarkedIcon />
              {userBooked ? "Cancel Booking" : Book ? "Book" : "Fully Booked"}
            </Button>
          </CardFooter>
        )}
      </Card>

      {isModalOpen && (
        <ReservationModel trip={trip} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}

export default TripTile;
