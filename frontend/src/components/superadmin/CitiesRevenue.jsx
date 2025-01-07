import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { superadminRevenueApi } from "../../redux/reducer/revenueSlice";

const CitiesRevenue = () => {
  const dispatch = useDispatch();
  const [revenueDetails, setRevenueDetails] = useState([]);

  useEffect(() => {
    const fetchCitiesRevenue = async () => {
      try {
        const response = await dispatch(superadminRevenueApi());
        if (superadminRevenueApi.fulfilled.match(response)) {
          setRevenueDetails(response?.payload?.data || []);
        }
      } catch (err) {
        console.error("Error fetching cities revenue:", err);
      }
    };
    fetchCitiesRevenue();
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h1>Total Cities: {revenueDetails?.length}</h1>
      {revenueDetails?.map((city) => (
        <div key={city?.cityId}>
          <h2>City: {city?.cityName}</h2>
          <h4>Revenue: {city?.cityRevenue}</h4>
          <Link to={`/city-revenue/${city?.cityId}`}>City Details</Link>
        </div>
      ))}
    </div>
  );
};

export default CitiesRevenue;
