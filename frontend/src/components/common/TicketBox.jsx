import React from "react";

const TicketBox = ({ booking, onClose }) => {
  if (!booking) {
    return null; // Or display a loading message
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
        {/* <p className="text-lg font-medium">
          Booking ID: <span className="text-gray-600">{booking._id}</span>
        </p> */}
        <p className="text-lg font-medium">
          Movie:{" "}
          <span className="text-blue-600">
            {booking.showId.movieId.movieName}
          </span>
        </p>
        <p className="text-lg">
          Cinema:{" "}
          <span className="text-blue-600">
            {booking.showId.cinemaId.cinemaName}
          </span>
        </p>
        <p className="text-lg">
          City:{" "}
          <span className="text-gray-500">
            {booking.showId.cinemaId.cityId.cityName}
          </span>
        </p>
        <p className="text-lg">
          Timing:{" "}
          <span className="text-green-600">{booking.showId.timing}</span>
        </p>
        <p className="text-lg">
          QR Code:{" "}
          <img
            src={booking.qrImage}
            alt="QR Code"
            className="mt-4 border border-gray-300"
          />
        </p>

        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TicketBox;
