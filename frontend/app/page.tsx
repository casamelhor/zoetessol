"use client"

import { useState } from "react"
import { BookingWizard } from "@/components/booking-wizard"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)

  if (showBooking) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowBooking(false)}
              className="text-primary-bright hover:text-primary-dark mb-4 flex items-center mx-auto"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold text-primary mb-2">Tessol Zoe Travel Booking</h1>
            <p className="text-lg text-text-muted">Your premium corporate travel concierge service</p>
          </div>
          <BookingWizard />
        </div>
      </div>
    )
  }

  return <LandingPage onStartBooking={() => setShowBooking(true)} />
}
