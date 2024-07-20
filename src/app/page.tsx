import { Flex, Text, Button, Heading } from "@radix-ui/themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex direction="column" align="center" gap="8" wrap="wrap">
        <Heading>Welcome To Tech Ed Social</Heading>
        <Text>Please create an account or sign in</Text>
        <SignedIn>
          <UserButton />
          <Link href="/posts">View Posts</Link>
          <Link href="/user/userId">Set up Profile</Link>
        </SignedIn>
        <SignedOut>
          <Button>
            <SignUpButton>Sign Up</SignUpButton>
          </Button>
          <Button variant="ghost">
            <SignInButton>Sign In</SignInButton>
          </Button>
        </SignedOut>
      </Flex>
    </main>
  );
}
