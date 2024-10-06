const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

const apiKey = process.env.API_KEY_4;
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
    const systemInstruction = `The image is an artifact or handmade product by a vendor , Scan the image extract key information from the image like:
Title , description and category (from the given categories : Decor, Jewellery,Gifts,Walls Arts,Footwear)  
While giving the title and description consider SEO as well.
Required JSON format:
{
  "title": "Handmade Wooden Art",
  "description": "Handmade Wooden Art",
  "category": "Decor"
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

    const image = imagebuffer;

    const chatSession = model.startChat({
      generationConfig,
    });
    
    const prompt = `Image: ${image}`;

    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text())
    const jsonResult = JSON.parse(result.response.text());
    console.log(jsonResult);
    return jsonResult;
  } catch (e) {
    console.log(e);
    return null;
  }
};
module.exports = {
  imageExtract,
};
