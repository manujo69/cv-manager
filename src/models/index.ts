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
  [key: string]: string | File | null | undefined
}

export interface PersonalInfoBoolean {
  firstName: boolean
  lastName: boolean
  email: boolean
  phone: boolean
  address: boolean
  country: boolean
  city: boolean
  postalCode: boolean
  about: boolean
  profilePicture: boolean
  profilePictureUrl: boolean
  [key: string]: boolean
}

export const DEFAULT_PERSONAL_INFO_BOOLEAN: PersonalInfoBoolean = {
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  country: true,
  city: true,
  postalCode: true,
  about: true,
  profilePicture: true,
  profilePictureUrl: true,
}

export interface Experience {
  id: number
  title: string
  company: string
  position: string
  startDate: Date | null
  endDate: Date | null
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

export type JobStatusType =
  | 'Solicitado'
  | 'Entrevista'
  | 'Oferta'
  | 'Rechazado'
  | 'Descartado'
  | 'Finalizado'

export interface Job {
  id: number
  company: string
  position: string
  location: string
  url: string
  dateApplied: Date | null
  status: JobStatusType
  notes: string
}

export interface CVdata {
  id: number
  name: string
  personalInfo: PersonalInfoBoolean
  experienceIDS: { id: number; selected: boolean }[]
  educationIDS: { id: number; selected: boolean }[]
  skills: { id: number; selected: boolean }[]
  languages: { id: number; selected: boolean }[]
  PDFsource: string
  PDFtarget?: string
  jobID: number
  IAprompt: string
}

export const NEW_ELEMENT = -1
export const DONT_SHOW = -2
