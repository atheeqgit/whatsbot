const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const {
  geminiAi,
  getCurTime,
  getJoke,
  checkGreetings,
} = require("./functions.js");

const client = new Client({
  authStrategy: new LocalAuth(), // this will save the bot auth details once we scaned the QR , we dont have to logged in again and again
});

// Consoling an message when the client is ready.
client.on("ready", () => {
  console.log("client is ready");
});

// Generating QR code for Loging-in into whatsapp web using the whatsapp-web.js
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//!! Important !! - this is just a testing bot so Here we are using ( & ) symbol before all the commands which the bot will reply , because when the bot is running it wont accidenty send replies to actual messages..

// Below - we listen for messages , so we can reply to them when the bot is on.
client.on("message_create", async (message) => {
  // Checking for Option command
  if (message.body.toLowerCase() == "&options") {
    message.reply(
      "The Commands Available for this bot are:\n\n1.options command - &options\n\n2.greet command - &hello, &Hello, &hi. \n\n3.one line joke command - &joke.\n\n4.current time command - &time.\n\n5.To interact with geminiAi please use command (&gemini) and type your message after.\n\n (eg: &gemini hey, can you tell me about python?)"
    );
  }

  // Checking for Greeting command
  if (checkGreetings(message.body)) {
    message.reply(
      "Hello, the message is sent by an whatapp bot created using whatsweb.js\n\n use &options command to view command options "
    );
  }

  // Checking for Joke command
  if (message.body == "&joke") {
    message.reply(getJoke());
  }

  // Checking for Time command
  if (message.body == "&time") {
    message.reply("current time is :" + getCurTime());
  }

  // Checking for gemini command , which will generate an reponse from gemini ai
  if (message.body.startsWith("&gemini ")) {
    // this will check the message starts with &gemini command and will answer to it accordingly
    const AIresponse = await geminiAi(message.body.slice(7)); // spliting the actual message after &gemini command
    message.reply(AIresponse);
  }
});

client.initialize();
