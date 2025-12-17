import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
    //retarded 404 check logic lol
  const urlregx = /^[a-f0-9]{32}\.[a-zA-Z0-9]+$/.test(slug)
  if (!urlregx) {
    notFound()
  }
  
  try {
    const response = await fetch(`http://yuu.pm/${slug}`, {
      next: { revalidate: 31536000 }
    })
    
    if (!response.ok) {
      notFound()
    }
    
    const buffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    
    return (
      <img
        src={`data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`}
        alt={slug}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  } catch (error) {
    notFound()
  }
}
