export interface Endorsement {
  id?: number
  handle?: string
  avatar?: string
  name?: string
  message: string
  relationship: string
  endorserId: number
  approvedAt: Date | undefined
  createdAt: Date
}
