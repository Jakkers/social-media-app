import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button, Flex, Heading, Separator } from "@radix-ui/themes";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

export default function Header() {
  return (
    <>
      <nav className="sticky top-0 sm:bottom-0 z-40 pt-4">
        <Flex direction="row" justify="between" wrap="wrap">
          <Heading>Tech Ed Social</Heading>{" "}
          <SignedIn>
            <UserButton />
            <Link href="/posts">
              <FaHome size={35} />
            </Link>
            <Link href="/newPost">
              <IoIosAddCircle size={35} />
            </Link>
            <Link href="/user/profile">
              <IoPersonCircle size={35} />
            </Link>
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
        <Separator my="3" size="4" />
      </nav>
    </>
  );
}
