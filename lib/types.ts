export interface EndorsementDto {
  firstName: string
  lastName: string
  message: string
  relationship: string
}

export interface Endorsement {
  id: string
  firstName: string
  lastName: string
  message: string
  relationship: string
  createdAt: string
  addedAt?: string
  updatedAt: string
}

export interface AccessRequestDto {
  email: string
  message: string
}

export interface AccessRequest {
  id: string
  email: string
  message: string
  createdAt: string
  updatedAt: string
}
