import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { NavbarProps } from "@/types/navbar.ts";
import { Button } from "@/components/ui/button.tsx";
import { LogOut, Menu, X } from "lucide-react";

const Navbar: React.FC<NavbarProps> = ({
  brand = "TaskMaster",
  navItems,
  showLogoutButton = false,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const location = useLocation();
  return (
    <NavigationMenu
      className={
        " text-black w-full max-w-[full] sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      }
    >
      <div
        className={
          "container w-full mx-auto flex items-center justify-between p-4"
        }
      >
        {/* Brand/Logo */}
        <Link
          to="/"
          className={
            "text-2xl font-primary font-bold text-black hover:text-neutral-900 transition-colors"
          }
        >
          {brand}
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <div className="hidden md:flex">
          <NavigationMenuList className="flex items-center">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.link;
              const { title, link, icon } = item;
              return (
                <NavigationMenuItem key={index} className={"font-secondary"}>
                  <Link
                    to={link}
                    className={`
            flex items-center space-x-2 
            px-3 py-2 rounded-md 
            transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }
          `}
                  >
                    {icon}
                    <span>{title}</span>
                  </Link>
                </NavigationMenuItem>
              );
            })}
            {showLogoutButton && (
              <Button
                variant="destructive"
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="flex items-center space-x-2 w-full"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            )}
          </NavigationMenuList>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item, index) => {
                  const isActive = location.pathname === item.link;
                  return (<Link
                      key={index}
                      to={item.link}
                      className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md ${
                          isActive
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={toggleMobileMenu}
                  >
                      {item.icon}
                      <span>{item.title}</span>
                  </Link>)
              })}

              {showLogoutButton && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center space-x-2 w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
