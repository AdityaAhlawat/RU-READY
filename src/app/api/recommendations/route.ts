import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import clientPromise from '@/lib/db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { searchTerm } = await request.json();

    if (!searchTerm) {
      return NextResponse.json({ message: 'searchTerm is required' }, { status: 400 });
    }

    // Fetch pings from the database
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('pings');
    const pings = await collection.find({}).toArray();

    // Use OpenAI to find the most relevant events
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Here are the available pings: ${JSON.stringify(pings)}` },
        { role: 'user', content: `Find the most relevant events for: ${searchTerm}. Only return the ping IDs in a JSON array format. DO NOT OUTPUT ANYTHING ELSE. If there are no relevant pings, return an empty array.` },
      ],
    });

    // Log the raw response from OpenAI for debugging
    console.log('OpenAI response:', completion);

    // Parse the response to get the recommended ping IDs
    const recommendedPingIds = JSON.parse(completion.choices[0].message.content);

    // Filter pings by the recommended ping IDs
    const recommendedPings = pings.filter(ping => recommendedPingIds.includes(ping._id.toString()));

    return NextResponse.json({ recommendedPings });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ message: 'Failed to fetch recommendations', error: error.message }, { status: 500 });
  }
}
