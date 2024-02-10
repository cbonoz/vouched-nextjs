"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"

import { axiosInstance } from "@/lib/api"
import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import BasicCard from "./BasicCard"
import BasicTooltip from "./BasicTooltip"

const ManageProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
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
      await axiosInstance.patch(`/user/info`, {
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

  const handlePlaceholder =
    data.firstName && data.lastName
      ? (data.firstName + "-" + data.lastName).toLowerCase()
      : "john-doe"

  return (
    <BasicCard title="User settings" className="min-w-max p-4">
      <div className="py-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={data.firstName}
          placeholder="Your first name"
          onChange={(e) => updateField("firstName", e.target.value)}
          className="Input"
        />
      </div>
      {/* last name */}
      <div className="py-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          placeholder="Your last name"
          value={data.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="Input"
        />
      </div>

      <div className="py-2">
        <Label htmlFor="title">
          Enter title
          <BasicTooltip text="A title for your professional background and your expertise. This displays at the top of your profile">
            <Icons.infoCircle />
          </BasicTooltip>
        </Label>
        <Input
          id="title"
          placeholder='Ex: "Software sales leader" or "Product Manager with over 10 years of experience"'
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="Input"
        />
      </div>

      <div className="py-2">
        <Label htmlFor="bio">
          Enter bio
          <BasicTooltip text="A short bio about yourself. This bio will be displayed on your public profile page">
            <Icons.infoCircle />
          </BasicTooltip>
        </Label>
        <Textarea
          id="bio"
          rows={5}
          placeholder='Ex: "I am a software engineer with a passion for building scalable web applications."'
          value={data.bio}
          onChange={(e) => updateField("bio", e.target.value)}
          className="Input"
        />
      </div>

      <div className="py-2">
        <Label htmlFor="bio">
          Enter agreement text
          <BasicTooltip text="When visitors view your profile, they will be asked to agree to this text in order to view your Vouch network.">
            <Icons.infoCircle />
          </BasicTooltip>
        </Label>
        <Textarea
          id="agreement"
          rows={5}
          value={data.agreement}
          placeholder='Ex: "By using my Vouch network, you agree to pay 10% of any successful hire first year salary ."'
          onChange={(e) => updateField("agreement", e.target.value)}
          className="Input"
        />
      </div>
      <div className="py-2">
        <Label htmlFor="handle">
          Enter Vouched page handle
          <BasicTooltip text="A handle defines your unique Vouched profile page url on the platform. While saved, other users cannot claim this handle.">
            <Icons.infoCircle />
          </BasicTooltip>
        </Label>
        <Input
          id="handle"
          value={data.handle}
          placeholder={`ex: ${handlePlaceholder}`}
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
