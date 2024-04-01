import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function AIClimateRecommendation({ emissions }) {
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

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <button className="mb-4 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300" onClick={handleCalculationRecommendation}>
        Get Recommendations
      </button>
      {displayedRecommendations && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold mb-2">Recommendations:</h3>
          <div className="min-h-[200px] overflow-y-auto p-4 bg-white shadow rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">{displayedRecommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
}
