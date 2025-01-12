import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300">
      <div className="container mx-auto p-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gunadarma. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-4 ">
          <p>Ilham Maulana - 50422703 </p>
        </div>
        <div className="text-blue-400">
          <a href="https://github.com/ilhmlnaa/pwebutss" target="_blank">
            Github Repository{" "}
            <span>
              <FontAwesomeIcon icon={faGithub} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
