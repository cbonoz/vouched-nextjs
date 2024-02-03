"use client"

import { useEffect, useState } from "react"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Separator } from "@radix-ui/react-menubar"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InviteUser from "@/components/core/InviteUser"
import ManageProfile from "@/components/core/ManageProfile"

const ProfileSettings = () => {
  const { user }: { user: any } = useUser()

  return (
    <div>
      <div className="my-4 text-2xl">Profile Settings</div>
      <div className="my-4">
        From this page you can manage your account, and invite new users.{" "}
        {user?.handle && (
          <a rel="noreferrer" target="_blank" href={profileUrl(user.handle)}>
            View your profile.
          </a>
        )}
      </div>
      <Tabs defaultValue="manage" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="manage">Manage account</TabsTrigger>
          <TabsTrigger value="invite">Invite user to Vouched</TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <ManageProfile />
        </TabsContent>
        <TabsContent value="invite">
          <InviteUser />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileSettings
