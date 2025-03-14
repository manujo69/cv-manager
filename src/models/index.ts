export interface User {
  id: number
  name: string
  email: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  country: string
  city: string
  postalCode: string
  about: string
  profilePicture: File | null
  profilePictureUrl?: string
}

export interface Experience {
  id: number
  title: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
}

export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
}

export interface Job {
  id: number
  company: string
  position: string
  location: string
  url: string
  dateApplied: string
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  notes: string
}

export const NEW_ELEMENT = -1
export const DONT_SHOW = -2
