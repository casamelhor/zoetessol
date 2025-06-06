"use client"

import { useState } from "react"
import { Hotel, Plane, Train } from "lucide-react"
import type { BookingType } from "../booking-wizard"

interface BookingTypeStepProps {
  bookingType: BookingType
  onNext: (type: BookingType) => void
}

export function BookingTypeStep({ bookingType, onNext }: BookingTypeStepProps) {
  const [selectedType, setSelectedType] = useState<BookingType>(bookingType)

  const bookingOptions = [
    {
      type: "hotel" as const,
      icon: Hotel,
      title: "Hotel",
      subtitle: "Book Business Residences in Prime Locations",
    },
    {
      type: "flight" as const,
      icon: Plane,
      title: "Flight",
      subtitle: "Book Domestic & International Air Travel",
    },
    {
      type: "train" as const,
      icon: Train,
      title: "Train",
      subtitle: "Comfortable Train Journeys for Business Travel",
    },
  ]

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-primary mb-2">Select Your Booking Type</h2>
      <p className="text-lg text-text-muted mb-8">Choose how you'd like to begin your journey with us.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {bookingOptions.map((option) => {
          const Icon = option.icon
          const isSelected = selectedType === option.type

          return (
            <div
              key={option.type}
              onClick={() => setSelectedType(option.type)}
              className={`relative cursor-pointer rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                isSelected ? "ring-2 ring-primary-bright shadow-md" : "bg-bg"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-lg ${isSelected ? "bg-primary text-white" : "bg-bg-light text-primary"}`}>
                  <Icon size={32} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{option.title}</h3>
                  <p className="text-sm text-text-muted">{option.subtitle}</p>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isSelected ? "bg-primary border-primary" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => selectedType && onNext(selectedType)}
        disabled={!selectedType}
        className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  )
}
