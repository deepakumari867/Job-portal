import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-100 to-purple-100 py-10 px-6 mt-16 shadow-inner">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Logo */}
        <img width={180} src={assets.logo} alt="Job Portal Logo" className="rounded-md shadow-md" />

        {/* Text */}
        <p className="text-gray-700 text-sm text-center">
          © 2025 <span className="font-semibold text-purple-700">JobPortal.dev</span> — All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="#" aria-label="Facebook">
            <img
              width={38}
              src={assets.facebook_icon}
              alt="Facebook"
              className="hover:scale-125 transition-transform duration-300 hover:drop-shadow-lg"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              width={38}
              src={assets.twitter_icon}
              alt="Twitter"
              className="hover:scale-125 transition-transform duration-300 hover:drop-shadow-lg"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              width={38}
              src={assets.instagram_icon}
              alt="Instagram"
              className="hover:scale-125 transition-transform duration-300 hover:drop-shadow-lg"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
