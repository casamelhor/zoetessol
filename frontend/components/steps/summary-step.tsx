"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import type { BookingData } from "../booking-wizard"

interface SummaryStepProps {
  bookingData: BookingData
  onEdit: (step: number) => void
  onConfirm: () => void
}

export function SummaryStep({ bookingData, onEdit, onConfirm }: SummaryStepProps) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showEditMenu, setShowEditMenu] = useState(false)

  const handleSubmit = async () => {
    // Mock API call
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        onConfirm()
      }
    } catch (error) {
      console.error("Booking submission failed:", error)
      // In a real app, show error message
      onConfirm() // For demo purposes, proceed anyway
    }
  }

  const renderBookingDetails = () => {
    const { bookingType, hotelBooking, flightBooking, trainBooking } = bookingData

    if (bookingType === "hotel" && hotelBooking) {
      return (
        <div className="space-y-2">
          <h4 className="font-semibold text-primary">Hotel Booking Details</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Location:</span> {hotelBooking.location}
            </div>
            {hotelBooking.locality && (
              <div>
                <span className="font-medium">Locality:</span> {hotelBooking.locality}
              </div>
            )}
            {hotelBooking.hotelName && (
              <div>
                <span className="font-medium">Hotel:</span> {hotelBooking.hotelName}
              </div>
            )}
            <div>
              <span className="font-medium">Room Type:</span> {hotelBooking.roomType}
            </div>
            <div>
              <span className="font-medium">Check-in:</span>{" "}
              {new Date(hotelBooking.checkInDate).toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-medium">Check-out:</span>{" "}
              {new Date(hotelBooking.checkOutDate).toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-medium">Total Nights:</span> {hotelBooking.totalNights}
            </div>
            <div>
              <span className="font-medium">Meal Plan:</span> {hotelBooking.mealPlan}
            </div>
            {hotelBooking.expectedRate && (
              <div>
                <span className="font-medium">Expected Rate:</span> ₹{hotelBooking.expectedRate.toLocaleString("en-IN")}
                /night
              </div>
            )}
            <div>
              <span className="font-medium">Total Budget:</span> ₹{hotelBooking.totalBudget.toLocaleString("en-IN")}
            </div>
            {hotelBooking.specialInstructions && (
              <div className="md:col-span-2">
                <span className="font-medium">Special Instructions:</span> {hotelBooking.specialInstructions}
              </div>
            )}
          </div>
        </div>
      )
    }

    if (bookingType === "flight" && flightBooking) {
      return (
        <div className="space-y-2">
          <h4 className="font-semibold text-primary">Flight Booking Details</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Trip Type:</span> {flightBooking.tripType}
            </div>
            <div>
              <span className="font-medium">From:</span> {flightBooking.travelFrom}
            </div>
            <div>
              <span className="font-medium">To:</span> {flightBooking.travelTo}
            </div>
            {flightBooking.airlinePreference && (
              <div>
                <span className="font-medium">Airline:</span> {flightBooking.airlinePreference}
              </div>
            )}
            <div>
              <span className="font-medium">Departure:</span>{" "}
              {new Date(flightBooking.departureDate).toLocaleDateString("en-GB")}
            </div>
            {flightBooking.returnDate && (
              <div>
                <span className="font-medium">Return:</span>{" "}
                {new Date(flightBooking.returnDate).toLocaleDateString("en-GB")}
              </div>
            )}
            {flightBooking.preferredDepartureTime && (
              <div>
                <span className="font-medium">Departure Time:</span> {flightBooking.preferredDepartureTime}
              </div>
            )}
            {flightBooking.preferredReturnTime && (
              <div>
                <span className="font-medium">Return Time:</span> {flightBooking.preferredReturnTime}
              </div>
            )}
            <div>
              <span className="font-medium">Meals:</span> {flightBooking.meals}
            </div>
            {flightBooking.baggageAllowance && (
              <div>
                <span className="font-medium">Baggage:</span> {flightBooking.baggageAllowance}kg
              </div>
            )}
            <div>
              <span className="font-medium">Budget:</span> ₹{flightBooking.flightBudget.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      )
    }

    if (bookingType === "train" && trainBooking) {
      return (
        <div className="space-y-2">
          <h4 className="font-semibold text-primary">Train Booking Details</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">From:</span> {trainBooking.fromStation}
            </div>
            <div>
              <span className="font-medium">To:</span> {trainBooking.toStation}
            </div>
            <div>
              <span className="font-medium">Date:</span> {new Date(trainBooking.travelDate).toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-medium">Class:</span> {trainBooking.journeyClass}
            </div>
            {trainBooking.preferredDepartureTime && (
              <div>
                <span className="font-medium">Departure Time:</span> {trainBooking.preferredDepartureTime}
              </div>
            )}
            {trainBooking.preferredArrivalTime && (
              <div>
                <span className="font-medium">Arrival Time:</span> {trainBooking.preferredArrivalTime}
              </div>
            )}
            {trainBooking.trainNumber && (
              <div>
                <span className="font-medium">Train:</span> {trainBooking.trainNumber}
              </div>
            )}
            {trainBooking.seatPreference && (
              <div>
                <span className="font-medium">Seat Preference:</span> {trainBooking.seatPreference}
              </div>
            )}
            <div>
              <span className="font-medium">Budget:</span> ₹{trainBooking.budgetLimit.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Step 4 of 4: Booking Summary</h2>

      <div className="space-y-6">
        {/* Booking Type */}
        <div className="bg-bg p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-2">Booking Type</h3>
          <p className="capitalize text-text">{bookingData.bookingType}</p>
        </div>

        {/* Booking Details */}
        <div className="bg-bg p-4 rounded-lg">{renderBookingDetails()}</div>

        {/* Passengers */}
        <div className="bg-bg p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-4">Passengers ({bookingData.passengers.length})</h3>
          <div className="space-y-4">
            {bookingData.passengers.map((passenger, index) => (
              <div key={passenger.id} className="border-l-4 border-primary-bright pl-4">
                <h4 className="font-medium text-primary">{passenger.fullName}</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-text-muted mt-2">
                  <div>Contact: {passenger.contactNumber}</div>
                  <div>Email: {passenger.email}</div>
                  <div>DOB: {new Date(passenger.dateOfBirth).toLocaleDateString("en-GB")}</div>
                  <div>Gender: {passenger.gender}</div>
                  <div>Grade: {passenger.employeeGrade}</div>
                  <div>Department: {passenger.department}</div>
                  {passenger.employeeId && <div>Employee ID: {passenger.employeeId}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Options */}
        <div className="flex space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowEditMenu(!showEditMenu)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark flex items-center"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </button>

            {showEditMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onEdit(2)
                    setShowEditMenu(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-bg"
                >
                  Edit Booking Details
                </button>
                <button
                  onClick={() => {
                    onEdit(3)
                    setShowEditMenu(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-bg"
                >
                  Edit Passengers
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation */}
        <div className="border-t pt-6">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-text">I confirm all details are correct.</span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!isConfirmed}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  )
}
