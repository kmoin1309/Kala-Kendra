/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyDMuxmy8CrJFWwDPD5SDtMsHNx163QFtmg";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
  });

  const review = "The color is a bit off, and the material feels cheap. but the shape is awesome";
  const message = `You are a recommendation system for artistry products. The user will provide product reviews, and your task is to analyze the review and suggest areas of improvement. Here is a review: ${review}. Please suggest improvements. in bullet points. no need to write in complete sentences. only working thing is needed just tell what is good and what could be better`;

  const result = await chatSession.sendMessage(message);
  console.log(result.response.text());
}

run();
