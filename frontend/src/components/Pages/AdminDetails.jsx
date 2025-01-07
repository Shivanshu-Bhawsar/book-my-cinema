import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { adminRevenueApi } from "../../redux/reducer/revenueSlice";

const AdminDetails = () => {
  const dispatch = useDispatch();
  const { adminId } = useParams();
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await dispatch(adminRevenueApi({ adminId }));
        if (adminRevenueApi.fulfilled.match(response)) {
          setAdminData(response?.payload?.data || []);
        }
      } catch (err) {
        console.error("Error fetching admin details:", err);
      }
    };
    fetchAdminDetails();
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <div>
        <h1>Admin Name: {adminData?.adminDetails?.userName}</h1>
        <h1>Admin Email: {adminData?.adminDetails?.email}</h1>
        <h1>Admin Contact No: {adminData?.adminDetails?.contactNumber}</h1>
        <h1>Admin Cinemas: {adminData?.cinemas?.length}</h1>
      </div>
      {adminData?.cinemas?.map((cinema) => (
        <div key={cinema?.cinemaId}>
          <h2>Cinema: {cinema?.cinemaName}</h2>
          <h4>Revenue: {cinema?.totalRevenue}</h4>
        </div>
      ))}
    </div>
  );
};

export default AdminDetails;
