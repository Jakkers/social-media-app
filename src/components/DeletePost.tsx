import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default async function DeletePost({
  data,
  clerk,
}: {
  data: number | null;
  clerk: string | null;
}) {
  //   { clerk }: { clerk: string | null }
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(`DELETE FROM social_posts WHERE id = ${data} RETURNING *`);
    revalidatePath("/posts");
    redirect("/posts");
  }
  console.log(data);

  const { userId } = auth();

  if (userId) {
    //add a SQL query getting the users data
    const db = dbConnect();
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
  }

  //   if (userId === clerk) {
  //     return (
  //       <form action={handleSubmit}>
  //         <button
  //           className=" hover:bg-white h-8 rounded text-white items-center p-1"
  //           type="submit"
  //         >
  //           ❌
  //         </button>
  //       </form>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // }

  if (userId === clerk) {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete post</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete post</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This post will be deleted permanently.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red">
                <form action={handleSubmit}>
                  <button type="submit">Delete post</button>
                </form>
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  } else {
    return <></>;
  }
}
