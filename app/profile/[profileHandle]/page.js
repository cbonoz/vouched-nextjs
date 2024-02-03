"use client"

import React, { useEffect, useState } from "react"

import { getNameFromUser } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { DEMO_PROFILE, createDemoProfile } from "@/app/constants/placeholder"

import useAuthAxios from "../../../hooks/useAuthAxios"

export default function ProfilePage({ params }) {
  const { profileHandle } = params
  const [profile, setProfile] = useState({})
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
  const userName = `${user.firstName} ${user.lastName} ${isYou ? "(you)" : ""}`

  return (
    <div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="col-span-1">
          <div>{getNameFromUser(user)}</div>
          <div>{userName}</div>
          <div>{user.handle}</div>
          <div>{user.bio}</div>
          <div>{user.location}</div>
          <div>{user.industry}</div>
          <div>{user.interests}</div>
        </div>
        <div className="col-span-3">Hey</div>
      </div>
    </div>
  )
}
