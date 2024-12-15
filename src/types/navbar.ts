import {ReactNode} from "react";

export interface NavItem {
    title: string;
    link: string;
    icon?: ReactNode
}

export interface NavbarProps {
    brand?: string;
    navItems: NavItem[];
    showLogoutButton?: boolean;
    onLogout?: () => void;
}
