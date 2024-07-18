import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <h1>Welcome back, please sign in</h1>
      <SignIn />
    </div>
  );
}
