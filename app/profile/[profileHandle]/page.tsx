"use client"

import React, { useEffect, useState } from "react"

import { getNameFromUser, isEmpty } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Endorsement from "@/components/core/Endorsement"
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
        Loading...
        <div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { user, endorsements } = profile

  if (!user) {
    return <div>Profile not found</div>
  }

  const isYou = user.firstName.indexOf("John") !== -1 // TODO:
  const userName = `${user.firstName} ${user.lastName}${isYou ? " (you)" : ""}`

  return (
    <div>
      <div className="flex flex-row gap-8">
        <div className="basis-1/4">
          <Avatar className="h-full w-full px-4">
            <AvatarImage
              className="h-max w-max"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-2xl">{getNameFromUser(user)}</div>
          <div>{user.handle}</div>
          <div>{user.bio}</div>
          <div>{user.location}</div>
          <div>{user.industry}</div>
          <div>{user.interests}</div>
        </div>
        <div className="basis-3/4 my-4">
          <Tabs defaultValue="endorsements" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
              <TabsTrigger value="vouch">Vouch for {userName}</TabsTrigger>
            </TabsList>
            <TabsContent value="endorsements">
              <div>
                <div className="my-4 text-2xl font-bold">
                  {userName}&#39;s vouches
                </div>
                {!isEmpty(endorsements) &&
                  endorsements.map((endorsement: any) => {
                    return <Endorsement endorsement={endorsement} />
                  })}
              </div>
            </TabsContent>
            <TabsContent value="vouch">{/* <InviteUser /> */}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
