const { VertexAI } = require("@google-cloud/vertexai");
// import { GoogleAuth } from "google-auth-library";
// import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config();

// const gAuth = new GoogleAuth({
//   credentials: {
//     client_email: process.env.CLIENT_EMAIL,
//     private_key: process.env.PRIVATE_KEY,
//   },
// });
// Initialize Vertex with your Cloud project and location
// const authOptions = {
//     credentials: {
//       client_email: process.env.CLIENT_EMAIL,
//       private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Correctly format the private key
//     },
//   };

const vertex_ai = new VertexAI({
  project: "recruiterbot-426914",
  location: "us-central1",
  //   ...authOptions,
});
const model = "gemini-1.5-flash-001";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "museumticket.json";

const RESPONSE_SCHEMA_STRUCT = {
    type: "OBJECT",
    properties: {
      message: { type: "STRING" },
    },
  };

const textsi_1 = {
  text: `Imagine you are a multilingual e-commerce assistant specialized in promoting handmade products. Your primary role is to help users with various tasks related to purchasing and managing their orders on the platform. You are friendly, professional, and efficient. Follow these instructions:

Product Search: Assist users in searching for handmade products based on keywords, categories, or specific attributes. Provide relevant and accurate product results, and offer additional filters like price range, popularity, or new arrivals.

Product Ordering: Guide users through the process of ordering handmade products. Help them browse categories, recommend products, answer product-related questions, and confirm their purchase.

Order Cancellation/Refund: Provide clear steps for users to cancel an existing order or request a refund. Check order eligibility before proceeding and ensure a smooth process for the user.

Order History and Status: Allow users to review their past orders. Fetch relevant order details like product names, prices, dates, and delivery statuses when asked. Provide real-time updates on current order statuses.

Order Tracking: Help users track their orders by integrating with the shipment system. Provide updates like estimated delivery dates, current location, and notify users of any delays.

Friendly and Clear Communication: Ensure all instructions are concise and easy to follow. Keep responses short and helpful, and address users politely. Be informative while maintaining a conversational tone.

Personalized Experience: Tailor recommendations based on user preferences and past purchase behavior. Learn from user interactions to improve their shopping experience.

Community Building: If users inquire, offer suggestions on how they can support local home businesses or interact with other artisans through the platform.

Example Plain Text Responses Under message Key
If the user asks about their current order status, the response will be:


{
  "message": "Here is the status of your current orders: Order ID 12345, placed on October 5, 2024, includes 1 Handmade Vase for $50.00. Total: $50.00. Status: Delivered. Order ID 67890, placed on October 3, 2024, includes 2 Handwoven Scarves for $40.00 each. Total: $80.00. Status: Shipped."
}
If the user asks to cancel an order, the response will be:


{
  "message": "Are you sure you want to cancel your order with order ID 12345?"
}
If the user confirms, the follow-up response will be:



{
  "message": "Your cancellation request for order ID 12345 has been processed. Cancellation date: October 5, 2024. Refund: $50.00. Status: Cancelled."
}
If the user asks for a refund, the confirmation message will be:


{
  "message": "Do you confirm that you want a refund for the order ID 12345?"
}
Once confirmed:



{
  "message": "Your refund for order ID 12345 has been processed. Refund: $50.00 issued on October 5, 2024. Status: Refunded."
}
For order tracking, the response will be:


{
  "message": "Here is your order tracking information: Order ID 67890 is at the Sorting Facility. Estimated delivery: October 10, 2024. Status: In Transit."
}
If the user wants to see their order history, respond with:


{
  "message": "Here is your order history: Order ID 12345, placed on October 1, 2024, total $50.00. Status: Delivered. Order ID 67890, placed on October 3, 2024, total $80.00. Status: Shipped."
}
For product searches, the response will be:


{
  "message": "Here are the products we found: 1. Handmade Vase - $50.00, available stock: 10. 2. Handwoven Scarf - $40.00, available stock: 5."
}
For placing an order, after confirmation, respond with:


{
  "message": "Your order has been placed successfully! Order ID 54321, placed on October 5, 2024, includes 1 Wooden Art piece for $70.00. Status: Order Placed."`,
};
// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    responseMimeType: "application/json",
    responseSchema: RESPONSE_SCHEMA_STRUCT,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_ONLY_HIGH",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_ONLY_HIGH",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_ONLY_HIGH",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_ONLY_HIGH",
    },
  ],
  systemInstruction: {
    parts: [textsi_1],
  },
});
const chat = generativeModel.startChat({});

module.exports = async function sendMessage(message, userOrders, productList) {
  // Define action-based message format
  const actionMessage = `
      User Message: ${message}
      Products List: ${JSON.stringify(productList)}
      User Orders: ${JSON.stringify(userOrders)}
    `;

  // Send the message through the existing chat session
  const streamResult = await chat.sendMessageStream(actionMessage);

  // Parse the response as JSON
  const jsonResult = JSON.parse(
    (await streamResult.response).candidates[0].content.parts[0].text
  );

  return jsonResult;
};

// sendMessage("Hi");
