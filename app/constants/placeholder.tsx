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
        firstName: "Endorser",
        lastName: "User",
        relationship: "Colleague",
        endorsement: "This is a demo endorsement.",
        createdAt: "2021-10-01T00:00:00Z",
      },
    ],
  }
}
