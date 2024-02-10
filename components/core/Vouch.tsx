"use client"

import React, { useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import BasicCard from "./BasicCard"

interface Props {
  // targetUser: any
  onSubmit: any
}

const Vouch = ({ onSubmit }: Props) => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [relationship, setRelationship] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  return (
    <div>
      <BasicCard title={`Add a new endorsement`} className="min-w-max p-4">
        <Label className="mb-4">First name</Label>
        <Input
          className="my-4 w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name of individual (ex: John)"
        />

        <Label className="mb-4">Last name</Label>
        <Input
          className="my-4 w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name of individual (ex: Doe)"
        />

        <Label className="mb-4">Message</Label>
        <Textarea
          className="my-4 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter endorsement message (ex: I worked with John for 5 years at two different startups, and he's a great manager and leader of SaaS companies)"
        />

        <Label className="mb-4">Relationship</Label>
        <Input
          className="my-4 w-full"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Enter relationship (ex: coworker for five years, manager, etc)"
        />

        <Button
          onClick={() => {
            onSubmit()
          }}
        >
          Add Vouch
        </Button>
      </BasicCard>
    </div>
  )
}

export default Vouch
