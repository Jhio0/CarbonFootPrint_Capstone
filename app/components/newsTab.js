"use client"
import React, {useState} from "react";

const NewsTab = () => {

    const [isClick, setIsClick] = useState(false);

    const toggleNewsbar = () => {
        setIsClick(!isClick)
    }

    return (
        <nav>
            
        </nav>
    )
}

export default NewsTab