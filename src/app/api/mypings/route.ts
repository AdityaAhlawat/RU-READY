import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');

    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
      return NextResponse.json({ message: 'User email is required' }, { status: 400 });
    }

    const pings = await collection.find({ 'user.email': userEmail }).toArray();

    return NextResponse.json(pings);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch pings', error: error.message }, { status: 500 });
  }
}
