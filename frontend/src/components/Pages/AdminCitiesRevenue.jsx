import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { adminCitiesRevenueApi } from "../../redux/reducer/revenueSlice";
import HomeSlider from "../common/HomeSlider";

const AdminCitiesRevenue = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.revenue);
  const [revenueDetails, setRevenueDetails] = useState([]);

  useEffect(() => {
    const fetchAdminCitiesRevenue = async () => {
      try {
        const response = await dispatch(adminCitiesRevenueApi());
        if (adminCitiesRevenueApi.fulfilled.match(response)) {
          setRevenueDetails(response?.payload?.data || []);
        }
      } catch (err) {
        console.error("Error fetching admin cities revenue:", err);
      }
    };
    fetchAdminCitiesRevenue();
  }, [dispatch]);

  return (
    <>
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="bg-gray-100 mx-auto px-5 sm:px-12 md:px-16 pb-[90px] sm:pb-10">
        <div className="mt-7 mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-medium">
            Total Cities: {revenueDetails?.length || 0}
          </h1>
        </div>
        <div className="bg-white w-[95%] sm:w-[85%] lg:w-[70%]">
          <Table className="border border-black sm:border-gray-500 rounded-xl">
            <Thead className="bg-rose-500">
              <Tr className="flex justify-evenly gap-x-10 rounded-t-md border-b sm:border-b-gray-500 px-6 py-2 text-white">
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  City
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Revenue
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  City Details
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <div className="my-20 flex items-center justify-center">
                  <div className="custom-loader"></div>
                </div>
              ) : revenueDetails?.length > 0 ? (
                revenueDetails?.map((city, index) => (
                  <Tr
                    key={city?.cityId}
                    className={`flex items-center justify-evenly gap-x-10 ${
                      index !== revenueDetails?.length - 1 && "border-b"
                    } sm:border-gray-400 px-6 py-6`}
                  >
                    <Td className="sm:w-[25%] mt-2 sm:mt-0 text-center text-sm sm:font-medium">
                      <p className="capitalize">{city?.cityName}</p>
                    </Td>
                    <Td className="sm:w-[25%] text-center text-sm sm:font-medium">
                      {city?.cityRevenue}
                    </Td>
                    <Td className="sm:w-[25%] mb-2 sm:mb-0 text-center text-sm sm:font-medium">
                      <Link
                        to={`/admin-city-revenue/${city?.cityId}`}
                        className="text-rose-500 underline"
                      >
                        City Details
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td className="py-10 text-center text-xl font-medium">
                    No city found
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

export default AdminCitiesRevenue;
