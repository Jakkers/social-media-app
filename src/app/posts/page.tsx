import {
  Flex,
  Heading,
  Text,
  Box,
  Card,
  Avatar,
  Inset,
  Strong,
} from "@radix-ui/themes";
import { dbConnect } from "@/utils/dbConnection";
import Image from "next/image";
import Header from "@/components/Header";

export default async function PostsPage() {
  const db = dbConnect();
  const posts = (
    await db.query(`SELECT social_posts.id, social_posts.title, social_posts.image, social_posts.content, social_posts.clerk_id, users.first_name, users.last_name, users.username, users.user_image
FROM social_posts
INNER JOIN users ON social_posts.clerk_id = users.clerk_id;`)
  ).rows;
  return (
    <>
      <Header />
      <br></br>
      {posts.map((post) => (
        <div className="pb-4" key={post.id}>
          <Card>
            <Flex direction="column" gap="2" key={post.id}>
              <Box>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={post.user_image}
                    radius="full"
                    fallback="T"
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {post.first_name} {post.last_name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      @{post.username}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Card size="2">
                  <Inset clip="padding-box" side="top" pb="current">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1000}
                      height={800}
                      style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 500,
                        backgroundColor: "var(--gray-5)",
                      }}
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <Strong>{post.title}</Strong> <br></br>
                    {post.content}
                  </Text>
                </Card>
              </Box>
            </Flex>
          </Card>
        </div>
      ))}
    </>
  );
}
