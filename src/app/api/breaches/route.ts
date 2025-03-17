import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset") || "0";

  try {
    const response = await fetch(
      `https://hiring.external.guardio.dev/fe/breaches?offset=${offset}`,
      {
        headers: {
          "X-Best-Pokemon": "Pikachu",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data.items);
  } catch (error) {
    console.error("Error fetching breach data:", error);
    return NextResponse.json(
      { error: "Failed to fetch breach data" },
      { status: 500 }
    );
  }
}
