"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  BusFront,
  Users,
  Info,
} from "lucide-react";
import Loading from "@/components/common/loading";
import { useRouter } from "next/navigation";

const ReservationsPage = () => {
  const router = useRouter();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const data = await fetch(
        `http://localhost:5000/api/v1/user/reservation/reserved-trips?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = await data.json();
      if (res.success) {
        console.log(res);
        setReservations(res.data.reservedTrips);
        setTotalPages(res.data.pagination.totalPages);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <Loading text="Fetching Reservations..." size={32} />
      ) : reservations.length > 0 ? (
        <>
          <div className="space-y-4">
            {reservations.map((trip) => (
              <Card key={trip._id} className="shadow-md">
                <CardContent className="p-4 flex items-start gap-6">
                  <img
                    src={trip.image}
                    alt={trip.Name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2 text-gray-700 text-sm">
                    <h2 className="text-lg font-semibold">{trip.Name}</h2>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-700" />
                      <span className="font-medium">Location:</span>
                      <span className="font-semibold">{trip.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-700" />
                      <span className="font-medium">Departure:</span>
                      <span className="font-semibold">
                        {new Date(trip.departureDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-700" />
                      <span className="font-medium">Duration:</span>
                      <span className="font-semibold">{trip.duration}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <BusFront className="w-4 h-4 text-purple-700" />
                      <span className="font-medium">Transport:</span>
                      <span className="font-semibold">
                        {trip.transportation}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-700" />
                      <span className="font-medium">Seats:</span>
                      <span className="font-semibold">
                        {trip.availableSeats}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-700" />
                      <span className="font-medium">Extra:</span>
                      <span className="font-semibold">
                        {trip.extra || "N/A"}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </Button>

            <span className="text-lg font-semibold">
              {page} / {totalPages}
            </span>

            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationsPage;
