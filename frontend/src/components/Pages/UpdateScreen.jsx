import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { updateScreen } from "../../redux/reducer/adminSlice";
import HomeSlider from "../common/HomeSlider";

const UpdateScreen = () => {
  const dispatch = useDispatch();
  const { screenId } = useParams();
  const { isLoading } = useSelector((state) => state.admin);
  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  const initialState = {
    regular: {
      name: "REGULAR",
      seat: "",
      price: "",
    },
    bolcony: {
      name: "BALCONY",
      seat: "",
      price: "",
    },
    vip: {
      name: "VIP",
      seat: "",
      price: "",
    },
    screenId,
  };
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e, category, field) => {
    const value = e.target.value;
    // Allow empty value or ensure the value is greater than 0
    if (value === "" || parseInt(value) > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [field]: value,
        },
      }));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateScreen(formData));
    if (updateScreen.fulfilled.match(result)) {
      setFormData(initialState);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[32px] text-rose-500 font-medium">
          Update Screen
        </h1>
        {isLoading ? (
          <div className="mt-20 sm:mt-28 flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            style={{
              width: isMobile ? "85%" : "0%",
              minWidth: isMobile ? "0px" : "350px",
              padding: isMobile ? "22px" : "32px",
            }}
            className="mx-auto mb-20 sm:mb-10 mt-3 sm:mt-5 bg-gray-200 shadow-lg rounded-lg space-y-5"
          >
            {Object.keys(formData)
              .filter((category) => category !== "screenId")
              .map((category) => (
                <div key={category} className="space-y-4">
                  <h2 className="sm:text-lg lg:text-xl font-medium capitalize">
                    {formData[category].name}
                  </h2>
                  <div className="ml-2 flex flex-col">
                    <label
                      htmlFor={`${category}-seat`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seats
                    </label>
                    <input
                      type="number"
                      id={`${category}-seat`}
                      value={formData[category].seat}
                      onChange={(e) => handleOnChange(e, category, "seat")}
                      placeholder={`Enter number of seats for ${formData[category].name}`}
                      className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="ml-2 flex flex-col">
                    <label
                      htmlFor={`${category}-price`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id={`${category}-price`}
                      value={formData[category].price}
                      onChange={(e) => handleOnChange(e, category, "price")}
                      placeholder={`Enter price for ${formData[category].name}`}
                      className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
              ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
            >
              {isLoading ? "Updating..." : "Update Screen"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateScreen;
