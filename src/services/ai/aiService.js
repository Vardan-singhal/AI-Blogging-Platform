import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ Only for testing — move to backend in production
});

/**
 * Fetch AI suggestions based on user interests
 * @param {string[]} interests - array of user-selected interests
 */
export const getAISuggestions = async (interests = []) => {
  const prompt = `
  You are an AI blogging assistant. 
  Based on the user's interests [${interests.join(", ")}], 
  generate 5 creative blog topic ideas. 
  Each idea should include:
  - a short, catchy title
  - a one-sentence summary
  Respond as a JSON array like:
  [
    { "title": "Title 1", "summary": "..." },
    { "title": "Title 2", "summary": "..." }
  ]
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast & cost-efficient
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  // Parse response safely
  try {
    const jsonText = response.choices[0].message.content.trim();
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("Error parsing AI response:", err);
    return [];
  }
};
