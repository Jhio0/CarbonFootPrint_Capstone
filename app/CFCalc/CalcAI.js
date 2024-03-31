import React, { useState } from "react";
import OpenAI from "openai";

// Assuming your OpenAI setup and API key are correctly configured
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function AIClimateRecommendation({ emissions }) {
  const [recommendations, setRecommendations] = useState("");

  // Function to calculate total emissions
  const calculateTotalEmissions = () => {
    return emissions.electricityEmission + emissions.naturalGasEmission;
  };

  const handleCalculationRecommendation = async () => {
    const totalEmissions = calculateTotalEmissions();
    try {
      const prompt = `Given that a user has a carbon footprint of ${totalEmissions.toFixed(2)} kg CO2e per year from electricity and natural gas usage, provide detailed, practical recommendations on how they can reduce their carbon footprint. Focus on lifestyle changes, energy use, and transportation.`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      if (response && response.data && response.data.choices && response.data.choices.length > 0) {
        const aiResponse = response.data.choices[0].text.trim();
        setRecommendations(aiResponse);
      }
    } catch (error) {
      console.error("Error fetching recommendations from OpenAI:", error);
      setRecommendations("Sorry, we couldn't fetch recommendations at this time.");
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleCalculationRecommendation}>
        Get Recommendations
      </button>
      {recommendations && (
        <div>
          <h3>Recommendations:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
