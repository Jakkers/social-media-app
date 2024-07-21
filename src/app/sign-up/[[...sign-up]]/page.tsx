import Header from "@/components/Header";
import { SignUp } from "@clerk/nextjs";
import { Flex, Heading } from "@radix-ui/themes";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Flex direction="column" align="center" gap="8" wrap="wrap">
          <Heading>Please, sign up for an account</Heading>
          <SignUp />
        </Flex>
      </main>
    </>
  );
}

//Make sure the user sees this page first, before they can complete their own profile page.
// The reason is, when the user creates a profile here,clerk assigns them a userId
