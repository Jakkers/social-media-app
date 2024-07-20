import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <Header />
      <div>
        <h1>Welcome back, please sign in</h1>
        <SignIn />
      </div>
    </>
  );
}
