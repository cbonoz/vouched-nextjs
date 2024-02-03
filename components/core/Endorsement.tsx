import { Endorsement } from '@/lib/types'
import { formatDate } from '@/lib/utils'

const Endorsement = ({ endorsement }: { endorsement: Endorsement }) => {
  return (
    <div key={endorsement.id}>
      <div>{endorsement.handle}</div>
      <div>{endorsement.name}</div>
      <div>{endorsement.message}</div>
      <div>{formatDate(endorsement.createdAt, false)}</div>
    </div>
  )
}

export default Endorsement
