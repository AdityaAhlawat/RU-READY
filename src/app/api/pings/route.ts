import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

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
    const { campusLocation, specificLocation, description, time, date, duration, happeningNow, user } = data;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');

    // Calculate expireAt date in UTC
    const startDate = new Date(`${date}T${time}:00.000Z`);
    const expireAt = new Date(startDate.getTime() + duration * 60 * 1000);

    const result = await collection.insertOne({
      campusLocation,
      specificLocation,
      description,
      time,
      date,
      duration,
      happeningNow,
      user,
      createdAt: new Date(),
      expireAt: expireAt.toISOString(),  // Convert expireAt to UTC
    });

    return NextResponse.json({ message: 'Ping created', ping: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create ping', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { id, userEmail } = data;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      'user.email': userEmail,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Ping not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ping deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to delete ping', error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, userEmail, ...updateData } = data;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');

    // Calculate new expireAt date if time or duration is updated
    let expireAt;
    if (updateData.time || updateData.date || updateData.duration) {
      const existingPing = await collection.findOne({ _id: new ObjectId(id) });
      const time = updateData.time || existingPing.time;
      const date = updateData.date || existingPing.date;
      const duration = updateData.duration || existingPing.duration;
      const startDate = new Date(`${date}T${time}:00.000Z`);
      expireAt = new Date(startDate.getTime() + duration * 60 * 1000);
      updateData.expireAt = expireAt.toISOString();  // Convert expireAt to UTC
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id), 'user.email': userEmail },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Ping not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ping updated' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update ping', error: error.message }, { status: 500 });
  }
}
