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

  // Function to calculate total emissions
  const calculateTotalEmissions = () => {
    console.log(emissions.electricityEmission, emissions.naturalGasEmission);
    return emissions.electricityEmission + emissions.naturalGasEmission;
  };

  const handleCalculationRecommendation = async () => {
    const totalEmissions = calculateTotalEmissions();
    try {
      const prompt = `Given that a user has an electrical usage of ${emissions.electricityEmission.toFixed(2)} kWh, a natural gas usage of ${emissions.naturalGasEmission.toFixed(2)}, and a total carbon footprint of ${totalEmissions.toFixed(2)} kg CO2e , provide detailed, practical recommendations on how they can reduce their carbon footprint. Focus on lifestyle changes, energy use, and transportation.`;
      console.log("Prompt to OpenAI:", prompt);

      const messagesWithBaseContext = [{ role: "system", content: prompt }];

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messagesWithBaseContext,
        temperature: 0.6,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const aiResponse = response.choices[0].message.content;
      console.log("Recommendations from OpenAI:", aiResponse);
      setRecommendations(aiResponse);
      setDisplayedRecommendations(""); // Reset displayed text
      setTyping(true); // Start typing effect
    } catch (error) {
      console.error("Error fetching recommendations from OpenAI:", error);
      setRecommendations("Sorry, we couldn't fetch recommendations at this time.");
      setTyping(false); // Stop typing effect
    }
  };

  useEffect(() => {
    if (typing && recommendations.length > displayedRecommendations.length) {
      const timer = setTimeout(() => {
        setDisplayedRecommendations(recommendations.slice(0, displayedRecommendations.length + 1));
      }, 25); // Adjust typing speed as needed

      return () => clearTimeout(timer);
    } else {
      setTyping(false);
    }
  }, [displayedRecommendations, recommendations, typing]);

  return (
    <div className="w-[240px] pl-6">
      <button className="btn" onClick={handleCalculationRecommendation}>
        Get Recommendations
      </button>
      {displayedRecommendations && (
        <div>
          <h3>Recommendations:</h3>
          <div className="w-96 min-h-[200px] overflow-y-auto p-4 border border-gray-600 rounded-md">
            <p>{displayedRecommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
}
