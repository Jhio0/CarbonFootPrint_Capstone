import React from "react";
import Footer from "./footer.js";

export default function Layout({ children }) {
    return (
        <main className="justify-center p-20 m-auto">
            {children}
        </main>
    );
}