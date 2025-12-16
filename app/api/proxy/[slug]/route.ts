export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const response = await fetch(`http://yuu.pm/${slug}`)
    
    if (!response.ok) {
      return new Response('not found', { status: 404 })
    }
    
    const buffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    
    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    return new Response('oops', { status: 500 })
  }
}
