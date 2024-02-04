"use client"

import { useEffect, useState } from "react"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import BasicCard from "./BasicCard"

const ManageProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (isLoaded && user) {
      setData({
        ...user,
        handle: user.unsafeMetadata.handle,
        email: user.emailAddresses[0].emailAddress,
      })
    }
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

    setLoading(true)
    validateData()

    try {
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
    <div>
      <BasicCard title="Manage account">
        <div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="Input"
            />
          </div>
          {/* last name */}

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="Input"
            />
          </div>

          {/* handle */}
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="Input"
            />
          </div>
        </div>
        <div>
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </BasicCard>
    </div>
  )
}
export default ManageProfile
