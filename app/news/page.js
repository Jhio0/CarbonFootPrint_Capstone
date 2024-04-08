"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsItem() {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=10';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setNewsList(result.articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-black">
            <h1>News</h1>
            <div className="flex flex-wrap">
                {newsList.map((newsItem) => (
                    <div key={newsItem.id} className="w-1/3 bg-white p-4 m-4">
                        <h2 className="text-xl font-bold text-black">{newsItem.title}</h2>
                        <p className="text-black">{newsItem.description}</p>
                        <Link className="text-black" href={`${newsItem.url}`}>
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}