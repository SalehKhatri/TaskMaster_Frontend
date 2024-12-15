import React from "react";
import { Toaster } from "react-hot-toast";
import {Outlet} from "react-router-dom";
import Footer from "@/components/Footer.tsx";

const RootLayout: React.FC = () => {
    return (
        <>
            <main className={"min-h-[100vh]"}>
                <Outlet />
            </main>
            <Footer />
            <Toaster />
            </>
    );
};

export default RootLayout;
