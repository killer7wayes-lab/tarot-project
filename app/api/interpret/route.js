export async function POST(request) {
  try {
    const body = await request.json();
    
    // Simple test response
    return Response.json({ 
      success: true,
      message: "API is working!",
      interpretation: "Test interpretation - your cards show positive changes ahead."
    });
    
  } catch (error) {
    return Response.json({ 
      error: "Server error" 
    }, { 
      status: 500 
    });
  }
}

export async function GET() {
  return Response.json({ 
    message: "Interpret API is running!" 
  });
}
