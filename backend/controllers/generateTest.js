
// const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA-zclU8ry4SMLO5cSwa5-8JQ7IfhKaR08" });

import story from "../models/GenerateCodeSchema.js";

// const ai = await loadGoogleGenAI("AIzaSyA-zclU8ry4SMLO5cSwa5-8JQ7IfhKaR08"); 

export const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
    You are an expert coder and  Tester and test writer and testing  strategist.
Write a complete test  for the give language or 
code and correct the mistakes in the code suggest best variable names: ${prompt}.
Return the test case and suggestions and  in clean and readable  format and give some spaces after heading .


⚙️ Requirements:
✅ write at least three(3) different test case.
✅ maintainable and clean code test.
✅ check the code quality.
✅ correct the mistakes in the code.
output:

test case:
[clean code , language supported]


Mistakes:
[Short and friendly texts (under 160 characters) tell the mistakes in the code]

suggestions:

[suggestions for code improvements]



`,
    });

    // console.log(response)
    console.log("Generated Response =>", response.candidates[0].content.parts[0].text);

    const userid = req.user.id;

    await story.create({
      owner: userid,
      generatedCode: response.candidates[0].content.parts[0].text,
    });

    return res.status(200).json({
      success: true,
      message: "Data retrieved",
      data: response,
    });
  } catch (err) {
    console.log("Error while sending request to Geminai", err);

    // Provide a more specific error message based on the error code
    if (err.response && err.response.status === 400) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error while sending request to Geminai",
      });
    }
  }
};
