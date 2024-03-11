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
                                <a href="/">
                                    News artical 1
                                </a>
                            </div>
                            
                    </div>
                    <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1>News artical 2</h1>
                            </div>
                    </div>
                    <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1>News artical 3</h1>
                            </div>
                    </div>
                    <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1>News artical 4</h1>
                            </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NewsTab