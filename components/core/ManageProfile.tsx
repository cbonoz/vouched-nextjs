"use client"

import { useEffect, useState } from "react"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Label } from "@radix-ui/react-label"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Checkbox } from "../ui/checkbox"

const ManageProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (isLoaded && user) {
      setData({
        ...user,
        username: user.unsafeMetadata.handle,
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

    if (isEmpty(data.username)) {
      setError("Username is required")
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
        // imageUrl: data.imageUrl,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          handle: data.username,
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
      <div className="text-xl">Manage account</div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
export default ManageProfile
