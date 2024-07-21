import Header from "@/components/Header";
import { Heading, Flex, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Flex direction="column" align="center" gap="8" wrap="wrap">
          <br></br>
          <Heading>404 Not found!</Heading>
          <Text>Take me back to Safety</Text>
          <Button>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline">
            <Link href="/posts">View Posts</Link>
          </Button>
        </Flex>
      </main>
    </>
  );
}
