"use client";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Ticket,
  CalendarX,
  Search,
} from "lucide-react";

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
  const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = [
    "All",
    ...Array.from(new Set(events.map((event) => event.category))),
  ];

  const filteredEvents = events.filter((event) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.venue.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#071A2B] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            <Ticket size={14} />
            What&apos;s on
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-lg text-slate-400">
            Discover events, workshops and opportunities.
          </p>
        </div>

        {/* Search & Category Filters */}
        <div className="mb-10 space-y-5">

          {/* Search */}
          <div className="relative mx-auto max-w-2xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search events, venues, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#0F2740]
                py-4
                pl-12
                pr-4
                text-white
                outline-none
                placeholder:text-slate-500
                transition
                focus:border-amber-400/50
                focus:ring-2
                focus:ring-amber-400/10
              "
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  rounded-full
                  px-5
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    selectedCategory === category
                      ? "bg-amber-400 text-[#071A2B]"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="h-52 w-full bg-white/[0.06]" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-20 rounded-full bg-white/[0.06]" />
                  <div className="h-6 w-3/4 rounded bg-white/[0.06]" />
                  <div className="h-4 w-full rounded bg-white/[0.06]" />
                  <div className="h-4 w-2/3 rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-24 text-center">
            <CalendarX className="text-slate-500" size={40} />
            <p className="mt-4 text-lg font-medium text-slate-300">
              No upcoming events
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Check back soon — new events are added regularly.
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-24 text-center">
              <Search className="text-slate-500" size={40} />

              <p className="mt-4 text-lg font-medium text-slate-300">
                No events found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try a different search term or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-[#071A2B] transition hover:bg-amber-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0F2740]
                  shadow-lg
                  shadow-black/20
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-amber-400/40
                  hover:shadow-amber-400/10
                "
              >
                {/* Event Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2740] via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6">

                  {/* Category */}
                  <span
                    className="
                      inline-block
                      rounded-full
                      bg-amber-400/10
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-amber-300
                      ring-1
                      ring-inset
                      ring-amber-400/30
                    "
                  >
                    {event.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 text-2xl font-bold text-white">
                    {event.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 text-slate-400">
                    {event.description}
                  </p>

                  {/* Divider */}
                  <div className="my-5 border-t border-dashed border-white/10" />

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
                          bg-amber-400/10
                          text-amber-300
                        "
                      >
                        <CalendarDays size={20} />
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Date & Time
                        </p>

                        <p className="font-medium text-white">
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
                          bg-amber-400/10
                          text-amber-300
                        "
                      >
                        <MapPin size={20} />
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Venue
                        </p>

                        <p className="font-medium text-white">
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
                      bg-amber-400
                      px-4
                      py-3
                      text-center
                      font-semibold
                      text-[#071A2B]
                      transition
                      hover:bg-amber-300
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