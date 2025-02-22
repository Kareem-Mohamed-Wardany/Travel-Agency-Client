"use client";
import TripTile from "../cards/trip-tile";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrips } from "@/store/user/trips-slice";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../common/loading";
const Trips = ({
  Admin = false,
  setFormData = null,
  setOpenCreateTripsDialog = null,
  setCurrentEditedId = null,
  handleDelete = null,
}) => {
  const dispatch = useDispatch();
  const { tripList, pagination, isLoading } = useSelector(
    (state) => state.userTrips
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [reFetch, setReFetch] = useState(true);

  useEffect(() => {
    dispatch(fetchAllTrips(currentPage));
  }, [dispatch, currentPage, reFetch]);

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {isLoading && <Loading text="Fetching Trips..." size={32} />}
      {!isLoading && (
        <section className="py-10 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            {!Admin && (
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Our Available Trips
              </h1>
            )}

            {/* Trips Flexbox Layout */}
            <div className="flex flex-wrap justify-center gap-6">
              {tripList?.length > 0 ? (
                tripList.map((trip) => (
                  <div
                    key={trip._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <TripTile
                      trip={trip}
                      isAdmin={Admin}
                      setFormData={setFormData}
                      setOpenCreateTripsDialog={setOpenCreateTripsDialog}
                      setCurrentEditedId={setCurrentEditedId}
                      handleDelete={handleDelete}
                      setReFetch={setReFetch}
                      reFetch={reFetch}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full text-center text-gray-500 text-lg">
                  No Trips Available
                </div>
              )}
            </div>
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300
        ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-900 text-white shadow-md"
        }`}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {/* Page Number Display */}
                <span className="px-4 py-2 text-lg font-semibold text-white bg-gray-900 rounded-full shadow-md">
                  {currentPage}/{pagination.totalPages}
                </span>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pagination.totalPages}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300
        ${
          currentPage === pagination.totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-900 text-white shadow-md"
        }`}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Trips;
