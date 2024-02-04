import Image from "next/image"

import { Endorsement } from "@/lib/types"
import { cn, formatDate } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"

const STRIPE_BG =
  "pattern-diagonal-lines pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20"

const EndorsementRow = ({
  endorsement,
  currentUserId,
}: {
  endorsement: Endorsement
  currentUserId: number
}) => {
  const isOwner = true // currentUserId === endorsement.endorserId
  const isApproved = !!endorsement.approvedAt

  return (
    <div
      className={cn(
        "p-4 rounded-lg border border-gray-200 shadow-md mb-4",
        isApproved && STRIPE_BG
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* Avatar or placeholder for user */}
          <Image
            width={200}
            height={200}
            className="w-10 h-10 rounded-full"
            src={endorsement.avatar || "https://i.pravatar.cc/40"}
            alt={endorsement.handle || "User avatar"}
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{endorsement.handle}</div>
          <div className="text-gray-500">{endorsement.name}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{endorsement.message}</p>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {formatDate(endorsement.createdAt, false)}
      </div>

      {!isApproved && isOwner && (
        <div>
          <Separator />
          <div className="py-1">Endorsement is pending your approval</div>
          <Button className="">Approve</Button>&nbsp;
          <Button className={buttonVariants({ variant: "destructive" })}>
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}

export default EndorsementRow
