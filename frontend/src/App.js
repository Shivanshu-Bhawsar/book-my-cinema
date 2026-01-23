import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/common/NavBar";
import Home from "./components/Pages/Home";
import MoviesPage from "./components/Pages/MoviesPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddCinema from "./components/Pages/AddCinema";
import AddMoviePage from "./components/superadmin/AddMoviePage";
import UpdateMoviePage from "./components/superadmin/UpdateMoviePage";
import AddCity from "./components/Pages/AddCity";
import UpdateScreen from "./components/Pages/UpdateScreen";
import AdminCinemas from "./components/Pages/AdminCinemas";
import AdminProtected from "./components/protected/AdminProtected";
import SuperAdminProtected from "./components/protected/SuperAdminProtected";
import ShowSeats from "./components/Pages/ShowSeats";
import AddShow from "./components/Pages/AddShow";
import LiveYourShow from "./components/Pages/LiveYourShow";
import CinemasShowPage from "./components/Pages/CinemasShowPage";
import TermsAndCounditionPage from "./components/Pages/TermsAndCounditionPage";
import TransactionPage from "./components/Pages/TransactionPage";
import PageNotFound from "./components/Pages/PageNotFound";
import AllMoviesPage from "./components/Pages/AllMoviesPage";
import ScrollTop from "./utils/ScrollTop";
import LoaderPage from "./utils/LoaderPage";
import BottomNavBar from "./components/common/BottomNavBar";
import Profile from "./components/Pages/Profile";
import CitiesRevenue from "./components/superadmin/CitiesRevenue";
import CityRevenue from "./components/superadmin/CityRevenue";
import AdminsPage from "./components/superadmin/AdminsPage";
import AdminCitiesRevenue from "./components/Pages/AdminCitiesRevenue";
import AdminCityRevenue from "./components/Pages/AdminCityRevenue";
import AdminRevenue from "./components/Pages/AdminRevenue";
import AdminDetails from "./components/superadmin/AdminDetails";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // Loader duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <div className="w-full h-screen bg-gray-100">
      <Toaster position="top-center" />
      <ScrollTop />

      <NavBar />

      <Routes>
        {/* Open Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<CustomOtpInput />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/book/terms-conditions"
          element={<TermsAndCounditionPage />}
        />
        <Route path="/book/transactions" element={<TransactionPage />} />
        <Route path="/movie/:movieName/:movie_id" element={<MoviesPage />} />
        <Route
          path="/buytickets/:movie_id/:cinema_id/:timing/seats"
          element={<ShowSeats />}
        />
        <Route
          path="/shows/:movieName/:movie_id"
          element={<CinemasShowPage />}
        />
        <Route path="/movies" element={<AllMoviesPage />} />

        {/* Super-Admin Routes */}
        <Route
          path="/movie/addMovie"
          element={
            <SuperAdminProtected>
              <AddMoviePage />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/movie/updatemovie/:movie_id"
          element={
            <SuperAdminProtected>
              <UpdateMoviePage />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/addCity"
          element={
            <SuperAdminProtected>
              <AddCity />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/cities-revenue"
          element={
            <SuperAdminProtected>
              <CitiesRevenue />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/city-revenue/:cityId"
          element={
            <SuperAdminProtected>
              <CityRevenue />
            </SuperAdminProtected>
          }
        />
        <Route
          path="/admins-details"
          element={
            <SuperAdminProtected>
              <AdminsPage />
            </SuperAdminProtected>
          }
        />

        <Route
          path="/admin-details/:adminId"
          element={
            <SuperAdminProtected>
              <AdminDetails />
            </SuperAdminProtected>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/cinema/addCinema"
          element={
            <AdminProtected>
              <AddCinema />
            </AdminProtected>
          }
        />
        <Route
          path="/cinema/adminCinemas"
          element={
            <AdminProtected>
              <AdminCinemas />
            </AdminProtected>
          }
        />
        <Route
          path="/cinema/:cinemaId/updateScreen/:screenId"
          element={
            <AdminProtected>
              <UpdateScreen />
            </AdminProtected>
          }
        />
        <Route
          path="/show/addShow/:movie_id"
          element={
            <AdminProtected>
              <AddShow />
            </AdminProtected>
          }
        />
        <Route
          path="/show/liveYourShow"
          element={
            <AdminProtected>
              <LiveYourShow />
            </AdminProtected>
          }
        />

        <Route
          path="/admin-cities-revenue"
          element={
            <AdminProtected>
              <AdminCitiesRevenue />
            </AdminProtected>
          }
        />

        <Route
          path="/admin-city-revenue/:cityId"
          element={
            <AdminProtected>
              <AdminCityRevenue />
            </AdminProtected>
          }
        />

        <Route
          path="/admin-revenue"
          element={
            <AdminProtected>
              <AdminRevenue />
            </AdminProtected>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <div className="block sm:hidden mt-12 sm:mt-0">
        <BottomNavBar />
      </div>
    </div>
  );
}

export default App;
