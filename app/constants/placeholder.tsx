export const createDemoProfile = (handle: string) => {
  return {
    user: {
      id: 123,
      handle,
      username: "demo",
      firstName: "Demo",
      lastName: "User",
    },
    endorsements: [
      {
        id: 1,
        handle: "endorser",
        avatar: "https://i.pravatar.cc/40",
        name: "John Smith",
        relationship: "Colleague",
        message: "This is a demo endorsement.",
        createdAt: Date.now(),
      },
    ],
  }
}
