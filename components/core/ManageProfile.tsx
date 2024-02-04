"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"

import { axiosInstance } from "@/lib/api"
import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
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
import BasicCard from "./BasicCard"

const ManageProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    async function getUserData() {
      setLoading(true)
      try {
        const response = await axiosInstance.get(`/user`)
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

  function updateField(key: string, value: any) {
    setData({ ...data, [key]: value })
  }

  function validateData() {
    if (isEmpty(data.firstName)) {
      setError("First name is required")
      return false
    }

    if (isEmpty(data.lastName)) {
      setError("Last name is required")
      return false
    }

    if (isEmpty(data.handle)) {
      setError("handle is required")
      return false
    }
    setError(undefined)
    return true
  }

  async function save() {
    if (!user) {
      alert("Session invalid. Please sign in again.")
      return
    }

    if (!validateData()) {
      return
    }
    setLoading(true)

    try {
      await axiosInstance.put(`/user`, {
        firstName: data.firstName,
        lastName: data.lastName,
        handle: data.handle,
        active: data.active,
      })

      // TODO: update DB.
      await user.update({
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          handle: data.handle,
        },
      })
    } catch (e) {
      setError(humanError(e))
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BasicCard title="User settings" className="min-w-max p-4">
      <div className="py-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={data.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className="Input"
        />
      </div>
      {/* last name */}
      <div className="py-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          value={data.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="Input"
        />
      </div>
      <div className="py-2">
        <Label htmlFor="handle">
          <TooltipProvider>
            Enter Vouched page handle
            <Tooltip>
              <TooltipTrigger>
                <Icons.infoCircle />
              </TooltipTrigger>
              <TooltipContent className="flex-center">
                A handle defines your unique Vouched profile page url on the
                platform.
                <br /> While saved, other users cannot claim this handle.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          id="handle"
          value={data.handle}
          onChange={(e) => updateField("handle", e.target.value)}
          className="Input"
        />
      </div>

      <div className="my-4">
        Update your profile image by clicking the user icon in the top right of
        the page.
      </div>

      {/* handle */}

      <div className="my-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <Label className="text-xl font-bold">Activate account page</Label>
          <div>
            By activating your account page, you agree to our{" "}
            <Link className="underline" href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/terms">
              Privacy Policy
            </Link>
          </div>
        </div>

        <Switch
          className="mx-4"
          checked={data.active}
          onCheckedChange={data.active}
        />
      </div>
      <Button disabled={loading} type="submit" onClick={save}>
        Save
      </Button>

      {error && <div className="text-red-500">{error}</div>}

      {data.handle && data.active && (
        <div>
          <Link href={profileUrl(data.handle)}>
            <>View your profile</>
          </Link>
        </div>
      )}
    </BasicCard>
  )
}
export default ManageProfile
