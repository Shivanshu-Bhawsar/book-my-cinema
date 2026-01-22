import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { adminsDetailsApi } from "../../redux/reducer/revenueSlice";
import HomeSlider from "../common/HomeSlider";

const AdminsPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.revenue);
  const [adminsData, setAdminsData] = useState([]);

  useEffect(() => {
    const fetchAdminsData = async () => {
      try {
        const response = await dispatch(adminsDetailsApi());
        if (adminsDetailsApi.fulfilled.match(response)) {
          setAdminsData(response?.payload?.data || []);
        }
      } catch (err) {
        console.error("Error fetching admins data:", err);
      }
    };
    fetchAdminsData();
  }, [dispatch]);

  return (
    <>
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="bg-gray-100 mx-auto px-5 sm:px-8 lg:px-16 pb-[90px] sm:pb-10">
        <div className="mt-7 mb-7 flex items-center justify-between">
          <h1 className="text-3xl font-medium">
            Total Admins: {adminsData?.length || 0}
          </h1>
        </div>
        <div className="bg-white lg:w-[90%]">
          <Table className="border border-black sm:border-gray-500 rounded-xl">
            <Thead className="bg-rose-500">
              <Tr className="flex justify-evenly gap-x-8 md:gap-x-10 rounded-t-md border-b sm:border-b-gray-500 px-4 md:px-6 py-2 text-white">
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Name
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Email
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Contact No
                </Th>
                <Th className="sm:w-[25%] text-center text-sm font-medium uppercase">
                  Admin Details
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <div className="my-20 flex items-center justify-center">
                  <div className="custom-loader"></div>
                </div>
              ) : adminsData?.length > 0 ? (
                adminsData?.map((admin, index) => (
                  <Tr
                    key={admin?._id}
                    className={`flex items-center justify-evenly gap-x-8 md:gap-x-10 ${
                      index !== adminsData?.length - 1 && "border-b"
                    } sm:border-gray-400 px-4 md:px-6 py-6`}
                  >
                    <Td className="sm:w-[25%] mt-2 sm:mt-0 text-center text-sm sm:font-medium capitalize">
                      {admin?.userName}
                    </Td>
                    <Td className="sm:w-[25%] text-center text-sm sm:font-medium">
                      {admin?.email}
                    </Td>
                    <Td className="sm:w-[25%] text-center text-sm sm:font-medium">
                      {admin?.contactNumber}
                    </Td>
                    <Td className="sm:w-[25%] mb-2 sm:mb-0 text-center text-sm sm:font-medium">
                      <Link
                        to={`/admin-details/${admin?._id}`}
                        className="text-rose-500 underline"
                      >
                        Admin Details
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td className="py-10 text-center text-xl font-medium">
                    No admin found
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

export default AdminsPage;
