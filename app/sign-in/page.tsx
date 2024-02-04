import Link from "next/link"
import { SignIn, SignUp } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div>
      <div className="flex flex-row justify-center center-content">
        <SignIn afterSignInUrl="/profile" />
      </div>
      <div className="flex my-4 flex-row text-md justify-center content-center">
        Vouched is an invite-only platform. If you do not have an account,
        please request an invite&nbsp;
        <a className="underline" href="/">
          here
        </a>
        .
      </div>
    </div>
  )
}

export default SignInPage
