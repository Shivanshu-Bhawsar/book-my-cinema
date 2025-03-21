import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";
import Footer from "../common/Footer";
import SliderComponent from "../common/SliderComponent";
import PremiereComponent from "../common/PremiereComponent";
import EventComponent from "../common/EventComponent";
import liveEventsArray from "../../utils/sliderTwoPcitures";
import gifVedio from "../../utils/GifVedio.mp4";
import offerBanner from "../../utils/lastBanner.jpeg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);

  // Tracks if animation has run
  // const movieCardRef = useRef();
  // const anotherRef = useRef();
  // const pinnedContentRef = useRef();

  // useLayoutEffect(() => {
  //   if (movieCardRef.current && anotherRef.current && allMovies.length) {
  //     const elements = anotherRef.current.querySelectorAll(".movieCard");

  //     if (elements.length) {
  //       gsap.from(elements, {
  //         opacity: 0,
  //         scrollTrigger: {
  //           trigger: anotherRef.current,
  //           start: "top 70%",
  //           end: "top -20%",
  //         },
  //       });
  //     }

  //     // Pin the content below the movie cards while the animation runs
  //     gsap.to(anotherRef.current, {
  //       x: "-115%",
  //       scrollTrigger: {
  //         trigger: movieCardRef.current,
  //         start: "top 5%",
  //         end: "top -10%",
  //         scrub: true,
  //         pin: true, // Pin the content below while the animation plays
  //       },
  //     });

  //     // Pin the content below the movie cards while the animation runs
  //     gsap.to(pinnedContentRef.current, {
  //       scrollTrigger: {
  //         trigger: movieCardRef.current,
  //         start: "top 5%",
  //         end: "top -10%",
  //         pin: true, // Pin the content until the movie card animation completes
  //       },
  //     });
  //   }
  // }, [allMovies]);

  useEffect(() => {
    const fetchMovies = async () => {
      await dispatch(getAllMoviesApi());
    };
    fetchMovies();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 scrollbar-hide overflow-x-scroll">
      <HomeSlider />
      {isLoading ? (
        <div className="mt-20 sm:mt-28 flex items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div className="mt-8 sm:mt-12 flex flex-col items-start justify-center">
          <p className="py-2 px-8 text-lg sm:text-xl font-medium md:font-semibold">
            Recommended Movies
          </p>
          <div className="w-full px-2 mt-3 mb-5 flex gap-5 flex-wrap items-start justify-center">
            {allMovies.length ? (
              allMovies.map((movie) => (
                <MovieCard movie={movie} key={movie._id} />
              ))
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </div>
      )}
      <div className="h-max sm:p-2 flex mt-5 items-center justify-center">
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
      <div className="w-full sm:h-0 p-2 mt-3 sm:opacity-0 opacity-100">
        <img src={offerBanner}></img>
      </div>
      <div className="h-max p-18 mt-5 mb-0 sm:mb-5">
        <SliderComponent />
      </div>
      <div className="w-[100vw] my-2 bg-white">
        <video
          src={gifVedio}
          autoPlay
          loop
          muted
          className="w-full sm:h-0 opacity-100 sm:opacity-0 pointer-events-none"
        ></video>
      </div>

      <PremiereComponent />

      <EventComponent />

      <div className="mb-12 sm:mb-0"><Footer /></div>
    </div>
  );
};

export default Home;
