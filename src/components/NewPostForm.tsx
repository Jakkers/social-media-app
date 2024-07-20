import { Button, Flex, Heading, Separator } from "@radix-ui/themes";
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewPostForm({
  userId,
}: {
  userId: string | null;
}) {
  //   const { userId } = auth();
  console.log(userId);

  //   if (userId) {
  //     //add a SQL query getting the users data
  //     const db = dbConnect();
  //     await db.query(`SELECT * FROM users`);
  //   }
  //   //we are going to access the current user data
  //   const userData = await currentUser();

  async function handleSubmit(formData: FormData) {
    "use server";
    //we need to specify that we are in the server
    //we need to activate the dbConnection
    //we need to get the formData input
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");
    //we need to insert data in the database 9SQL is incomplete)
    const db = dbConnect();
    await db.query(
      `INSERT INTO social_posts (title, image, content, clerk_id) VALUES ($1, $2, $3, $4)`,
      [title, image, content, userId]
    );
    // you need to revalidatePath and redirect
    revalidatePath("/posts");
    redirect("/posts");
  }
  return (
    <>
      <Flex direction="row" justify="between">
        <Heading>Make a post</Heading>{" "}
      </Flex>
      <Separator my="3" size="4" />
      <form action={handleSubmit}>
        <Flex direction="column" gap="2">
          <label htmlFor="title">Title</label>
          <input
            className="border-solid border-2 rounded-sm border-slate-500"
            type="text"
            name="title"
          />
          <label htmlFor="image">Image</label>
          <input
            className="border-solid border-2 rounded-sm border-slate-500"
            type="text"
            name="image"
          />
          <label htmlFor="content">Description</label>
          <textarea
            className="border-solid border-2 rounded-sm border-slate-500"
            name="content"
            rows={5}
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </>
  );
}
