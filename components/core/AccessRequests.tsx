"use client"

import { useEffect, useState } from "react"
import RenderResult from "next/dist/server/render-result"
import { SignIn, useUser } from "@clerk/nextjs"
import { Trash, TrashIcon } from "lucide-react"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEndorsements } from "@/app/context/endorsements"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import BasicCard from "./BasicCard"
import RenderObject from "./RenderObject"

const AccessRequests = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()

  const {
    loading,
    accessRequests,
    getAccessRequests,
    rejectRequest,
    acceptRequest,
  } = useEndorsements()

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    getAccessRequests()
  }, [user, isLoaded])

  const hasRequests = !isEmpty(accessRequests)

  if (loading && !hasRequests) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          {!hasRequests && !loading && (
            <div className="my-4">
              <h1 className="text-2xl font-bold">No access requests yet</h1>
              <p className="text-gray-500">
                {`You will see access requests here when someone requests access to
                your endorsements.`}
              </p>
            </div>
          )}
          {accessRequests.map((request: any) => {
            const actionRow = (
              // align to fill row
              <div className="flex justify-between">
                <span>Endorsement</span>
                <span>
                  <Button
                    onClick={() => acceptRequest(request.id)}
                    className="text-green-500"
                  >
                    Accept request
                  </Button>
                </span>
                <span>
                  <button
                    onClick={() => rejectRequest(request.id)}
                    className="text-red-500"
                  >
                    <TrashIcon size={24} />
                  </button>
                </span>
              </div>
            )

            return (
              <BasicCard title={actionRow} className="p-4">
                <RenderObject
                  obj={endorsement}
                  keys={[
                    "firstName",
                    "lastName",
                    "message",
                    "relationship",
                    "createdAt",
                  ]}
                />
              </BasicCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AccessRequests
