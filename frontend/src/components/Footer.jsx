import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300">
      <div className="container mx-auto p-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gundar. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-4">
          <p>Ilham Maulana - 50422703</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
