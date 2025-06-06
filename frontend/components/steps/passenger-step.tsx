"use client"

import type React from "react"
import { v4 as uuidv4 } from "uuid"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { Passenger } from "../booking-wizard"

interface PassengerStepProps {
  passengers: Passenger[]
  onNext: (passengers: Passenger[]) => void
  onBack: () => void
}

export function PassengerStep({ passengers, onNext, onBack }: PassengerStepProps) {
  const [passengerList, setPassengerList] = useState<Passenger[]>(
    passengers.length > 0
      ? passengers
      : [
          {
            id: uuidv4(),
            fullName: "",
            contactNumber: "",
            email: "",
            dateOfBirth: "",
            gender: "male",
            employeeId: "",
            employeeGrade: "",
            department: "",
          },
        ],
  )

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({})

  const validateForm = () => {
    const newErrors: Record<string, Record<string, string>> = {}

    passengerList.forEach((passenger, index) => {
      const passengerErrors: Record<string, string> = {}

      if (!passenger.fullName.trim()) passengerErrors.fullName = "Full name is required"
      if (!passenger.contactNumber.match(/^\d{10}$/))
        passengerErrors.contactNumber = "Contact number must be exactly 10 digits"
      if (!passenger.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) passengerErrors.email = "Invalid email address"
      if (!passenger.dateOfBirth) passengerErrors.dateOfBirth = "Date of birth is required"
      if (!passenger.employeeGrade) passengerErrors.employeeGrade = "Employee grade is required"
      if (!passenger.department) passengerErrors.department = "Department is required"

      if (Object.keys(passengerErrors).length > 0) {
        newErrors[passenger.id] = passengerErrors
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(passengerList)
    }
  }

  const addPassenger = () => {
    setPassengerList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        fullName: "",
        contactNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "male",
        employeeId: "",
        employeeGrade: "",
        department: "",
      },
    ])
  }

  const removePassenger = (id: string) => {
    setPassengerList((prev) => prev.filter((p) => p.id !== id))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[id]
      return newErrors
    })
  }

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengerList((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))

    if (errors[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: "" },
      }))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Step 3 of 4: Passenger Details</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {passengerList.map((passenger, index) => (
          <div key={passenger.id} className="border border-gray-200 rounded-lg p-6 bg-bg-light">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary">Passenger {index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePassenger(passenger.id)}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Full Name (as per ID) *</label>
                <input
                  type="text"
                  value={passenger.fullName}
                  onChange={(e) => updatePassenger(passenger.id, "fullName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                />
                {errors[passenger.id]?.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={passenger.contactNumber}
                  onChange={(e) => updatePassenger(passenger.id, "contactNumber", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                />
                {errors[passenger.id]?.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].contactNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Email ID *</label>
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(passenger.id, "email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                />
                {errors[passenger.id]?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(passenger.id, "dateOfBirth", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                />
                {errors[passenger.id]?.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Gender *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={passenger.gender === "male"}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "gender", e.target.value as "male" | "female" | "other")
                      }
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={passenger.gender === "female"}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "gender", e.target.value as "male" | "female" | "other")
                      }
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="other"
                      checked={passenger.gender === "other"}
                      onChange={(e) =>
                        updatePassenger(passenger.id, "gender", e.target.value as "male" | "female" | "other")
                      }
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Employee ID</label>
                <input
                  type="text"
                  value={passenger.employeeId}
                  onChange={(e) => updatePassenger(passenger.id, "employeeId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Employee Grade *</label>
                <select
                  value={passenger.employeeGrade}
                  onChange={(e) => updatePassenger(passenger.id, "employeeGrade", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                >
                  <option value="">Select grade</option>
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                </select>
                {errors[passenger.id]?.employeeGrade && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].employeeGrade}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Department *</label>
                <select
                  value={passenger.department}
                  onChange={(e) => updatePassenger(passenger.id, "department", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-bright focus:border-primary-bright bg-white"
                >
                  <option value="">Select department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="ETC">ETC</option>
                </select>
                {errors[passenger.id]?.department && (
                  <p className="text-red-500 text-sm mt-1">{errors[passenger.id].department}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPassenger}
          className="flex items-center text-primary-bright hover:text-primary-dark font-medium"
        >
          <Plus size={16} className="mr-1" />
          Add Another Passenger
        </button>

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
