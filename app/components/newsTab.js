"use client"
import React, {useState} from "react";

const NewsTab = () => {

    const [isClick, setIsClick] = useState(false);

    const toggleNewsbar = () => {
        setIsClick(!isClick)
    }

    return (
        <nav className="bg-black position:fixed">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                            <div className="flex-shrink-0">
                    <h1>hello</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NewsTab