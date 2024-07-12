import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');
    const ping = await collection.findOne({ _id: new ObjectId(id) });

    if (!ping) {
      return NextResponse.json({ message: 'Ping not found' }, { status: 404 });
    }

    return NextResponse.json(ping);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch ping', error: error.message }, { status: 500 });
  }
}
