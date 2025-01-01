
const Cinema = require("../models/Cinema");
const MovieShow = require("../models/MovieShow");
const Booking = require("../models/Booking");

async function getRevenueDetails(req, res) {
  try {
    const { userId, startDate, endDate } = req.body;

    const cinemas = await Cinema.find({ adminDetailes: userId }).populate("screens");

    const revenueDetails = await Promise.all(
      cinemas.map(async (cinema) => {
        const shows = await MovieShow.find({
          cinemaId: cinema._id,
          showStart: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });

        const movieRevenue = {};

        for (const show of shows) {
          const bookings = await Booking.find({ showId: show._id, status: "BOOKED" });

          bookings.forEach((booking) => {
            if (!movieRevenue[show.movieId]) {
              movieRevenue[show.movieId] = 0;
            }
            movieRevenue[show.movieId] += booking.totalAmount;
          });
        }

        const details = Object.keys(movieRevenue).map((movieId) => ({
          movieId,
          revenue: movieRevenue[movieId],
        }));

        const totalRevenue = details.reduce((acc, curr) => acc + curr.revenue, 0);

        return {
          cinemaId: cinema._id,
          cinemaName: cinema.cinemaName,
          totalRevenue,
          details,
        };
      })
    );

    res.status(200).json(revenueDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getRevenueDetails };