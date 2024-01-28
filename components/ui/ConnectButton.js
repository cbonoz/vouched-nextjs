import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

function ConnectButton({ buttonType = "primary" }) {
  return (
    <div className="connect-button">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <div>
          <SignInButton>
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
