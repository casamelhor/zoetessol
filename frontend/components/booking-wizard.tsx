"use client"

import { useState } from "react"
import { BookingTypeStep } from "./steps/booking-type-step"
import { HotelDetailsStep } from "./steps/hotel-details-step"
import { FlightDetailsStep } from "./steps/flight-details-step"
import { TrainDetailsStep } from "./steps/train-details-step"
import { PassengerStep } from "./steps/passenger-step"
import { SummaryStep } from "./steps/summary-step"
import { ProgressIndicator } from "./progress-indicator"

export type BookingType = "hotel" | "flight" | "train" | null

export interface HotelBooking {
  location: string
  locality?: string
  hotelName?: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalNights: number
  mealPlan: string
  expectedRate?: number
  totalBudget: number
  specialInstructions?: string
}

export interface FlightBooking {
  tripType: "one-way" | "two-way"
  travelFrom: string
  travelTo: string
  airlinePreference?: string
  departureDate: string
  returnDate?: string
  preferredDepartureTime?: string
  preferredReturnTime?: string
  meals: string
  baggageAllowance?: number
  flightBudget: number
}

export interface TrainBooking {
  fromStation: string
  toStation: string
  travelDate: string
  journeyClass: string
  preferredDepartureTime?: string
  preferredArrivalTime?: string
  trainNumber?: string
  seatPreference?: string
  budgetLimit: number
}

export interface Passenger {
  id: string
  fullName: string
  contactNumber: string
  email: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  employeeId?: string
  employeeGrade: string
  department: string
}

export interface BookingData {
  bookingType: BookingType
  hotelBooking?: HotelBooking
  flightBooking?: FlightBooking
  trainBooking?: TrainBooking
  passengers: Passenger[]
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    bookingType: null,
    passengers: [],
  })

  const totalSteps = 5

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingTypeStep
            bookingType={bookingData.bookingType}
            onNext={(type) => {
              updateBookingData({ bookingType: type })
              nextStep()
            }}
          />
        )
      case 2:
        if (bookingData.bookingType === "hotel") {
          return (
            <HotelDetailsStep
              data={bookingData.hotelBooking}
              onNext={(data) => {
                updateBookingData({ hotelBooking: data })
                nextStep()
              }}
              onBack={prevStep}
            />
          )
        } else if (bookingData.bookingType === "flight") {
          return (
            <FlightDetailsStep
              data={bookingData.flightBooking}
              onNext={(data) => {
                updateBookingData({ flightBooking: data })
                nextStep()
              }}
              onBack={prevStep}
            />
          )
        } else if (bookingData.bookingType === "train") {
          return (
            <TrainDetailsStep
              data={bookingData.trainBooking}
              onNext={(data) => {
                updateBookingData({ trainBooking: data })
                nextStep()
              }}
              onBack={prevStep}
            />
          )
        }
        break
      case 3:
        return (
          <PassengerStep
            passengers={bookingData.passengers}
            onNext={(passengers) => {
              updateBookingData({ passengers })
              nextStep()
            }}
            onBack={prevStep}
          />
        )
      case 4:
        return <SummaryStep bookingData={bookingData} onEdit={goToStep} onConfirm={nextStep} />
      case 5:
        return (
          <div className="text-center py-16">
            <div className="bg-bg-light border border-primary-bright/20 text-text px-8 py-6 rounded-xl mb-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-primary">Booking Submitted Successfully!</h2>
              <p className="text-lg text-text-muted">
                Thank you for choosing Tessol Zoe. Your booking request has been submitted and is waiting for
                confirmation.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentStep(1)
                setBookingData({ bookingType: null, passengers: [] })
              }}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Start New Booking
            </button>
          </div>
        )
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-bg">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <div className="bg-bg-light rounded-xl shadow-sm p-8 mt-8">{renderStep()}</div>
    </div>
  )
}
