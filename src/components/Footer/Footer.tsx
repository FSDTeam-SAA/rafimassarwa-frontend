import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#EAF6EC] py-12 text-gray-700">
      <div className="container mx-auto lg:flex lg:justify-between">
        {/* Company Info */}
        <div className="lg:w-[500px] mb-10 lg:mb-0">
          <div className="mb-4">
            <Image
              src="/images/Stock-logo-1.png"
              width={100}
              height={100}
              alt="Olives Stocks Logo"
              className="h-[54px] w-[48px] mr-2"
            />
            <h3 className="text-[24px] font-semibold mt-6 text-black">
              Olives Stocks
            </h3>
          </div>
          <p className="text-base leading-[150%]">
            Were a cement tile company with a passion for color, stocking
            hundreds of cement tiles at our warehouse in New Jersey with fast
            shipping nationwide!
          </p>
          <p className="font-semibold">
            Lets help you create a space youll love!
          </p>
          <div className="flex space-x-4 mt-[70px]">
            <a
              href="#"
              className="rounded-full h-12 w-12 border flex items-center justify-center border-black"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="#"
              className="rounded-full h-12 w-12 border flex items-center justify-center border-black"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              className="rounded-full h-12 w-12 border flex items-center justify-center border-black"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="rounded-full h-12 w-12 border flex items-center justify-center border-black"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-10 lg:mb-0">
          <h4 className="text-[24px] text-black font-semibold mb-4">Quick Link</h4>
          <ul className="text-base space-y-2 font-normal">
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Browse Cement Tiles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Refund Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Shipping Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Trade
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Data sheet
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-900 transition duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe Newsletter */}

        {/* Contact */}
        <div>
          <div>
            <h4 className="text-[24px] font-semibold text-black mb-4 tracking-wider">
              Subscribe To Our Daily <br /> Newsletter
            </h4>
            <div className="flex mb-[50px] relative w-full">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-black border border-gray-300 rounded-md py-2 px-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 h-[50px]"
              />
              <button className="absolute right-[4px] top-[6px] bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-200">
                Subscribe
              </button>
            </div>
          </div>
          <h4 className="text-[24px] font-semibold text-black mb-4">Contact</h4>
          <ul className="text-sm space-y-3">
            <li className="flex text-[20px] leading-7">
              <FaMapMarkerAlt className="mr-2 text-[#4E4E4E] text-2xl mt-1" />
              18000 Commerce Parkway <br /> Mt Laurel, NJ 08054
            </li>
            <li className="flex items-center text-xl">
              <FaPhoneAlt className="mr-2 text-gray-500 text-xl" />
              856-988-1802
            </li>
            <li className="flex items-center text-xl">
              <FaEnvelope className="mr-2 text-gray-500 text-xl" />
              <a
                href="mailto:olesya@liltile.com"
                className="hover:text-gray-900 transition duration-200"
              >
                olesya@liltile.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-4">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 lg:flex justify-between items-center text-xs text-gray-500 ">
          <p className="text-center text-base">© 2025 rafimassanwa. All rights reserved.</p>
          <div className="mt-5 flex items-center justify-center text-base">
            <div className="space-x-4">
            <a href="#" className="hover:text-gray-700 transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700 transition duration-200">
              Conditions
            </a>
            <a href="#" className="hover:text-gray-700 transition duration-200">
              Support
            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
