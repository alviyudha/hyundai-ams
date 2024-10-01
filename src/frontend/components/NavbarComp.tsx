import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", link: "/" },
  { label: "Models", link: "/models" },
  { label: "Contact", link: "/contact" },
  {
    label: "Services",
    children: [
      { label: "Services", link: "/services" },
      { label: "Test Drive", link: "/test-drive" },
    ],
  },
];

const NavbarComp = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white w-full shadow-md mb-1 sticky ${
        isScrolled ? "top-0 z-20" : ""
      }`}
    >
      <div className="container mx-auto p-3 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/HYU_Logo_Horizontal_Warna_Biru.png"
              alt="Hyundai-AMS"
              className="h-6"
            />
          </Link>
        </div>

        {/* Menu Tengah */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <div className="relative">
                  <button
                    onClick={toggleServices}
                    className="text-neutral-400 hover:text-gray-600 focus:outline-none"
                  >
                    {item.label}
                  </button>
                  {isServicesOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      {item.children.map((child, idx) => (
                        <a
                          key={idx}
                          href={child.link}
                          className="block px-4 py-2 text-neutral-400 hover:bg-gray-100"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.link}
                  className="text-neutral-400 hover:text-gray-600"
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Icon Menu Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-neutral-400 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Logo Kanan */}
        <div className="hidden md:flex flex-shrink-0">
          <img src="/ams_logo_merah.png" alt="Logo Kanan" className="h-8" />
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <div className="relative">
                  <button
                    onClick={toggleServices}
                    className="block w-full text-left px-4 py-2 text-neutral-400 hover:bg-gray-100 focus:outline-none"
                  >
                    {item.label}
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4">
                      {item.children.map((child, idx) => (
                        <a
                          key={idx}
                          href={child.link}
                          className="block px-4 py-2 text-neutral-400 hover:bg-gray-100"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.link}
                  className="block px-4 py-2 text-neutral-400 hover:bg-gray-100"
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
          <div className="flex justify-center mt-4">
            <img src="ams_logo_merah.png" alt="Logo Kanan" className="h-8" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComp;
