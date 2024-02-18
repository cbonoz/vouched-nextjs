"use client"

import React, { useEffect, useState } from "react"

import { getNameFromUser, isEmpty } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Endorsement from "@/components/core/EndorsementRow"
import EndorsementRow from "@/components/core/EndorsementRow"
import RenderObject from "@/components/core/RenderObject"
import Vouch from "@/components/core/Vouch"
import { createDemoProfile } from "@/app/constants/placeholder"

import useAuthAxios from "../../../hooks/useAuthAxios"

interface Props {
  params: {
    profileHandle: string
  }
}

export default function ProfilePage({ params }: Props) {
  const { profileHandle } = params
  const [profile, setProfile] = useState<any>({})
  const [locked, setLocked] = useState(true)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState("received")
  const [error, setError] = useState()
  const { getProfile } = useAuthAxios()

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true)
      try {
        const data = await getProfile(profileHandle, type)
        setProfile(data)
      } catch (err) {
        console.error("error getting proflile, using default", err)
        // setError(err.message)
        setProfile(createDemoProfile(profileHandle))
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileHandle])

  if (error) {
    return <div>{error}</div>
  }

  if (loading || !profile) {
    return (
      <div>
        <div className="my-2">Loading Vouched profile...</div>
        <div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { user, endorsements, endorsementCount } = profile

  if (!user) {
    return <div>Profile not found</div>
  }

  const fullName = getNameFromUser(user)
  const hasEndorsements = !isEmpty(endorsements)

  return (
    <div>
      <div className="flex flex-row gap-8">
        <Avatar className="w-[256px] h-[156]">
          <AvatarImage className="h-max w-max" src={user.imageUrl || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row gap-8">
        <div className="basis-1/4">
          <div className="text-2xl my-4">{getNameFromUser(user)}</div>
          <div>{user.handle}</div>
          <div className="my-4">{user.bio}</div>
        </div>
        <div className="basis-3/4">
          <div className="my-4 text-2xl font-bold">
            {fullName}&#39;s Vouches ({endorsementCount})
          </div>
          {!loading && !hasEndorsements && (
            <div className="my-4">
              <div className="text-2xl font-bold">
                {user.firstName} has not added any endorsements yet
              </div>
            </div>
          )}
          {hasEndorsements &&
            !loading &&
            endorsements.map((endorsement: any) => {
              return (
                <span key={endorsement.id}>
                  <EndorsementRow endorsement={endorsement} />
                </span>

                // <RenderObject
                //   obj={endorsement}
                //   keys={[
                //     "firstName",
                //     "lastName",
                //     "message",
                //     "relationship",
                //     "createdAt",
                //   ]}
                // />
              )
            })}
        </div>
      </div>
    </div>
  )
}
