import { useState } from 'react'
import { View } from 'react-native'
import { MentorHeader } from './mentor-header'
import { StepCalendar } from './step-calendar'
import { StepConfirm } from './step-confirm'
import { StepService } from './step-service'
import { StepTime } from './step-time'

type Step = 'service' | 'calendar' | 'time' | 'confirm'

const stepNumber: Record<Step, number> = {
  service: 1,
  calendar: 2,
  time: 3,
  confirm: 4,
}

interface BookingFlowProps {
  onClose: () => void
  initialStep?: Step
  initialServiceId?: string | null
  onRescheduleSuccess?: () => void
  onSuccessComplete?: () => void
}

export function BookingFlow({
  onClose,
  initialStep = 'service',
  initialServiceId = null,
  onRescheduleSuccess,
  onSuccessComplete,
}: BookingFlowProps) {
  const [step, setStep] = useState<Step>(initialStep)
  const [serviceId, setServiceId] = useState<string | null>(initialServiceId)
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const isRescheduling = !!onRescheduleSuccess
  const currentStepNum = isRescheduling
    ? (
        { service: 1, calendar: 1, time: 2, confirm: 3 } as Record<Step, number>
      )[step]
    : stepNumber[step]

  const handleServiceSelect = (id: string) => {
    setServiceId(id)
    setTimeout(() => setStep('calendar'), 200)
  }

  const handleDateSelect = (d: string) => {
    setDate(d)
    setTimeout(() => setStep('time'), 200)
  }

  const handleTimeSelect = (t: string) => {
    setTime(t)
    setTimeout(() => setStep('confirm'), 200)
  }

  return (
    <View className="flex-1 bg-[#F3F4F6] dark:bg-[#0F101A]">
      {!isConfirmed && (
        <MentorHeader
          step={currentStepNum}
          isRescheduling={isRescheduling}
          onClose={onClose}
          onBack={
            step === 'calendar' && !isRescheduling
              ? () => setStep('service')
              : step === 'time'
                ? () => setStep('calendar')
                : step === 'confirm'
                  ? () => setStep('time')
                  : undefined
          }
        />
      )}

      <View className="mt-2 flex-1">
        {step === 'service' && (
          <StepService selected={serviceId} onSelect={handleServiceSelect} />
        )}
        {step === 'calendar' && (
          <StepCalendar selected={date} onSelect={handleDateSelect} />
        )}
        {step === 'time' && date && (
          <StepTime date={date} selected={time} onSelect={handleTimeSelect} />
        )}
        {step === 'confirm' && serviceId && date && time && (
          <StepConfirm
            serviceId={serviceId}
            date={date}
            time={time}
            isRescheduling={isRescheduling}
            onCompleted={() => {
              if (onRescheduleSuccess) {
                onRescheduleSuccess()
              } else if (onSuccessComplete) {
                onSuccessComplete()
              } else {
                onClose()
              }
            }}
            onConfirmSuccess={() => setIsConfirmed(true)}
            onClose={onClose}
          />
        )}
      </View>
    </View>
  )
}
