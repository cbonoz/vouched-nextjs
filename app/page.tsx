"use client"

import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import RequestInvite from "@/components/core/RequestInvite"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {siteConfig.description}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.slogan}
        </p>
      </div>
      <div className="flex gap-4">
        {siteConfig.checklistItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <RequestInvite />
        {/* <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link> */}
      </div>

      <div className="flex max-w-[980px] flex-col  gap-2">
        {/* <Image src="/static/hero.png" width={980} height={500} alt="hero" /> */}
      </div>
      <Toaster />
    </section>
  )
}
