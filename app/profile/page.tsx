"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Separator } from "@radix-ui/react-menubar"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import About from "@/components/core/About"
import InviteUser from "@/components/core/InviteUser"
import ManageNetwork from "@/components/core/ManageNetwork"
import ManageProfile from "@/components/core/ManageProfile"

const ProfileSettings = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return
  }

  if (!isSignedIn) {
    // push to sign in
    router.push("/sign-in")
    return
  }

  return (
    <div>
      <div className="my-4 text-2xl">Main dashboard</div>
      <div className="my-4">
        From this page you can manage your account settings and invite new
        users.{" "}
        {user?.handle && (
          <a rel="noreferrer" target="_blank" href={profileUrl(user.handle)}>
            View your profile.
          </a>
        )}
      </div>
      <Tabs defaultValue="network" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="network">Manage your Network</TabsTrigger>
          <TabsTrigger value="manage">User settings</TabsTrigger>
          <TabsTrigger value="invite">Invite user to Vouched</TabsTrigger>
          <TabsTrigger value="howitworks">How Vouched works</TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <ManageProfile />
        </TabsContent>
        <TabsContent value="network">
          <ManageNetwork />
        </TabsContent>
        <TabsContent value="invite">
          <InviteUser />
        </TabsContent>
        <TabsContent value="howitworks">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileSettings
