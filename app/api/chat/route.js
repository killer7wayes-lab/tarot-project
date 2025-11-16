import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    console.log('API route called');
    
    const { messages, model = 'llama-3.1-8b-instant' } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY
    
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    console.log('Making request to Groq API...');
    
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.8,
        max_tokens: 1500,
        stream: false
      })
    })

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || 'Groq API request failed' },
        { status: groqResponse.status }
      )
    }

    const data = await groqResponse.json();
    console.log('Groq API success');
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}

// Add this to handle preflight OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
