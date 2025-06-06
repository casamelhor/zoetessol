"use client"

import type React from "react"

import { useState } from "react"
import type { TrainBooking } from "../booking-wizard"

interface TrainDetailsStepProps {
  data?: TrainBooking
  onNext: (data: TrainBooking) => void
  onBack: () => void
}

export function TrainDetailsStep({ data, onNext, onBack }: TrainDetailsStepProps) {
  const [formData, setFormData] = useState<TrainBooking>({
    fromStation: data?.fromStation || "",
    toStation: data?.toStation || "",
    travelDate: data?.travelDate || "",
    journeyClass: data?.journeyClass || "",
    preferredDepartureTime: data?.preferredDepartureTime || "",
    preferredArrivalTime: data?.preferredArrivalTime || "",
    trainNumber: data?.trainNumber || "",
    seatPreference: data?.seatPreference || "",
    budgetLimit: data?.budgetLimit || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fromStation.trim()) newErrors.fromStation = "From station is required"
    if (!formData.toStation.trim()) newErrors.toStation = "To station is required"
    if (!formData.travelDate) newErrors.travelDate = "Travel date is required"
    if (!formData.journeyClass) newErrors.journeyClass = "Journey class is required"
    if (!formData.budgetLimit || formData.budgetLimit <= 0) newErrors.budgetLimit = "Budget limit is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  const handleInputChange = (field: keyof TrainBooking, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Step 2 of 4: Train Booking Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">From Station *</label>
            <input
              type="text"
              value={formData.fromStation}
              onChange={(e) => handleInputChange("fromStation", e.target.value)}
              placeholder="e.g. Mumbai CSMT"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.fromStation && <p className="text-red-500 text-sm mt-1">{errors.fromStation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">To Station *</label>
            <input
              type="text"
              value={formData.toStation}
              onChange={(e) => handleInputChange("toStation", e.target.value)}
              placeholder="e.g. New Delhi NDLS"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.toStation && <p className="text-red-500 text-sm mt-1">{errors.toStation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Travel Date *</label>
            <input
              type="date"
              value={formData.travelDate}
              onChange={(e) => handleInputChange("travelDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Journey Class *</label>
            <select
              value={formData.journeyClass}
              onChange={(e) => handleInputChange("journeyClass", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            >
              <option value="">Select journey class</option>
              <option value="Sleeper">Sleeper</option>
              <option value="3rd Class (3AC)">3rd Class (3AC)</option>
              <option value="2nd Class (2AC)">2nd Class (2AC)</option>
              <option value="1st Class (1AC)">1st Class (1AC)</option>
            </select>
            {errors.journeyClass && <p className="text-red-500 text-sm mt-1">{errors.journeyClass}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Departure Time</label>
            <input
              type="time"
              value={formData.preferredDepartureTime}
              onChange={(e) => handleInputChange("preferredDepartureTime", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Arrival Time</label>
            <input
              type="time"
              value={formData.preferredArrivalTime}
              onChange={(e) => handleInputChange("preferredArrivalTime", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Train Number / Name</label>
            <input
              type="text"
              value={formData.trainNumber}
              onChange={(e) => handleInputChange("trainNumber", e.target.value)}
              placeholder="e.g. 12951 Mumbai Rajdhani"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Seat Preference</label>
            <select
              value={formData.seatPreference}
              onChange={(e) => handleInputChange("seatPreference", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            >
              <option value="">No preference</option>
              <option value="Lower Berth">Lower Berth</option>
              <option value="Upper Berth">Upper Berth</option>
              <option value="Side Lower">Side Lower</option>
              <option value="Side Upper">Side Upper</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Budget Limit (₹) *</label>
            <input
              type="number"
              value={formData.budgetLimit || ""}
              onChange={(e) => handleInputChange("budgetLimit", Number.parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.budgetLimit && <p className="text-red-500 text-sm mt-1">{errors.budgetLimit}</p>}
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
