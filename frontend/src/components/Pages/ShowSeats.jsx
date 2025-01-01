import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSeatsDetailes } from "../../redux/reducer/seatSlice";
import HomeSlider from "../common/HomeSlider";
import VipSeat from "../seatComponents/VipSeat";
import BolconySeat from "../seatComponents/BalconySeat";
import RegularSeat from "../seatComponents/RegularSeat";
import {
  capturePayment,
  verifyPayment,
  reserveSeats,
} from "../../redux/reducer/paymentSlice";
import { io } from "socket.io-client";
import AxiosInstance from "../../redux/utils/apiConnector";

const socket = io("https://movie-book-app-backend.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const ShowSeats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cinema_id, movie_id, timing } = useParams();
  const { seatsInfo, loading } = useSelector((state) => state.seat);

  const [seatArray, setSeatArray] = useState([]);
  const [showSeatsArray, setShowSeatsArray] = useState([]);
  const [regularSeat, setRegularSeat] = useState([]);
  const [balconySeat, setBalconySeat] = useState([]);
  const [vipSeat, setVipSeat] = useState([]);
  const [mySeats, setMySeats] = useState([]);
  const [amount, setAmount] = useState(0);

  const formatDate = (isoDateString, timing, show) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Extract the hour and the period (am/pm) from the timing parameter
    const [startHour, period] = timing.split(/[-]+/);

    // Determine if the period is AM or PM
    const ampm = period.toLowerCase().includes("pm") ? "PM" : "AM";

    // Parse the start hour to an integer and format it to 12-hour format if necessary
    const formattedHour =
      show === "start"
        ? parseInt(startHour) % 12 || 12
        : parseInt(period) % 12 || 12;

    return `${day} ${month} ${year}, ${formattedHour} ${ampm}`;
  };

  const bookTicketsHandler = async (seatIds) => {
    const requestData = { showId: seatArray[0]._id, seatsBook: seatIds };
    try {
      const captureResponse = await dispatch(capturePayment(requestData));

      const amount = captureResponse.payload.data.amount;
      const options = {
        key: "rzp_test_4Pd7FCcIYATYXN",
        amount,
        currency: "INR",
        name: "Book my Cinema",
        order_id: captureResponse.payload.data.id,
        callback_url: `${AxiosInstance.defaults.baseURL}/payment/verifyPayment`,
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "ABC Office",
        },
        handler: async (razorpayResponse) => {
          try {
            // Prepare data for verification
            const verificationData = {
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              showId: seatArray[0]._id,
              seatsForBook: seatIds,
              totalAmount: amount,
            };

            // Dispatch verifyPayment thunk
            await dispatch(verifyPayment(verificationData));
            navigate("/book/transactions");
          } catch (error) {
            console.error("Payment Verification Failed:", error.message);
          }
        },
      };

      // Initialize Razorpay and open the payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error capturing payment:", error.message);
    }
  };

  // Book Now functionality
  const handleBookNow = async () => {
    const seatIds = mySeats.map((seat) => seat._id);

    const result = await dispatch(reserveSeats({ seatIds }));
    if (reserveSeats.fulfilled.match(result)) {
      alert(result?.payload?.message);
      await bookTicketsHandler(seatIds);
    } else {
      alert(result?.payload);
      window.location.reload();
    }

    setMySeats([]);
  };

  // Handle seat click
  const toggleSeatSelection = (seat) => {
    if (mySeats.some((seatObj) => seatObj._id === seat._id)) {
      let newAmount = amount - seat.seatId.seatPrice;
      setAmount(newAmount);
    } else {
      let newAmount = amount + seat.seatId.seatPrice;
      setAmount(newAmount);
    }

    setMySeats(
      (prevSeats) =>
        prevSeats.some((selectedSeat) => selectedSeat._id === seat._id)
          ? prevSeats.filter((selectedSeat) => selectedSeat._id !== seat._id) // Deselect seat
          : [...prevSeats, seat] // Select seat
    );
  };

  const filterSeats = () => {
    if (showSeatsArray.length > 0) {
      setRegularSeat(
        showSeatsArray.filter((seat) => seat.seatId.seatType === "REGULAR")
      );
      setBalconySeat(
        showSeatsArray.filter((seat) => seat.seatId.seatType === "BALCONY")
      );
      setVipSeat(
        showSeatsArray.filter((seat) => seat.seatId.seatType === "VIP")
      );
    } else {
      setRegularSeat([]);
      setBalconySeat([]);
      setVipSeat([]);
    }
  };

  // Update seat statuses via socket events
  const updateSeatStatuses = (updatedSeatIds, status) => {
    setShowSeatsArray((prevSeats) =>
      prevSeats.map((seat) =>
        updatedSeatIds.includes(seat._id) ? { ...seat, status: status } : seat
      )
    );
  };

  useEffect(() => {
    const handleSocketEvents = () => {
      // console.log("Setting up socket listener...");

      socket.on("seatsUpdated", (updatedSeatIds) => {
        // console.log("on seatsUpdated:", updatedSeatIds);
        updateSeatStatuses(updatedSeatIds, "Booked");
      });

      socket.on("reservedSeats", (reservedSeatIds) => {
        // console.log("on reservedSeats:", reservedSeatIds);
        updateSeatStatuses(reservedSeatIds, "Reserved");
      });

      socket.on("seatsToRevert", (seatsToRevertIds) => {
        // console.log("on seatsToRevert:", seatsToRevertIds);
        updateSeatStatuses(seatsToRevertIds, "Available");
      });

      // socket.on("connect", () => {
      //   console.log("Connected to the server:", socket.id);
      // });

      // socket.on("disconnect", () => {
      //   console.log("Disconnected from the server");
      // });

      // socket.on("error", (err) => {
      //   console.error("Socket.IO error:", err);
      // });

      // console.log("Socket listener is set up...");
    };

    handleSocketEvents();

    return () => {
      // Cleanup socket listeners
      // console.log("Socket listener clean up...");
      socket.off("seatsUpdated");
      socket.off("reservedSeats");
      socket.off("seatsToRevert");
    };
  }, []);

  useEffect(() => {
    const fetchSeatsData = async () => {
      const result = await dispatch(
        fetchSeatsDetailes({ movieId: movie_id, cinemaId: cinema_id })
      );

      if (!fetchSeatsDetailes.fulfilled.match(result)) {
        console.error("Fetch failed");
      }
    };
    fetchSeatsData();
  }, [dispatch, cinema_id, movie_id]);

  useEffect(() => {
    if (seatsInfo?.length > 0) {
      const filteredData = seatsInfo.filter((item) => item.timing === timing);
      if (filteredData.length > 0) {
        const { showSeats } = filteredData[0];
        // Update seats state
        setSeatArray(filteredData);
        setShowSeatsArray(showSeats);
        filterSeats();
      } else {
        setSeatArray([]);
        setShowSeatsArray([]);
        filterSeats();
      }
    }
  }, [seatsInfo, timing]);

  useEffect(() => {
    filterSeats();
  }, [showSeatsArray]);

  return (
    <div className="bg-gray-100">
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div>
        {loading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div>
            {seatArray.length === 0 ? (
              <div className="text-center">No Show Found</div>
            ) : (
              <div className="my-3 sm:my-1">
                <div className="w-full flex flex-col items-center justify-start gap-2 p-4">
                  <div className="flex items-center justify-start gap-3">
                    <div>{seatArray[0]?.cinemaId?.cinemaName}</div>
                    <span>|</span>
                    <div className="capitalize">
                      {seatArray[0]?.cinemaId?.cityId?.cityName}
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3">
                    <div>
                      {formatDate(
                        seatArray[0]?.showStart,
                        seatArray[0]?.timing,
                        "start"
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full border-[1px] bg-[rgb(246,245,250)] h-[30px]"></div>

                <div className="w-full min-h-[60%] bg-[rgb(250,250,250)] flex items-center justify-center flex-col gap-4">
                  {/* VIP Seats */}
                  <div className="w-[50%] mt-3 flex items-center justify-center gap-2 p-2">
                    {vipSeat.length !== 0 && (
                      <div className="w-full flex items-center justify-center flex-col">
                        <div className="w-[100%] sm:w-[80%] text-left text-[10px] sm:text-xs border-b-[0.5px] border-b-[rgb(237,237,237)]">
                          {`Rs. ${vipSeat[0].seatId.seatPrice} VIP / LUXURY`}
                        </div>
                        <div className="grid grid-cols-5 gap-4 my-3 sm:my-5">
                          {vipSeat.map((vip) => (
                            <VipSeat
                              vip={vip}
                              key={vip._id}
                              onClick={() => toggleSeatSelection(vip)}
                              isSelected={mySeats.some(
                                (seat) => seat._id === vip._id
                              )}
                              isBooked={vip.status === "Booked"}
                              isReserved={vip.status === "Reserved"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Balcony Seats */}
                  <div className="w-[50%] flex items-center justify-center gap-2 p-2">
                    {balconySeat.length !== 0 && (
                      <div className="w-full flex items-center justify-center flex-col">
                        <div className="w-[100%] sm:w-[80%] text-left text-[10px] sm:text-xs border-b-[0.5px] border-b-[rgb(237,237,237)]">
                          {`Rs. ${
                            balconySeat[0].seatId?.seatPrice || "N/A"
                          } BALCONY`}
                        </div>
                        <div className="grid grid-cols-5 gap-4 my-3 sm:my-5">
                          {balconySeat.map((balcony) => (
                            <BolconySeat
                              balcony={balcony}
                              key={balcony._id}
                              onClick={() => toggleSeatSelection(balcony)}
                              isSelected={mySeats.some(
                                (seat) => seat._id === balcony._id
                              )}
                              isBooked={balcony.status === "Booked"}
                              isReserved={balcony.status === "Reserved"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Regular Seats */}
                  <div className="w-[50%] flex items-center justify-center gap-2 p-2">
                    {regularSeat.length !== 0 && (
                      <div className="w-full flex items-center justify-center flex-col">
                        <div className="w-[100%] sm:w-[80%] text-left text-[10px] sm:text-xs border-b-[0.5px] border-b-[rgb(237,237,237)]">
                          {`Rs. ${
                            regularSeat[0].seatId?.seatPrice || "N/A"
                          } REGULAR`}
                        </div>
                        <div className="grid grid-cols-5 gap-4 my-3 sm:my-5">
                          {regularSeat.map((regular) => (
                            <RegularSeat
                              regular={regular}
                              key={regular._id}
                              onClick={() => toggleSeatSelection(regular)}
                              isSelected={mySeats.some(
                                (seat) => seat._id === regular._id
                              )}
                              isBooked={regular.status === "Booked"}
                              isReserved={regular.status === "Reserved"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div class="w-[60%] h-[2px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent rounded-full"></div>

                  <div className="mb-3 flex items-center h-[30px] p-5 sm:gap-10 gap-4 justify-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="sm:w-[20px] sm:h-[20px] w-[14px] h-[14px] border border-[#1ea83c] text-[#1ea83c] rounded-sm"></div>
                      <p>Available</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="sm:w-[20px] sm:h-[20px] w-[14px] h-[14px] bg-purple-500 rounded-sm"></div>
                      <p>Selected</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="sm:w-[20px] sm:h-[20px] w-[14px] h-[14px] bg-rose-500 rounded-sm"></div>
                      <p>Booked</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5 mb-10">
                  {mySeats.length !== 0 && (
                    <button
                      className="bg-rose-500 hover:bg-rose-600 text-white px-10 sm:px-20 py-2 rounded"
                      onClick={handleBookNow}
                      disabled={mySeats.length === 0 || loading}
                    >
                      {`Pay Rs.${amount}`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSeats;
