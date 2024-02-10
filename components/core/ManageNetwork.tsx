"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SignIn, UserNetwork, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@radix-ui/react-separator"

import { axiosInstance } from "@/lib/api"
import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import BasicCard from "./BasicCard"
import Vouch from "./Vouch"

const ManageNetwork = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [endorsements, setEndorsements] = useState<any>([])
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()
  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    async function getUserData() {
      setLoading(true)
      try {
        const response = await authAxios.get(`/user`)
        const userData = response.data
        setData({
          ...userData,
          user,
        })
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [user, isLoaded])

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          <Vouch onSubmit={(data: any) => console.log("submit", data)} />
        </div>

        <div>
          {isEmpty(endorsements) && (
            <div className="my-4">
              <h1 className="text-2xl font-bold">No added endorsements yet</h1>
              <p className="text-gray-500">
                You can add endorsements for folks from your network to build
                your Vouched profile page.
              </p>
            </div>
          )}
          <div className="my-4">
            These profiles will be visible on your Vouch page if a user has
            unlocked access. Make your profile public from the User settings
            tab.
          </div>
          {endorsements.map((endorsement: any) => {
            return (
              <BasicCard title="Endorsement" className="min-w-max p-4">
                {JSON.stringify(endorsement)}
              </BasicCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ManageNetwork
