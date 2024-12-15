import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import {NavItem} from "@/types/navbar.ts";
import {LogIn, UserPlus} from "lucide-react";

const PublicLayout: React.FC = () => {

    const navItems: NavItem[] = [
        {
            title: "Create Account",
            link: '/signup',
            icon: <UserPlus size={'20'}/>
        },
        {
            title: "Login",
            link: '/login',
            icon: <LogIn size={'20'}/>
        }
    ]

  return (
    <>
        <Navbar navItems={navItems}/>
        <Outlet />
    </>
  );
};

export default PublicLayout;
