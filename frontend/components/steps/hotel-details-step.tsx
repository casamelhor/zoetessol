"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { HotelBooking } from "../booking-wizard"

interface HotelDetailsStepProps {
  data?: HotelBooking
  onNext: (data: HotelBooking) => void
  onBack: () => void
}

export function HotelDetailsStep({ data, onNext, onBack }: HotelDetailsStepProps) {
  const [formData, setFormData] = useState<HotelBooking>({
    location: data?.location || "",
    locality: data?.locality || "",
    hotelName: data?.hotelName || "",
    roomType: data?.roomType || "",
    checkInDate: data?.checkInDate || "",
    checkOutDate: data?.checkOutDate || "",
    totalNights: data?.totalNights || 0,
    mealPlan: data?.mealPlan || "",
    expectedRate: data?.expectedRate || undefined,
    totalBudget: data?.totalBudget || 0,
    specialInstructions: data?.specialInstructions || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate total nights automatically
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate)
      const checkOut = new Date(formData.checkOutDate)
      const diffTime = checkOut.getTime() - checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 0) {
        setFormData((prev) => ({ ...prev, totalNights: diffDays }))
      }
    }
  }, [formData.checkInDate, formData.checkOutDate])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.roomType) newErrors.roomType = "Room type is required"
    if (!formData.checkInDate) newErrors.checkInDate = "Check-in date is required"
    if (!formData.checkOutDate) newErrors.checkOutDate = "Check-out date is required"
    if (!formData.mealPlan) newErrors.mealPlan = "Meal plan is required"
    if (!formData.totalBudget || formData.totalBudget <= 0) newErrors.totalBudget = "Total budget is required"

    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate)
      const checkOut = new Date(formData.checkOutDate)
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = "Check-out date must be after check-in date"
      }
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

  const handleInputChange = (field: keyof HotelBooking, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Step 2 of 4: Hotel Booking Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Location (City/Destination) *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g. Goa, Manali, Jaipur"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Locality / Area</label>
            <input
              type="text"
              value={formData.locality}
              onChange={(e) => handleInputChange("locality", e.target.value)}
              placeholder="e.g. Baga Beach (Goa)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Hotel Name</label>
            <input
              type="text"
              value={formData.hotelName}
              onChange={(e) => handleInputChange("hotelName", e.target.value)}
              placeholder="e.g. Taj Exotica"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Room Type *</label>
            <select
              value={formData.roomType}
              onChange={(e) => handleInputChange("roomType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            >
              <option value="">Select room type</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Suite">Suite</option>
              <option value="Family Room">Family Room</option>
              <option value="Double Occupancy">Double Occupancy</option>
            </select>
            {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Check-In Date *</label>
            <input
              type="date"
              value={formData.checkInDate}
              onChange={(e) => handleInputChange("checkInDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Check-Out Date *</label>
            <input
              type="date"
              value={formData.checkOutDate}
              onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Total Number of Nights</label>
            <input
              value={formData.totalNights || ""}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Meal Plan *</label>
            <select
              value={formData.mealPlan}
              onChange={(e) => handleInputChange("mealPlan", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            >
              <option value="">Select meal plan</option>
              <option value="EP (Room Only)">EP (Room Only)</option>
              <option value="CP (Breakfast Only)">CP (Breakfast Only)</option>
              <option value="MAP (Breakfast & Dinner)">MAP (Breakfast & Dinner)</option>
              <option value="AP (All Meals)">AP (All Meals)</option>
            </select>
            {errors.mealPlan && <p className="text-red-500 text-sm mt-1">{errors.mealPlan}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Expected Rate per Night (₹)</label>
            <input
              type="number"
              value={formData.expectedRate || ""}
              onChange={(e) => handleInputChange("expectedRate", Number.parseFloat(e.target.value) || undefined)}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Total Budget Limit (₹) *</label>
            <input
              type="number"
              value={formData.totalBudget || ""}
              onChange={(e) => handleInputChange("totalBudget", Number.parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
            />
            {errors.totalBudget && <p className="text-red-500 text-sm mt-1">{errors.totalBudget}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Special Instructions / Requirements</label>
          <textarea
            value={formData.specialInstructions}
            onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
            rows={3}
            placeholder="e.g. early check-in, need parking"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-bg-light"
          />
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
