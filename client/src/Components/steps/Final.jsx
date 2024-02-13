import React from "react";

const Final = ({ error }) => {
  return (
    <>
      {error === false ? (
        <div className="container md:mt-10">
          <div className="flex flex-col items-center">
            <div className="text-green-400"></div>
            <div className="mt-3 text-xl font-semibold uppercase text-green-500">
              Congratulations!
            </div>
            <div className="text-lg font-semibold text-gray-500">
              Your Personal Info has been created
            </div>
            <a className="mt-10" href="/login">
              <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
                Login
              </button>
            </a>
          </div>
        </div>
      ) : (
        <div className="container md:mt-10">
          <div className="flex flex-col items-center">
            <div className="text-red-400"></div>
            <div className="mt-3 text-xl font-semibold uppercase text-red-500">
              Something went wrong try again
            </div>
            <a className="mt-10" href="/">
              <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
                Close
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Final;
