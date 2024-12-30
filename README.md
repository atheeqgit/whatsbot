WhatsApp Bot
Overview
This WhatsApp Bot was developed using whatsapp-web.js and integrates Google Gemini AI for dynamic responses. It demonstrates handling custom commands and intelligent interactions through WhatsApp messages.

Features
WhatsApp Integration
The bot uses the whatsapp-web.js library, which relies on WhatsApp Web with Puppeteer for automation.

Commands
Since this is a test bot running on my personal number, all commands are prefixed with the symbol &. This prevents the bot from accidentally replying to regular chats.

Custom Commands:

Greeting Commands
Commands: &hello, &hi, &Hello, &HELLO
Response: Sends a greeting message.

Options Command
Commands: &options, &option, &Options, &OPTIONS
Response: Displays a list of all available bot commands.

Current Time Command
Command: &time
Response: Returns the current time in 24-hour format.

Joke Command
Command: &joke
Response: Sends a random one-liner joke from a predefined array.

Gemini AI Command
Command: &gemini followed by your message (e.g., &gemini Tell me about Python).
Response: Generates a response using the Gemini AI API.

OpenAI API Limitation
Initially, OpenAI's API was planned for chat interactions. However, due to the following limitations, an alternative was implemented:

Free-tier access for OpenAI API usage had expired on my account.
Attempts to use alternate accounts were blocked by OpenAI due to device-based detection.
Alternative: Google Gemini AI API
To overcome this, I integrated Google's Gemini AI API, which offers:

Free-tier access with generous quotas and request limits.
A robust gemini-1.5-flash model for text generation, comparable to ChatGPT.

Implementation
API Integration
Two approaches were tested for API integration:

Fetching with API URL
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
Using the @google/generative-ai Dependency

The second method was chosen as it is more readable, simpler, and officially recommended by Google.

User prompts are passed to the Gemini AI function.
The function processes the input and generates a response using the gemini-1.5-flash model.
The bot sends the response back to the user via WhatsApp.
