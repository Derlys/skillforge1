import { useSyncExternalStore } from 'react'

export interface Booking {
  id: string
  mentorName: string
  mentorInitials: string
  topic: string
  date: string
  time: string
  platform: string
  status: string
  price?: string
  link?: string
}

let bookings: Booking[] = [
  {
    id: 'b1',
    mentorName: 'Elena Vasquez',
    mentorInitials: 'EV',
    topic: '1:1 Mentorship - Solana Core',
    date: 'Tomorrow, Mar 15',
    time: '10:00 AM - 11:00 AM',
    platform: 'Google Meet',
    status: 'upcoming',
    price: '$50.00',
    link: 'meet.google.com/abc-xyz-def',
  },
  {
    id: 'b2',
    mentorName: 'David Lee',
    mentorInitials: 'DL',
    topic: 'React Native Architecture',
    date: 'Feb 10, 2026',
    time: '2:00 PM - 3:00 PM',
    platform: 'Zoom',
    status: 'completed',
    price: '$45.00',
  },
  {
    id: 'b3',
    mentorName: 'Elena Vasquez',
    mentorInitials: 'EV',
    topic: 'Rust Foundations',
    date: 'Jan 05, 2026',
    time: '4:00 PM - 5:00 PM',
    platform: 'Google Meet',
    status: 'completed',
    price: '$50.00',
  },
]

let listeners: Array<() => void> = []

function emit() {
  for (const listener of listeners) {
    listener()
  }
}

export const bookingStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return bookings
  },
  cancelBooking(id: string) {
    bookings = bookings.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' } : b,
    )
    emit()
  },
  rescheduleBooking(id: string) {
    bookings = bookings.map((b) =>
      b.id === id
        ? { ...b, date: 'Nuev. Fecha Acordada', time: 'Nueva Hora' }
        : b,
    )
    emit()
  },
}

export function useBookings() {
  return useSyncExternalStore(bookingStore.subscribe, bookingStore.getSnapshot)
}
