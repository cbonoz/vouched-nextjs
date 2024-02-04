import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div>
      <SignUp afterSignInUrl="/profi.e" signInUrl="/sign-up" />
    </div>
  )
}

export default SignUpPage
