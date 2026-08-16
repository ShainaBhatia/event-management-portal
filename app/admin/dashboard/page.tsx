"use client";

import { useEffect, useState } from "react";

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

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [registerLink, setRegisterLink] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an event image.");
      return;
    }

    setSaving(true);

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        alert(uploadData.message || "Image upload failed");
        return;
      }

      // 2. Create event using uploaded image URL
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          time,
          venue,
          category,
          image: uploadData.url,
          registerLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create event");
        return;
      }

      // 3. Refresh events
      const updatedResponse = await fetch("/api/events");
      const updatedEvents = await updatedResponse.json();

      setEvents(updatedEvents);

      // 4. Reset form
      setTitle("");
      setDescription("");
      setTime("");
      setVenue("");
      setCategory("");
      setImage("");
      setRegisterLink("");
      setSelectedFile(null);

      setShowForm(false);

    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditEvent = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!editingEventId) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/events/${editingEventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          time,
          venue,
          category,
          image,
          registerLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update event");
        return;
      }

      const updatedResponse = await fetch("/api/events");
      const updatedEvents = await updatedResponse.json();

      setEvents(updatedEvents);

      setTitle("");
      setDescription("");
      setTime("");
      setVenue("");
      setCategory("");
      setImage("");
      setRegisterLink("");

      setEditingEventId(null);
      setShowForm(false);

    } catch (error) {
      console.error("Error updating event:", error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };
  const startEditing = (event: Event) => {
    setEditingEventId(event._id);

    setTitle(event.title);
    setDescription(event.description);
    setTime(event.time);
    setVenue(event.venue);
    setCategory(event.category);
    setImage(event.image);
    setRegisterLink(event.registerLink);

    setShowForm(true);
  };

  const handleDeleteEvent = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete event");
        return;
      }

      // Fetch updated events
      const updatedResponse = await fetch("/api/events");
      const updatedEvents = await updatedResponse.json();

      setEvents(updatedEvents);

    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Something went wrong.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#071A2B] px-4 py-8 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-slate-400">
              Manage your events
            </p>
          </div>

          <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingEventId(null);

              setTitle("");
              setDescription("");
              setTime("");
              setVenue("");
              setCategory("");
              setImage("");
              setRegisterLink("");
              setSelectedFile(null);

              setShowForm(true);
            }}
            className="
              rounded-lg
              bg-amber-400
              px-5
              py-3
              font-semibold
              text-[#071A2B]
              transition
              hover:bg-amber-300
            "
          >
            + Add Event
          </button>

          <button
            onClick={handleLogout}
            className="
              rounded-lg
              border
              border-red-400/40
              px-5
              py-3
              font-semibold
              text-red-300
              transition
              hover:bg-red-400/10
            "
          >
            Logout
          </button>
        </div>
        </div>

        {showForm && (
        <form
          onSubmit={editingEventId ? handleEditEvent : handleAddEvent}
          className="mb-8 rounded-xl border border-white/10 bg-[#0F2740] p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {editingEventId ? "Edit Event" : "Add New Event"}
            </h2>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setImage("");
                setSelectedFile(null);
              }}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Title */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Event Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Hackathon, Workshop..."
                required
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Time */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Date & Time
              </label>

              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 [color-scheme:dark]"
              />
            </div>

            {/* Venue */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Venue
              </label>

              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="IGDTUW, Delhi"
                required
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Image */}
            <div className="sm:col-span-2">
              <label className="mb-2 block font-medium text-slate-300">
                Event Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      alert("Image must be smaller than 5MB.");
                      return;
                    }

                    setSelectedFile(file);
                    setImage(URL.createObjectURL(file));
                  }
                  
                }}
                className="
                  w-full
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-slate-300
                  file:mr-4
                  file:rounded-md
                  file:border-0
                  file:bg-amber-400/10
                  file:px-3
                  file:py-1.5
                  file:text-sm
                  file:font-medium
                  file:text-amber-300
                "
              />

              {image && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-slate-400">
                    Image Preview
                  </p>

                  <img
                    src={image}
                    alt="Event preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {/* Registration Link */}
            <div className="sm:col-span-2">
              <label className="mb-2 block font-medium text-slate-300">
                Registration Link
              </label>

              <input
                type="url"
                value={registerLink}
                onChange={(e) => setRegisterLink(e.target.value)}
                placeholder="https://example.com/register"
                required
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-2 block font-medium text-slate-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event..."
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={saving}
            className="
              mt-6
              w-full
              rounded-lg
              bg-amber-400
              py-3
              font-semibold
              text-[#071A2B]
              transition
              hover:bg-amber-300
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving
              ? editingEventId
                ? "Updating Event..."
                : "Creating Event..."
              : editingEventId
                ? "Update Event"
                : "Create Event"}
          </button>

        </form>
      )}

        {/* Events */}
        <div className="rounded-2xl border border-white/10 bg-[#0F2740] p-6 shadow-xl shadow-black/20">

          <h2 className="mb-6 text-2xl font-bold text-white">
            All Events
          </h2>

          {loading ? (
            <p className="text-slate-400">
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <p className="text-slate-400">
              No events found.
            </p>
          ) : (
            <div className="space-y-4">

              {events.map((event) => (
                <div
                  key={event._id}
                  className="
                    flex
                    flex-col
                    gap-4
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    transition
                    hover:border-amber-400/30
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  {/* Event information */}
                  <div className="flex items-center gap-4">

                    <img
                      src={event.image}
                      alt={event.title}
                      className="
                        h-20
                        w-20
                        rounded-lg
                        object-cover
                      "
                    />

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {event.title}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {event.venue}
                      </p>

                      <span className="
                        mt-1
                        inline-block
                        rounded-full
                        bg-amber-400/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-amber-300
                        ring-1
                        ring-inset
                        ring-amber-400/30
                      ">
                        {event.category}
                      </span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => startEditing(event)}
                      className="
                        rounded-lg
                        border
                        border-amber-400/40
                        px-4
                        py-2
                        font-medium
                        text-amber-300
                        transition
                        hover:bg-amber-400/10
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="
                        rounded-lg
                        bg-red-500/90
                        px-4
                        py-2
                        font-medium
                        text-white
                        transition
                        hover:bg-red-500
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>

    </main>
  );
}