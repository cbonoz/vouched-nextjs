"use client"

import React, { useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import BasicCard from "./BasicCard"

interface Props {
  targetUser: any
}

const Vouch = ({ targetUser }: Props) => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [relationship, setRelationship] = useState("")

  return (
    <div>
      <BasicCard title={`Vouch for ${targetUser.firstName}`}>
        <Label className="mb-4">Message</Label>
        <Textarea
          className="my-4 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter endorsement message (ex: I've worked with this person for 5 years and they are great!)"
        />

        <Label className="mb-4">Relationship</Label>
        <Input
          className="my-4 w-full"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Enter relationship (ex: coworker, friend, etc)"
        />

        <Button
          onClick={() => {
            // send vouch
          }}
        >
          Send Vouch
        </Button>
      </BasicCard>
    </div>
  )
}

export default Vouch
