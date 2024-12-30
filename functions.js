require("dotenv").config();
// const fetch = require("node-fetch");

const { GoogleGenerativeAI } = require("@google/generative-ai");

// the api key is coming from .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // specifying model ,using 1.5-flash because its token limit and quatos are high for free tire
  generationConfig: {
    candidateCount: 1,
    temperature: 0.5, // it will ensure the creative answer 0-2 (smaller the better)
  },
});

// METHOD 1: using the GoogleGenerativeAI (Google AI SDK) Package
// this function will return a gemini ai response as a text
const geminiAi = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); //returning the respons from the AI
  } catch (err) {
    console.log(err);
    return "an error occurred while AI generating";
  }
};

// 2nd METHOD : fetching using APIs
//  In this function we use the API fetch method to get the response from the GeminiAI

// const geminiAi = async (prompt) => {
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`;
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: {
//             parts: {
//               text: prompt,
//             },
//           },
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }
//      const data = await response.json();
//      const message = data.candidates[0].content.parts[0].text;
//      return message;
//     } catch (error) {
//       return "Error fetching Gemini AI response"
//       console.error("Error fetching Gemini AI response:", error.message);
//     }
// }

// this function returns true if the message has a greeting exportfrom greetings array
const checkGreetings = (msg) => {
  const greetings = ["&hello", "&Hello", "&hi", "&Hi", "&HELLO"];
  return greetings.includes(msg);
};

// This function returns an joke from the Jokes array. [the jokes are taken from the internet :-) ]
const getJoke = () => {
  const jokesArray = [
    "What's Thanos' favorite app on his phone? (Snap)chat.",
    "Why are snails slow? Because they're carrying a house on their back.",
    "How does the ocean say hi? It waves!",
    "Name the kind of tree you can hold in your hand? A palm tree!",
    " What do you call a guy who's really loud? Mike.",
    " I'm reading a book about anti-gravity. It's impossible to put down.",
  ];

  const joke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
  return joke;
};

// this function returns Current Time
const getCurTime = () => {
  const now = new Date();
  const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  return formattedTime;
};

module.exports = { geminiAi, checkGreetings, getJoke, getCurTime };
