import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full top-auto  h-[50vh] bg-black text-gray-200 py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">m❤️ments</h3>
            <p className="text-sm">Capture the essence of life!.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-red-500">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-red-500">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-red-500">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-red-500">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-red-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-red-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-red-500">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} m❤️ments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
