import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

//GET   
export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ time: 1});

        return Response.json(events);
    }catch(error) {
        console.error ("Error fetching events: ", error);

        return Response.json(
            {message: "Failed to fetch events"},
            { status: 500}
        );
    }
}

//POST
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const event = await Event.create(body);

        return Response.json(event, { status: 201});
    }catch (error) {
        console.error("Error in creating event: ", error);

        return Response.json (
            { message: "Failed to create event"},
            { status: 500}
        );
    }
}