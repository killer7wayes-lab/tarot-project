export async function POST(request) {
  try {
    // Get the data sent from the frontend
    const body = await request.json();
    console.log('Received data:', body);
    
    // Here you would add your actual chat logic
    // For now, let's just return a success message
    return Response.json({ 
      success: true, 
      message: "Chat API is working!",
      receivedData: body
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json({ 
      error: "Something went wrong" 
    }, { 
      status: 500 
    });
  }
}

// Optional: If you want to allow GET requests too
export async function GET() {
  return Response.json({ 
    message: "Chat API is running!" 
  });
}
