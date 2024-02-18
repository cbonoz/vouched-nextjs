import { Endorsement } from "@/lib/types"
import { formatDate } from "@/lib/utils"

import BasicCard from "./BasicCard"

const EndorsementRow = ({ endorsement }: { endorsement: Endorsement }) => {
  const fullName = `${endorsement.firstName} ${endorsement.lastName}`
  return (
    <BasicCard title={fullName} className="p-4">
      <div>
        <div>
          <div className="py-2">{endorsement.message}</div>
          <div>Relationship: {endorsement.relationship}</div>
          <div>Endorsed on: {formatDate(endorsement.createdAt, true)}</div>
        </div>
      </div>
    </BasicCard>
  )
}
export default EndorsementRow
