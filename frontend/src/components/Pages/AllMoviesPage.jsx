import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../common/MovieCard";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import filterData from "../../utils/FilterData";
import HomeSlider from "../common/HomeSlider";
import liveEventsArray from "../../utils/sliderTwoPcitures";
import Footer from "../common/Footer";

const AllMoviesPage = () => {
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);
  const [filterMovies, setFilterMovies] = useState(allMovies);
  const [filterArray, setFilterArray] = useState([]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // States to track individual filter sections' visibility
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(true);
  const [isGenresVisible, setIsGenresVisible] = useState(true);
  const [isFormatsVisible, setIsFormatsVisible] = useState(true);

  const filterRef = useRef(null); // Reference to the filter panel

  // Fetch movies if not already available
  useEffect(() => {
    const fetchMovies = async () => {
      if (!allMovies || allMovies.length === 0) {
        await dispatch(getAllMoviesApi());
      }
    };
    fetchMovies();
  }, [dispatch, allMovies]);

  useEffect(() => {
    setFilterMovies(allMovies);
  }, [allMovies]);

  const filterPush = (value) => {
    const isValueSelected = filterArray.includes(value);
    const updatedFilterArray = isValueSelected
      ? filterArray.filter((item) => item !== value)
      : [...filterArray, value];
    setFilterArray(updatedFilterArray);

    const filteredMovies = allMovies.filter((movie) => {
      const matchesGenres = movie.genres.some((genre) =>
        updatedFilterArray.includes(genre)
      );
      const matchesLanguages = movie.supportingLanguages.some((lang) =>
        updatedFilterArray.includes(lang)
      );
      return matchesGenres || matchesLanguages;
    });

    if (updatedFilterArray.length === 0 || updatedFilterArray.includes("2D")) {
      setFilterMovies(allMovies);
    } else {
      setFilterMovies(filteredMovies);
    }
  };

  // Close filter if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterVisible(false); // Close the filter panel when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleSection = (section) => {
    if (section === "languages") {
      setIsLanguagesVisible(!isLanguagesVisible);
    } else if (section === "genres") {
      setIsGenresVisible(!isGenresVisible);
    } else if (section === "formats") {
      setIsFormatsVisible(!isFormatsVisible);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      {isLoading ? (
        <div className="mt-20 sm:mt-28 flex items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div>
          {/* Filter Panel */}
          <div
            ref={filterRef}
            className={`${
              isFilterVisible ? "translate-x-0" : "-translate-x-full"
            } fixed top-0 left-0 w-[300px] h-full bg-[white] text-[rgb(31,31,31)] text-[14px] font-normal flex flex-col gap-5 p-5 transition-transform duration-300 ease-in-out`}
          >
            <button
              className="absolute top-5 right-5 text-black text-[30px]"
              onClick={toggleFilter}
            >
              <IoMdClose />
            </button>
            <p className="text-center text-[18px] font-sans font-[500] mb-4">
              Filters
            </p>

            {/* Languages Section */}
            <div>
              <div className="mb-4 flex items-center justify-start gap-2">
                <button
                  onClick={() => toggleSection("languages")}
                  className="flex items-center gap-2"
                >
                  {isLanguagesVisible ? <FaChevronUp /> : <FaChevronDown />}
                  <p>Languages</p>
                </button>
              </div>
              {isLanguagesVisible && (
                <div className="w-full p-2 flex flex-wrap gap-3">
                  {filterData.languages.map((lang, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        filterPush(lang);
                      }}
                      className={`flex justify-center items-center w-auto h-[30px] border-[rgb(229,231,228)] p-3 ${
                        filterArray.includes(lang)
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 border-[1px]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Genres Section */}
            <div>
              <div className="mb-4 flex items-center justify-start gap-2">
                <button
                  onClick={() => toggleSection("genres")}
                  className="flex items-center gap-2 "
                >
                  {isGenresVisible ? <FaChevronUp /> : <FaChevronDown />}
                  <p>Genres</p>
                </button>
              </div>
              {isGenresVisible && (
                <div className="w-full p-2 flex flex-wrap gap-3">
                  {filterData.genres.map((gen, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        filterPush(gen);
                      }}
                      className={`flex justify-center items-center w-auto h-[30px] border-[rgb(229,231,228)] p-3 ${
                        filterArray.includes(gen)
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 border-[1px]"
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Formats Section */}
            <div>
              <div className="mb-4 flex items-center justify-start gap-2 ">
                <button
                  onClick={() => toggleSection("formats")}
                  className="flex items-center gap-2"
                >
                  {isFormatsVisible ? <FaChevronUp /> : <FaChevronDown />}
                  <p>Formats</p>
                </button>
              </div>
              {isFormatsVisible && (
                <div className="w-full p-2 flex flex-wrap gap-3">
                  {filterData.formats.map((form, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        filterPush(form);
                      }}
                      className={`flex justify-center items-center w-auto h-[30px] border-[rgb(229,231,228)] p-3 ${
                        filterArray.includes(form)
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 border-[1px]"
                      }`}
                    >
                      {form}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Movies Section */}
          <div className="w-full mt-5 flex flex-col items-start justify-center">
            <div className="w-full mb-4 px-8 flex items-center justify-between">
              <button
                className="px-5 sm:px-6 py-[6px] tracking-wider text-sm flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-md"
                onClick={toggleFilter}
              >
                Filters
              </button>
              <p className="flex items-center justify-center text-base sm:text-lg font-sans font-medium">
                Movies For You
              </p>
            </div>

            <div className="w-full px-2 mt-3 mb-5 flex gap-5 flex-wrap items-start justify-center">
              {filterMovies.length ? (
                filterMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie._id} />
                ))
              ) : (
                <p>No movies found</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-max mb-5 sm:p-2 flex mt-5 items-center justify-center">
        <div className="w-[90%] flex flex-col items-start justify-center">
          <h1 className="mb-2 text-[rgb(51,51,51)] font-[700] font-[roboto] sm:text-[30px] text-[20px]">
            The Best Live Events
          </h1>
          <div className="w-[100%] h-max flex items-center justify-between overflow-x-scroll scrollbar-hide gap-2">
            {liveEventsArray.map((elem, index) => (
              <img
                src={elem.img}
                className="sm:w-[230px] sm:h-[230px] rounded-md w-[150px]"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllMoviesPage;
