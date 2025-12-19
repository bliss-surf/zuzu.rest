export async function GET() {
  try {
    const res = await fetch('https://status.bliss.surf/status')
    const data = await res.json()
    return Response.json({ ok: true, data: data.yuu_pm_host })
  } catch (e) {
    return Response.json({ ok: false, error: 'failed to fetch status' }, { status: 500 })
  }
}
