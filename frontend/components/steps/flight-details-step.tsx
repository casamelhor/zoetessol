"use client"

import type React from "react"

import { useState } from "react"
import type { FlightBooking } from "../booking-wizard"

interface FlightDetailsStepProps {
  data?: FlightBooking
  onNext: (data: FlightBooking) => void
  onBack: () => void
}

export function FlightDetailsStep({ data, onNext, onBack }: FlightDetailsStepProps) {
  const [formData, setFormData] = useState<FlightBooking>({
    tripType: data?.tripType || "one-way",
    travelFrom: data?.travelFrom || "",
    travelTo: data?.travelTo || "",
    airlinePreference: data?.airlinePreference || "",
    departureDate: data?.departureDate || "",
    returnDate: data?.returnDate || "",
    preferredDepartureTime: data?.preferredDepartureTime || "",
    preferredReturnTime: data?.preferredReturnTime || "",
    meals: data?.meals || "",
    baggageAllowance: data?.baggageAllowance || undefined,
    flightBudget: data?.flightBudget || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.travelFrom.trim()) newErrors.travelFrom = "Travel from is required"
    if (!formData.travelTo.trim()) newErrors.travelTo = "Travel to is required"
    if (!formData.departureDate) newErrors.departureDate = "Departure date is required"
    if (!formData.meals) newErrors.meals = "Meal preference is required"
    if (!formData.flightBudget || formData.flightBudget <= 0) newErrors.flightBudget = "Flight budget is required"

    if (formData.tripType === "two-way" && !formData.returnDate) {
      newErrors.returnDate = "Return date is required for two-way trips"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  const handleInputChange = (field: keyof FlightBooking, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Step 2 of 4: Flight Booking Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Trip Type *</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="one-way"
                checked={formData.tripType === "one-way"}
                onChange={(e) => handleInputChange("tripType", e.target.value as "one-way" | "two-way")}
                className="mr-2"
              />
              One-way
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="two-way"
                checked={formData.tripType === "two-way"}
                onChange={(e) => handleInputChange("tripType", e.target.value as "one-way" | "two-way")}
                className="mr-2"
              />
              Two-way
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Travel From *</label>
            <input
              type="text"
              value={formData.travelFrom}
              onChange={(e) => handleInputChange("travelFrom", e.target.value)}
              placeholder="e.g. Delhi, Mumbai"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.travelFrom && <p className="text-red-500 text-sm mt-1">{errors.travelFrom}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Travel To *</label>
            <input
              type="text"
              value={formData.travelTo}
              onChange={(e) => handleInputChange("travelTo", e.target.value)}
              placeholder="e.g. Delhi, Mumbai"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.travelTo && <p className="text-red-500 text-sm mt-1">{errors.travelTo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Airline Preference</label>
            <input
              type="text"
              value={formData.airlinePreference}
              onChange={(e) => handleInputChange("airlinePreference", e.target.value)}
              placeholder="e.g. Air India, Indigo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Departure Date *</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleInputChange("departureDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
          </div>

          {formData.tripType === "two-way" && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Return Date *</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange("returnDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
              />
              {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Departure Time</label>
            <input
              type="time"
              value={formData.preferredDepartureTime}
              onChange={(e) => handleInputChange("preferredDepartureTime", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          {formData.tripType === "two-way" && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Preferred Return Time</label>
              <input
                type="time"
                value={formData.preferredReturnTime}
                onChange={(e) => handleInputChange("preferredReturnTime", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Meals *</label>
            <select
              value={formData.meals}
              onChange={(e) => handleInputChange("meals", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            >
              <option value="">Select meal preference</option>
              <option value="No Meals">No Meals</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Jain">Jain</option>
              <option value="No Preference">No Preference</option>
            </select>
            {errors.meals && <p className="text-red-500 text-sm mt-1">{errors.meals}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Baggage Allowance (kg)</label>
            <input
              type="number"
              value={formData.baggageAllowance || ""}
              onChange={(e) => handleInputChange("baggageAllowance", Number.parseFloat(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Flight Budget Limit (₹) *</label>
            <input
              type="number"
              value={formData.flightBudget || ""}
              onChange={(e) => handleInputChange("flightBudget", Number.parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.flightBudget && <p className="text-red-500 text-sm mt-1">{errors.flightBudget}</p>}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
