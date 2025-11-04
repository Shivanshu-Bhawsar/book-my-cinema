import React from "react";

const Skeleton = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="bg-gray-100 h-full w-full">
      <div className="flex flex-col justify-center items-center">
        {/* <div className="h-8 w-48 bg-gray-300 rounded-md animate-pulse mt-5 mb-4"></div> */}
        <div className="w-full sm:w-[75%] md:w-[60%] lg:w-[55%] mb-20 sm:mb-10 mt-3 sm:mt-5 px-4 sm:px-7 flex flex-col flex-wrap justify-center items-center gap-5">
          {arr.map((index) => (
            <div
              key={index}
              className="bg-gray-200 w-full rounded-md border-b-2 space-y-4 animate-pulse"
            >
              <div className="w-full p-3 flex items-center justify-between gap-5">
                <div className="flex justify-start items-center gap-5">
                  <div className="w-[65px] h-[75px] bg-gray-300 rounded-md"></div>
                  <div className="flex flex-col items-start justify-center">
                    <div className="h-4 w-32 bg-gray-300 rounded-md  mb-2"></div>
                    <div className="h-3 w-48 bg-gray-300 rounded-md  mb-1"></div>
                    <div className="h-3 w-32 bg-gray-300 rounded-md  mb-1"></div>
                    <div className="h-3 w-48 bg-gray-300 rounded-md  mb-1"></div>
                  </div>
                </div>
                <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          ))}
          <div className="mt-5 text-center text-lg h-6 w-48 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
