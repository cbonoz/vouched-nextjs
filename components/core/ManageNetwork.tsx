"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SignIn, UserNetwork, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"

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
import Vouch from './Vouch'

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
      <h1>Add new Endorsement</h1>
      <Vouch targetUser={user} />
    </div>
  )
}
export default ManageNetwork
