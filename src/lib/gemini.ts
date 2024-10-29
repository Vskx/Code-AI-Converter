import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function convertCode(
  sourceCode: string,
  targetLanguage: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Convert and optimize the following code to ${targetLanguage}.
      Please provide only the converted code without explanations.
      Focus on following best practices and optimizations for ${targetLanguage}.
      
      Source code:
      ${sourceCode}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error converting code:", error);
    throw error;
  }
}
