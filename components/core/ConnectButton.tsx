import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

function ConnectButton({
  buttonType = "submit",
}: {
  buttonType?: "submit" | "reset" | "button" | undefined
}) {
  return (
    <div className="connect-button">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <div>
          <SignInButton redirectUrl="/profile">
            <Button style={{ display: "block" }} type={buttonType}>
              Sign in
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  )
}

export default ConnectButton
