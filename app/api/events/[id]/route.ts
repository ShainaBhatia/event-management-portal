import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return Response.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return Response.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);

    return Response.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return Response.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);

    return Response.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}