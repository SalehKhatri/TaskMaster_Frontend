import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import useProtectedRoute from "@/hooks/useProtectedRoute.tsx";
import Navbar from "@/components/Navbar.tsx";
import {NavItem} from "@/types/navbar.ts";
import {Layers, List} from "lucide-react";

const ProtectedLayout: React.FC = () => {
  const isAuthenticated = useProtectedRoute(); // Call the hook
  const navigate = useNavigate();
  if (isAuthenticated === null) {
    return null; // Don't render anything if the user is redirected
  }

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      link:'/',
      icon: <Layers size={'20'}/>
    },
    {
      title: "Tasks",
      link:'/tasks',
      icon: <List size={'20'}/>
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <Navbar navItems={navItems} showLogoutButton={true} onLogout={handleLogout}/>
        <Outlet />
    </>
  );
};

export default ProtectedLayout;
