"use client";

import React, { use } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import newsBar from "./components/newsBar";

export default function NewsItem({ news }) {
    const url = 'https://climate-news-live.p.rapidapi.com/news/guardian';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
        }
    };

    const fetchNews = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);
    

    return (
        <div className="bg-black">
            <h1>News</h1>
            {/* <newsBar /> */}
        </div>
    );
}
