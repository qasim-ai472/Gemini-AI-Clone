const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
/**
 * Sends the user's prompt to Gemini and returns the AI response text.
 */
export async function fetchGeminiResponse(userPrompt, imageData = null) {
    
    // Prepare the parts of the message
    const parts = [{ text: userPrompt }];
    
    // If an image is provided, add it to the parts
    if (imageData) {
        parts.push({
            inlineData: {
                mimeType: imageData.mimeType,
                data: imageData.base64
            }
        });
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: parts }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("API Error:", error);
        return "Failed to get response. Please try again.";
    }
}