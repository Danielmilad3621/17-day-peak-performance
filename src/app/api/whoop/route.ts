import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const webhookUrl = process.env.N8N_WHOOP_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      configured: false,
      message: "WHOOP integration not configured yet",
      data: null,
    });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json({
        configured: true,
        message: `WHOOP API returned ${res.status}`,
        data: null,
      }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({
      configured: true,
      message: "ok",
      data,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      configured: true,
      message: err instanceof Error ? err.message : "Failed to fetch WHOOP data",
      data: null,
    }, { status: 502 });
  }
}
