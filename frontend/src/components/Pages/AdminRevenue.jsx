import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { adminRevenueApi } from "../../redux/reducer/revenueSlice";
import HomeSlider from "../common/HomeSlider";

const AdminRevenue = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const adminId = user?._id;
  const { isLoading } = useSelector((state) => state.revenue);
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
  }, [adminId, dispatch]);

  return (
    <>
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="bg-gray-100 mx-auto px-5 sm:px-12 md:px-16 pb-[90px] sm:pb-10">
        <div className="mt-7 mb-10 font-semibold">
          <h1 className="mb-[10px] text-3xl font-medium">Admin Details</h1>
          <h1>
            Name:{" "}
            <span className="font-normal sm:font-medium">
              {adminData?.adminDetails?.userName}
            </span>
          </h1>
          <h1>
            Email:{" "}
            <span className="font-normal sm:font-medium">
              {adminData?.adminDetails?.email}
            </span>
          </h1>
          <h1>
            Contact No:{" "}
            <span className="font-normal sm:font-medium">
              {adminData?.adminDetails?.contactNumber}
            </span>
          </h1>
          <h1>
            Total Cinemas:{" "}
            <span className="font-normal sm:font-medium">
              {adminData?.cinemas?.length}
            </span>
          </h1>
        </div>
        <div className="my-5 flex items-center justify-between">
          <h1 className="text-3xl font-medium">Cinemas Details</h1>
        </div>
        <div className="bg-white w-[95%] sm:w-[85%] lg:w-[70%]">
          <Table className="border border-black sm:border-gray-500 rounded-xl">
            <Thead className="bg-rose-500">
              <Tr className="flex justify-evenly gap-x-10 rounded-t-md border-b sm:border-b-gray-500 px-6 py-2 text-white">
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Cinema
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Revenue
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Created At
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <div className="my-20 flex items-center justify-center">
                  <div className="custom-loader"></div>
                </div>
              ) : adminData?.cinemas?.length > 0 ? (
                adminData?.cinemas?.map((cinema, index) => (
                  <Tr
                    key={cinema?._id}
                    className={`flex items-center justify-evenly gap-x-10 ${
                      index !== adminData?.cinemas?.length - 1 && "border-b"
                    } sm:border-gray-400 px-6 py-6`}
                  >
                    <Td className="sm:w-[25%] mt-2 sm:mt-0 text-center text-sm sm:font-medium">
                      {cinema.cinemaName}
                    </Td>
                    <Td className="sm:w-[25%] text-center text-sm sm:font-medium">
                      {cinema?.totalRevenue}
                    </Td>
                    <Td className="sm:w-[25%] mb-2 sm:mb-0 text-center text-sm sm:font-medium">
                      {new Date().toDateString().split(" ").splice(1).join(" ")}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td className="py-10 text-center text-xl font-medium">
                    No cinema found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminRevenue;
