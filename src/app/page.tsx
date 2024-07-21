import { Flex, Text, Button, Heading } from "@radix-ui/themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex direction="column" align="center" gap="8" wrap="wrap">
        <Image
          src={
            "https://pbs.twimg.com/profile_images/1697358675470389248/92BmtsFe_400x400.png"
          }
          alt="tech educators logo"
          width={300}
          height={300}
          className="rounded-full"
        ></Image>
        <Heading>Welcome To Tech Ed Social</Heading>
        <SignedIn>
          <UserButton />
          <Button>
            <Link href="/posts">View Posts</Link>
          </Button>
          <Button variant="outline">
            <Link href="/user/profile">Set up Profile</Link>
          </Button>
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
