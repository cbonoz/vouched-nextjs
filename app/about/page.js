"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"

const SECTIONS = [
  "Vouched is a place to get and send personal endorsements from your network.",
  "Vouched is a place to find jobs and opportunities through verified connections.",
  "Vouched is a place to connect with people you know.",
  "Vouched is a place to find people you want to know.",
]

export default function About() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  const router = useRouter()
  return (
    <div className="about-page">
      <div className="text-2xl">Vouched</div>

      {SECTIONS.map((section, i) => {
        return <p key={i}>{section}</p>
      })}

      <p>
        You can find the code on GitHub&nbsp;
        <Link
          style={{ color: "blue" }}
          href="https://github.com/cbonoz/vouched-nextjs"
          target="_blank"
        >
          here
        </Link>
        .
      </p>

      <div className="my-4">
        {/* Create profile */}
        <Button
          className={buttonVariants({ variant: "default" })}
          onClick={() => {
            router.push("/vouch")
          }}
        >
          Vouch for a connection
        </Button>
      </div>
    </div>
  )
}
