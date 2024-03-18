import React from "react";

export default function Layout({ children }) {
    return (
        <main className="justify-center p-20 m-auto">
            {children}
        </main>
    );
}