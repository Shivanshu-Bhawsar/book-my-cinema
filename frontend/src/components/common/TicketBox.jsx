import React, { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsInfoLg } from "react-icons/bs";
// import { FaRegCircleCheck } from "react-icons/fa6";

const TicketBox = ({ booking, onClose }) => {
  const [regularSeat, setRegularSeat] = useState([]);
  const [vipSeat, setVipSeat] = useState([]);
  const [bolconySeat, setBolconySeat] = useState([]);

  useEffect(() => {
    let countReg = [];
    let countVip = [];
    let countBol = [];

    if (booking) {
      booking.bookedSeats.map((seat) => {
        if (seat.seatId.seatType === "REGULAR") {
          countReg.push(seat.seatId.seatNumber);
        } else if (seat.seatId.seatType === "BALCONY") {
          countBol.push(seat.seatId.seatNumber);
        } else {
          countVip.push(seat.seatId.seatNumber);
        }
      });
    }

    setBolconySeat(countBol);
    setRegularSeat(countReg);
    setVipSeat(countVip);
  }, []);

  if (!booking) {
    return null;
  }

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

  const handleBackgroundClick = (e) => {
    // Close modal if the background (not the modal content) is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed sm:p-0 p-2 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white sm:p-6 p-2 rounded-md sm:rounded-lg shadow-lg max-w-xl">
        <div className="pt-2 pb-2 mt-3 mb-3 border-[rgb(237,241,236)] p-2 border-[1px] rounded-t-md flex items-center justify-between">
          <p className="font-semibold uppercase text-[rgb(31,31,31)]">
            Ticket details
          </p>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-lg text-gray-600 hover:text-black"
          />
        </div>
        <div>
          <div className="w-full flex items-start p-2 justify-start gap-5 h-auto border-l-[rgb(237,241,236)] border-r-[rgb(237,241,236)] border-l-[1px] border-r-[1px]">
            <div className="flex-shrink-0">
              <img
                src={booking.showId.movieId.thumbnail}
                className="w-[80px] h-[120px] object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col h-full gap-2">
              <h2 className="sm:text-[15px] text-[13px] font-[600] text-[rgb(31,31,31)] font-sans">
                {booking.showId.movieId.movieName}
              </h2>
              <div className="flex flex-col gap-1">
                <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs">
                  {`${booking.showId.movieId.supportingLanguages}, 2D`}
                </p>
                <p className="text-[rgb(31,31,31)] sm:text-[13px] text-xs">{`${formatDate(
                  booking.showId.showStart,
                  booking.showId.timing,
                  booking.showId.showEnd
                )}`}</p>
                <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs capitalize">{`${booking.showId.cinemaId.cinemaName}, ${booking.showId.cinemaId.cityId.cityName}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="w-full h-[1px] border-dashed border-[rgb(237,241,236)]] border-[1px]"></div>
        </div>
        <div className="flex items-center justify-center flex-col gap-2 p-5 w-full">
          <p className="text-[rgb(139,139,139)] sm:text-[13px] text-xs">
            {`${booking.bookedSeats.length} Ticket's`}
          </p>
          <div className="text-[rgb(31,31,31)] sm:text-[13px] text-xs flex flex-col gap-2 items-center justify-center">
            {vipSeat.length !== 0 && (
              <p>{`VIP - ${vipSeat.map((seatNum) => seatNum).join(", ")}`}</p>
            )}
            {bolconySeat.length !== 0 && (
              <p>{`BALCONY - ${bolconySeat
                .map((seatNum) => seatNum)
                .join(", ")}`}</p>
            )}
            {regularSeat.length !== 0 && (
              <p>{`REGULAR - ${regularSeat
                .map((seatNum) => seatNum)
                .join(", ")}`}</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="w-full h-[1px] border-dashed border-[rgb(237,241,236)]] border-[1px]"></div>
        </div>
        <div className="flex w-full items-center justify-center p-2 flex-col gap-4 border-l-[rgb(237,241,236)] border-r-[rgb(237,241,236)] border-l-[1px] border-r-[1px] border-b-[rgb(237,241,236)] border-b-[1px]">
          <img
            src={booking.qrImage}
            alt="QR Code"
            className="mt-4 w-[60px] h-[60px]"
          />
          <span className="w-full flex items-center justify-center ">
            <p className="text-[rgb(139,139,139)] text-xs sm:text-[13px] font-semibold">
              Booking ID:
              <span className="text-[rgb(31,31,31)] uppercase">
                {" "}
                {`${booking._id.substring(1, 10)}`}
              </span>
            </p>
          </span>
          <p className="text-[rgb(133,133,133)] sm:text-[13px] text-[10px] text-center text-sans">
            {" "}
            <BsInfoLg className="text-red-500 inline text-[13px]" /> This
            booking cannot be cancelled as per cinema cancellation policy.
          </p>
        </div>
        <p className="font-medium text-[20px] text-center mt-3 text-rose-500">
          𝒯𝒽𝒶𝓃𝓀 𝒴𝑜𝓊 ❤
        </p>
        <p className="text-[13px] font-semibold tracking-[0.4em] text-center mt-2 mb-2 sm:mb-0 text-rose-500">
          BOOKAGAIN
        </p>
      </div>
    </div>
  );
};

export default TicketBox;
