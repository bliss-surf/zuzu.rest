export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const urlregx = /^[a-f0-9]{32}\.[a-zA-Z0-9]+$/.test(slug)
    if (!urlregx) {
      return new Response('not found', { status: 404 })
    }
    
    const response = await fetch(`http://yuu.pm/${slug}`, {
      next: { revalidate: 31536000 }
    })
    
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
