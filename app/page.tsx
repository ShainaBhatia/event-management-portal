import Link from "next/link";
import { Ticket, CalendarDays, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#071A2B]">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-10 px-6 py-32 text-center sm:px-16">

        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
          <Ticket size={14} />
          Event Discovery
        </span>

        <div className="flex flex-col items-center gap-6">
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Find events worth showing up for.
          </h1>

          <p className="max-w-md text-lg leading-8 text-slate-400">
            Browse upcoming workshops, hackathons and meetups, all in one
            place, and register in a couple of clicks.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-semibold sm:flex-row">
          <Link
            href="/events"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-amber-400
              px-6
              text-[#071A2B]
              transition-colors
              hover:bg-amber-300
              sm:w-auto
            "
          >
            <CalendarDays size={18} />
            Browse Events
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/admin/login"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              px-6
              text-white
              transition-colors
              hover:bg-white/[0.04]
              sm:w-auto
            "
          >
            Admin Login
          </Link>
        </div>

      </main>
    </div>
  );
}