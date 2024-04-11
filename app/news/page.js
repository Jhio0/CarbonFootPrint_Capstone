"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import newsBar from "./components/newsBar";

// use this api to get the news

// https://rapidapi.com/cvera08/api/climate-crisis


export default function NewsItem({ news }) {
    const [newsList, setNewsList] = useState([]);
    const newsListUtil = [...newsList]

    const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=10';
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
            const result = await response.json();
            setNewsList(result.articles);
            console.log(result.articles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);
    

    return (
        <div className="bg-color-[#1E1E1C] ">
            <h1 className="bg-black text-center text-white font-bold text-2xl pt-3 mx-10 font-serif">News</h1>
            <div className="flex flex-wrap place-content-center bg-black mx-10 pb-10 ">
                {newsListUtil.map((newsItem) => (
                    <div key={newsItem.id} className="news-container w-2/5 border-4 bg-ferngreen-700 p-4 m-4 border-b-ferngreen-900 border-r-ferngreen-900  border-t-ferngreen-600 border-l-ferngreen-600">
                        <h2 className="text-xl font-bold text-white font-Typography">{newsItem.title}</h2>
                        <p className="text-white font-Typography">{newsItem.description}</p>
                        <Link className="text-white underline " href={`${newsItem.url}`}>
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
           
        </div>
    );
}
