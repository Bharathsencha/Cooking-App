export async function fetchAIResponse(command: string): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is missing!");
        return "API key is not set.";
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: command }] }] }),
            }
        );

        const data = await response.json();
        console.log("AI Full Response:", data); // ✅ Debugging line

        const aiMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!aiMessage) {
            console.error("AI response is empty:", data);
            return "Couldn't process request.";
        }

        return aiMessage;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "An error occurred while contacting the AI.";
    }
}
