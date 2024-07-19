import { Flex, Text, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Homepage</h1>
      <Flex direction="column" gap="2">
        <form className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="bio">Fill in your bio</label>
          <input type="text" name="bio" />
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </main>
  );
}
