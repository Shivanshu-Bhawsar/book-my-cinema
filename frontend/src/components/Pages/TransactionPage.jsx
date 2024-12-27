import React, { useEffect, useState } from "react";
import TicketBox from "../common/TicketBox";
import { fetchAllBookings } from "../../redux/reducer/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.book);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const ticketClickHandler = (booking) => {
    setSelectedBooking(booking); // Set the clicked booking for display
  };

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  if (loading) {
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="custom-loader"></div>
    </div>;
  }

  if (!bookings || bookings.length === 0)
    return <p className="text-center text-lg mt-5">No bookings found.</p>;

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-3 mb-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Booking History
        </h1>
        <div className="mt-5 px-5 sm:px-7 flex flex-wrap justify-center items-center gap-7">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-lg space-y-4"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  Booking ID:{" "}
                  <span className="text-gray-600 font-medium">
                    {booking._id}
                  </span>
                </p>
                {booking?.showId && (
                  <>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      Movie:{" "}
                      <span className="text-blue-600 font-medium">
                        {booking.showId.movieId?.movieName || "N/A"}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      Release Date:{" "}
                      <span className="text-gray-500 font-medium">
                        {booking.showId.movieId?.releaseDate
                          ? formatDate(booking.showId.movieId.releaseDate)
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      Cinema:{" "}
                      <span className="text-blue-600 font-medium">
                        {booking.showId.cinemaId?.cinemaName || "N/A"}
                      </span>
                    </p>
                  </>
                )}
                <button
                  onClick={() => ticketClickHandler(booking)}
                  className="w-fit mt-3 px-5 py-2 rounded-lg bg-rose-500 text-white"
                >
                  View Ticket
                </button>
              </div>
            </div>
          ))}

          {selectedBooking && (
            <TicketBox
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
