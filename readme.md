# Mystic Tarot - Expert AI Reader

A professional tarot reading application powered by advanced AI.

## Features

- Multiple tarot decks (Classic, Gothic, Anime)
- Various spreads (Single Card, Three Card, Celtic Cross, etc.)
- AI-powered interpretations using Groq
- Beautiful, responsive design

## Setup

1. Clone this repository
2. Deploy to Vercel
3. Add your Groq API key as an environment variable in Vercel:
   - `GROQ_API_KEY=your_groq_api_key_here`

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key (required)

## Deployment

This project is configured for deployment on Vercel. The API route at `/api/chat` handles all AI requests securely.

## License

MIT