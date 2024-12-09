import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `https://nextjs-rho-red-22.vercel.app/api/dealer/${params.id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dealer data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dealer data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dealer data' },
      { status: 500 }
    );
  }
}
