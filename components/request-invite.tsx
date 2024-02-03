"use client"

import { useState } from "react"

import { axiosInstance } from "@/lib/api"
import { humanError } from "@/lib/utils"

import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"

const RequestInvite = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function requestInvite() {
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
        duration: 1500,
      })
      return
    }

    try {
      setLoading(true)
      const { data } = await axiosInstance.post("/user/request-invite", {
        name: name,
        email,
      })
      toast({
        title: "Success",
        description: "Your request has been sent",
        duration: 1500,
      })
    } catch (error: any) {
      toast({
        title: "Error requesting invite",
        description: humanError(error),
        variant: "destructive",
        duration: 1500,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* <h1>Request Invite</h1> */}

      <Input
        className="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />

      <Input
        className="mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <Button
        onClick={requestInvite}
        className={buttonVariants({ variant: "default" })}
      >
        Request invite
      </Button>
    </div>
  )
}

export default RequestInvite
