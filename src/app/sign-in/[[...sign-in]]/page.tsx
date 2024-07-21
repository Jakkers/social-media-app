import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";
import { Flex, Heading } from "@radix-ui/themes";

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Flex direction="column" align="center" gap="8" wrap="wrap">
          <Heading>Welcome back, please sign in</Heading>
          <SignIn />
        </Flex>
      </main>
    </>
  );
}
