interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const steps = ["Booking Type", "Details", "Passengers", "Summary", "Confirmation"]

  return (
    <div className="flex items-center justify-center space-x-6 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : isCompleted
                      ? "bg-primary-bright text-white"
                      : "bg-primary/10 text-gray-400"
                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive ? "text-primary" : isCompleted ? "text-primary-bright" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {stepNumber < totalSteps && (
              <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-primary-bright" : "bg-gray-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
