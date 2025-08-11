import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="container px-4 sm:px-8 lg:px-16 mx-auto my-16">
      <div className="bg-gradient-to-br from-violet-100 to-purple-200 rounded-2xl shadow-md p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Text & Buttons */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-purple-900 mb-4">
            Download Our Mobile App
          </h1>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            Get a smoother and faster experience on your phone. Track jobs, manage resumes, and more — anytime, anywhere.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <a href="#">
              <img src={assets.play_store} alt="Play Store" className="h-10 hover:scale-105 transition duration-200" />
            </a>
            <a href="#">
              <img src={assets.app_store} alt="App Store" className="h-10 hover:scale-105 transition duration-200" />
            </a>
          </div>
        </div>

        {/* App Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.app_main_img}
            alt="App UI"
            className="w-[200px] sm:w-[250px] md:w-[280px] drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
