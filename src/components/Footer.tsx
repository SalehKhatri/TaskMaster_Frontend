import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-100/90 backdrop-blur-md shadow-sm border-t border-gray-100">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright */}
        <div className="text-sm text-gray-600">
          © 2024 TaskMaster. All rights reserved.
        </div>

        {/* Made with Love */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Made with</span>
          <span className="flex items-center space-x-1 group">
            <Heart
              size={16}
              fill="red"
              color="red"
              className="group-hover:scale-110 transition-transform"
            />
            <span>by</span>
            <a
              href="https://github.com/salehKhatri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Saleh Khatri
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
