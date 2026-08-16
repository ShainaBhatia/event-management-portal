"use client";
import { useEffect, useState} from "react";
import { CalendarDays, MapPin } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  time: string;
  venue: string;
  category: string;
  image: string;
  registerLink: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const fetchEvents = async () => {
      try {
      const response = await fetch("/api/events");
      const data = await response.json();

      const upcomingEvents = data.filter(
        (event: Event) => new Date(event.time) > new Date()
      );
      setEvents(upcomingEvents);
      
      setLoading(false);
      } catch (error) {
        console.error ("Error in fetching events: ", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [])

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
  <main className="min-h-screen bg-[#071A2B] px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      
      {/* Page heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Upcoming Events
        </h1>

        <p className="mt-3 text-lg text-gray-300">
          Discover events, workshops and opportunities.
        </p>
      </div>

      {/* Events */}
      {events.length === 0 ? (
        <p className="text-center text-gray-600">
          No upcoming events.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
  <div
    key={event._id}
    className="
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      bg-white
      shadow-sm
      transition
      hover:-translate-y-1
      hover:shadow-lg
    "
  >
    {/* Event Image */}
    <img
      src={event.image}
      alt={event.title}
      className="h-52 w-full object-cover"
    />

    {/* Card Content */}
    <div className="p-6">

      {/* Category */}
      <span
        className="
          inline-block
          rounded-full
          bg-blue-100
          px-3
          py-1
          text-sm
          font-medium
          text-blue-700
        "
      >
        {event.category}
      </span>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        {event.title}
      </h2>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-gray-600">
        {event.description}
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200" />

      {/* Event Details */}
      <div className="space-y-4">

        {/* Date */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-blue-600
            "
          >
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Date & Time
            </p>

            <p className="font-medium text-gray-900">
              {new Date(event.time).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-blue-600
            "
          >
            <MapPin size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Venue
            </p>

            <p className="font-medium text-gray-900">
              {event.venue}
            </p>
          </div>
        </div>

      </div>

      {/* Register Button */}
        <a
          href={event.registerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6
            block
            w-full
            rounded-xl
            bg-[#071A2B]
            px-4
            py-3
            text-center
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Register Now
        </a>

    </div>
  </div>
))}
        </div>
      )}
    </div>
  </main>
);
}
