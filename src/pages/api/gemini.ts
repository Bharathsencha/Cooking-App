import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { prompt } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ message: "API key is missing" });
    }
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      res.status(200).json({ response: data.contents?.[0]?.parts?.[0]?.text || "No response from AI." });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      res.status(500).json({ message: "Error fetching AI response" });
    }
  }
  