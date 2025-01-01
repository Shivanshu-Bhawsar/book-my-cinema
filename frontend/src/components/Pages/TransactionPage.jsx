import React, { useEffect, useState } from "react";
import TicketBox from "../common/TicketBox";
import { fetchAllBookings } from "../../redux/reducer/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeSlider from "../common/HomeSlider";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.book);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const formatDate = (isoDateString, timing, show) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const weekday = weekdays[date.getDay()];

    // Extract the hour and the period (am/pm) from the timing parameter
    const [startHour, period] = timing.split(/[-]+/);

    // Determine if the period is AM or PM
    const ampm = period.toLowerCase().includes("pm") ? "PM" : "AM";

    // Parse the start hour to an integer and format it to 12-hour format if necessary
    const formattedHour = parseInt(startHour) % 12 || 12;

    return `${weekday},  ${day} ${month} ${year} | ${formattedHour} ${ampm}`;
  };

  const ticketClickHandler = (booking) => {
    setSelectedBooking(booking);
  };

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="my-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Booking History
        </h1>
        {loading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div className="sm:w-[72%] md:w-[60%] mt-3 mb-3 sm:mt-5 px-4 sm:px-7 flex flex-col flex-wrap justify-center items-center gap-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white w-full rounded-md sm:shadow-lg border-b-2 space-y-4 cursor-pointer"
                onClick={() => ticketClickHandler(booking)}
              >
                <div className="w-full p-3 flex items-center justify-between gap-5">
                  <div className="flex justify-start items-center gap-5">
                    <div>
                      <img
                        src={booking.showId.movieId.thumbnail}
                        className="w-[65px] h-[75px] sm:w-[65px] sm:h-[65px] object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <h2 className="sm:text-[15px] text-[12px] font-[600] font-sans">
                        {booking.showId.movieId.movieName}
                      </h2>
                      <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs hidden sm:block">{`${formatDate(
                        booking.showId.showStart,
                        booking.showId.timing,
                        booking.showId.showEnd
                      )} | ${booking.bookedSeats.length} Ticket`}</p>
                      <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs block sm:hidden">{`${formatDate(
                        booking.showId.showStart,
                        booking.showId.timing,
                        booking.showId.showEnd
                      )}`}</p>
                      <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs block sm:hidden">{`${booking.bookedSeats.length} Ticket`}</p>
                      <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs capitalize">{`${booking.showId.cinemaId.cinemaName}, ${booking.showId.cinemaId.cityId.cityName}`}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] text-red-600 flex items-center justify-center h-full">
                      <MdOutlineCurrencyRupee />
                      {`${booking.totalAmount / 100}`}
                    </p>
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
