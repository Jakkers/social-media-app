import {
  Flex,
  Heading,
  Text,
  Box,
  Card,
  Avatar,
  Inset,
  Strong,
  Button,
} from "@radix-ui/themes";
import { dbConnect } from "@/utils/dbConnection";
import Image from "next/image";
import Header from "@/components/Header";
import { FaRegThumbsUp } from "react-icons/fa";

import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";
import DeletePost from "@/components/DeletePost";
import LikeButton from "@/components/Likes";

export default async function PostsPage({ searchParams }: any) {
  const userData = await currentUser();
  console.log(userData);

  // //getting information from Clerk
  // const username = userData?.username;
  // const first_name = userData?.firstName;
  // const last_name = userData?.lastName;
  // const userImage = userData?.imageUrl;

  const db = dbConnect();
  const posts = (
    await db.query(`SELECT social_posts.id, social_posts.title, social_posts.image, social_posts.likes, social_posts.content, social_posts.clerk_id, users.first_name, users.last_name, users.username, users.user_image
FROM social_posts
INNER JOIN users ON social_posts.clerk_id = users.clerk_id;`)
  ).rows;

  const postData = await posts;
  if (searchParams.sort === "asc") {
    postData.reverse();
  }

  return (
    <>
      <Header />
      <br></br>
      <Flex direction="row" align="center" gap="2" wrap="wrap">
        <Box>
          <Button>
            <Link href={"/posts?sort=asc"}>Sort new</Link>
          </Button>{" "}
        </Box>
        <Box>
          <Button>
            <Link href={"/posts?sort=desc"}>Sort old</Link>
          </Button>
        </Box>
      </Flex>
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
                  <Box>
                    <DeletePost data={post.id} clerk={post.clerk_id} />
                  </Box>
                  <Flex direction="row" align="center" gap="4">
                    <LikeButton data={post.id} clerk={post.clerk_id} />
                    <Box>
                      <Button size="3" variant="ghost">
                        {post.likes}
                      </Button>
                    </Box>
                  </Flex>
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
