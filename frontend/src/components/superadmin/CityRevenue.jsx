import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cityRevenueApi } from "../../redux/reducer/revenueSlice";

const CityRevenue = () => {
  const dispatch = useDispatch();
  const { cityId } = useParams();
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCityRevenue = async () => {
      try {
        const response = await dispatch(cityRevenueApi({ cityId }));
        if (cityRevenueApi.fulfilled.match(response)) {
          setCityData(response?.payload?.data || []);
        }
      } catch (err) {
        console.error("Error fetching city revenue:", err);
      }
    };
    fetchCityRevenue();
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <div>
        <h1>City: {cityData?.cityName}</h1>
        <h1>Revenue: {cityData?.cityRevenue}</h1>
        <h1>Total Cities: {cityData?.cinemas?.length}</h1>
      </div>
      {cityData?.cinemas?.map((cinema) => (
        <div key={cinema?.cinemaId}>
          <h2>Cinema: {cinema?.cinemaName}</h2>
          <h4>Revenue: {cinema?.totalRevenue}</h4>
          <h4>Admin Name: {cinema?.adminDetails?.userName}</h4>
          <h4>Admin Email: {cinema?.adminDetails?.email}</h4>
          <Link to={`/admin-details/${cinema?.adminDetails?._id}`}>
            Admin Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CityRevenue;
