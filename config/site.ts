export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Vouched",
  description: "A modern referral network",
  slogan: "Discover talented hires endorsed by people you trust",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    // {
    //   title: "About",
    //   href: "/about",
    // },
    {
      title: "Profile",
      href: "/profile",
    },
  ],
  checklistItems: [
    "Set up a shareable Vouched professional profile",
    "Get endorsements from your network",
    "Find jobs and opportunities through verified connections",
  ],
  // links: {
  //   twitter: "https://twitter.com/shadcn",
  //   github: "https://github.com/shadcn/ui",
  //   docs: "https://ui.shadcn.com",
  // },
}
