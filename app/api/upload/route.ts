export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const response = await fetch('http://yuu.pm/upload', {
      method: 'POST',
      body: formData,
    })

    const text = await response.text()
    
    if (!response.ok) {
      return Response.json(
        { 
          error: `server said no (${response.status})`, 
          details: text 
        },
        { status: response.status }
      )
    }
    
    try {
      const data = JSON.parse(text)
      return Response.json(data)
    } catch {
      return Response.json({ success: true, response: text })
    }
  } catch (error) {
    return Response.json(
      { 
        error: 'upload failed', 
        details: String(error) 
      },
      { status: 500 }
    )
  }
}
