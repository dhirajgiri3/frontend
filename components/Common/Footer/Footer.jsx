"use client";

import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black mt-12 text-white py-8 w-full h-fit flex flex-col justify-center items-center gap-16">
      {/* Newsletter Section */}
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">
            Subscribe to our Newsletter
          </h3>
          <p className="text-sm mb-4">
            Stay updated with our latest collections and exclusive offers
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:border-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
        {/* Categories */}
        <div>
          <h5 className="font-semibold mb-4">CATEGORIES</h5>
          <ul className="space-y-2">
            {[
              "Sarees",
              "Dress Materials",
              "Kurtis",
              "Lehengas",
              "Gowns",
              "Western Wear",
              "Kids Wear",
              "Accessories",
            ].map((item, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Support */}
        <div>
          <h5 className="font-semibold mb-4">SUPPORT</h5>
          <ul className="space-y-2">
            {["Track Order", "Contact Us", "My Account", "Size Guide"].map((item, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h5 className="font-semibold mb-4">QUICK LINKS</h5>
          <ul className="space-y-2">
            {[
              "About Us",
              "Our Story",
              "Blog",
              "Wholesale Inquiry",
              "Store Locator",
            ].map((item, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Policies */}
        <div>
          <h5 className="font-semibold mb-4">OUR POLICIES</h5>
          <ul className="space-y-2">
            {[
              "FAQs",
              "Shipping Policy",
              "Return & Exchange Policy",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((item, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h5 className="font-semibold mb-4">CONTACT</h5>
          <p>info@navkarselection.com</p>
          <p className="mt-2">
            Call us at: <br />
            +91 9898989898 (India) <br />
            +91 9898989898 (International)
          </p>
          <p className="mt-2">10 am - 8 pm, Monday - Saturday</p>
          <p className="mt-2">
            For Wholesale Inquiries: <br />
            +91 9898989898
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-center md:text-left">
        <p>&copy; 2024 Navkar Selection. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <img
            src="https://imgs.search.brave.com/NilgYVKHQG1ZHUbb_KGls-jZ27yGduTnkPjm-mlbDhU/rs:fit:860:0:0:0/g:ce/aHR0cDovL2xvZnJl/di5uZXQvd3AtY29u/dGVudC9waG90b3Mv/MjAxNi8wNy92aXNh/X2xvZ29fNy5qcGc"
            alt="Visa"
            className="w-10 h-10 object-contain"
          />
          <img
            src="https://imgs.search.brave.com/FqDMQO0X65vZIoGMgFEYfnfBr7UsiV3kFhA2lU4SV8M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA1/L0NvbG9yLVBheXBh/bC1Mb2dvLTUwMHg0/MDQuanBn"
            alt="PayPal"
            className="w-10 h-10 object-contain"
          />
          <img
            src="https://imgs.search.brave.com/GpW9AO41NF6J_tpdzIWU4AEaGe7_ayefzFkiuOFbQ0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3J1cGF5/NTExOS5sb2dvd2lr/LmNvbS53ZWJw"
            alt="Rupay"
            className="w-10 h-10 object-contain"
          />
        </div>
        <p>100% Secure Payments</p>
      </div>
    </footer>
  );
};

export default Footer;
