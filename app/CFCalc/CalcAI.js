"use client"
import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function AIClimateRecommendation({ emissions, onCalculate }) {
  const [recommendations, setRecommendations] = useState("");
  const [displayedRecommendations, setDisplayedRecommendations] = useState("");
  const [typing, setTyping] = useState(false);

  const calculateTotalEmissions = () => {
    return emissions.electricityEmission + emissions.naturalGasEmission;
  };

  const handleCalculationRecommendation = async () => {
    const totalEmissions = calculateTotalEmissions();
    try {
      const prompt = `Given that a user has an electrical usage of ${emissions.electricityEmission.toFixed(2)} kWh and a natural gas usage of ${emissions.naturalGasEmission.toFixed(2)} GJ, resulting in a total carbon footprint of ${totalEmissions.toFixed(2)} kg CO2e, provide detailed, practical recommendations on how they can reduce their carbon footprint, focusing on lifestyle changes, energy use, and transportation.`;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.6,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      setRecommendations(response.choices[0].message.content);
      setDisplayedRecommendations("");
      setTyping(true);
    } catch (error) {
      console.error("Error fetching recommendations from OpenAI:", error);
      setRecommendations("Sorry, we couldn't fetch recommendations at this time.");
      setTyping(false);
    }
  };

  useEffect(() => {
    if (typing && recommendations.length > displayedRecommendations.length) {
      const timer = setTimeout(() => {
        setDisplayedRecommendations(recommendations.slice(0, displayedRecommendations.length + 1));
      }, 25);

      return () => clearTimeout(timer);
    } else {
      setTyping(false);
    }
  }, [displayedRecommendations, recommendations, typing]);

    useEffect(() => {
      // Call the passed onCalculate function to fetch recommendations
      if (onCalculate) {
        handleCalculationRecommendation();
      }
    }, [onCalculate, emissions]);


  return (
    <div className="flex flex-col items-center mt-10">
      {displayedRecommendations && (
        <div className="mt-5 w-[450px] max-w-4xl">
          <h3 className="text-xl font-semibold mb-2 text-white">Sprouts Recommendations:</h3>
          <div className="h-96 overflow-y-auto p-4 bg-green-50 shadow rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">{displayedRecommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
}
