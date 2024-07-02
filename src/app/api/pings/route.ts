import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('pings');
      const pings = await collection.find({}).toArray();
  
      return NextResponse.json(pings);
    } catch (error: any) {
      return NextResponse.json({ message: 'Failed to fetch pings', error: error.message }, { status: 500 });
    }
  }
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { campusLocation, specificLocation, description, time, date, happeningNow } = data;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');

    const result = await collection.insertOne({
      campusLocation,
      specificLocation,
      description,
      time,
      date,
      happeningNow,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Ping created', ping: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create ping', error: error.message }, { status: 500 });
  }
}
