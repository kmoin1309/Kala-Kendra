const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const genAI = new GoogleGenerativeAI("AIzaSyDMuxmy8CrJFWwDPD5SDtMsHNx163QFtmg");

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const imageExtract = async (imagebuffer) => {
  console.log("imageExtract");
  try {
    const systemInstruction = `Analyze the image provided. The image contains a handmade product or artifact from a vendor. Extract the following key details from the image:

- Title of the product
- Description of the product

Output the extracted data in the following JSON format:
{
  "title": "Handmade Wooden Art",
  "description": "A short description of the handmade wooden art product."
}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
      systemInstruction,
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      response_mime_type: "application/json",
    };

    // The image is passed directly as a buffer
    const chatSession = model.startChat({
      generationConfig,
    });

    // You can send the image buffer directly as a prompt
    const prompt = `Image: ${imagebuffer.toString("base64")}`; // Convert the image buffer to base64 string

    const result = await chatSession.sendMessage(prompt);
    
    const jsonResult = JSON.parse(result.response.text());
    console.log(jsonResult);
    return jsonResult;
  } catch (e) {
    console.error("Error during image extraction:", e);
  }
};

module.exports = {
  imageExtract,
};
